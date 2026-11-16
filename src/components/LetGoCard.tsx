import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import BackgroundSvg from '../../assets/icons/letgo-background.svg';
import DropSvg from '../../assets/icons/letgo-drop.svg';
import GlowSvg from '../../assets/icons/letgo-glow.svg';
import RippleSvg from '../../assets/icons/letgo-ripple.svg';
import SproutSvg from '../../assets/icons/letgo-sprout.svg';

import { AppText } from '@/components/AppText';
import { colors } from '@/constants/theme';

// Positions are in pixels from the top-left corner of the card.
const drops = [
  { top: 35, left: 254, width: 15, height: 20, delay: 0 },
  { top: 16, left: 281, width: 22, height: 30, delay: 400 },
  { top: 27, left: 316, width: 15, height: 20, delay: 800 },
];
const GROUND_Y = 130; // the drops land here, on the sand
const CENTER_X = 292; // ripple, glow and sprout appear here
const SPROUT = { width: 31, height: 40 };

type LetGoCardProps = {
  title: string;
  subtext: string;
  label: string;
  quote: string;
};

export function LetGoCard({ title, subtext, label, quote }: LetGoCardProps) {
  const [playing, setPlaying] = useState(false);
  const [anim] = useState(() => ({
    fall: drops.map(() => new Animated.Value(0)), // 0 = at the top, 1 = landed
    ripple: new Animated.Value(0),
    glow: new Animated.Value(0),
    sprout: new Animated.Value(0), // 0 = hidden in the sand, 1 = fully grown
  }));
  const running = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => () => running.current?.stop(), []);

  const play = () => {
    setPlaying(true);
    const native = { useNativeDriver: true };

    // Timeline in ms: the first drop lands at FALL, the last one at FALL + 800.
    const FALL = 1000;
    const allLanded = FALL + drops[drops.length - 1].delay;

    running.current = Animated.sequence([
      Animated.parallel([
        // drops fall onto the sand, one after another
        ...anim.fall.map((value, i) =>
          Animated.sequence([
            Animated.delay(drops[i].delay),
            Animated.timing(value, { toValue: 1, duration: FALL, easing: Easing.in(Easing.quad), ...native }),
          ]),
        ),
        // the ripple appears when the first drop arrives and goes when the last one has landed
        Animated.sequence([
          Animated.delay(FALL),
          Animated.timing(anim.ripple, { toValue: 1, duration: 500, easing: Easing.out(Easing.ease), ...native }),
          Animated.delay(allLanded - FALL - 500),
          Animated.timing(anim.ripple, { toValue: 0, duration: 400, ...native }),
        ]),
        // glow starts and the sprout rises once all drops have fallen
        Animated.sequence([
          Animated.delay(allLanded),
          Animated.timing(anim.glow, { toValue: 1, duration: 900, ...native }),
        ]),
        Animated.sequence([
          Animated.delay(allLanded),
          Animated.timing(anim.sprout, { toValue: 1, duration: 2000, easing: Easing.out(Easing.cubic), ...native }),
        ]),
      ]),
      Animated.delay(1800),
      // glow and sprout fade away again
      Animated.parallel([
        Animated.timing(anim.glow, { toValue: 0, duration: 700, ...native }),
        Animated.timing(anim.sprout, { toValue: 0, duration: 700, ...native }),
      ]),
    ]);
    running.current.start(({ finished }) => {
      if (!finished) return;
      anim.fall.forEach((value) => value.setValue(0)); // drops are back at the top
      setPlaying(false);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.intro}>
        <AppText variant="heading">{title}</AppText>
        <AppText variant="body" style={styles.subtext}>
          {subtext}
        </AppText>
      </View>

      <View style={styles.card}>
        <BackgroundSvg
          style={styles.background}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
        />
        <Animated.View
          style={[styles.layer, { top: GROUND_Y - 60, left: CENTER_X - 78, opacity: anim.glow }]}
        >
          <GlowSvg width={156} height={60} />
        </Animated.View>
        <Animated.View
          style={[
            styles.layer,
            {
              top: GROUND_Y - 4,
              left: CENTER_X - 15,
              opacity: anim.ripple,
              transform: [{ scaleX: anim.ripple.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] }) }],
            },
          ]}
        >
          <RippleSvg width={30} height={8} />
        </Animated.View>
        <Animated.View
          style={[
            styles.layer,
            {
              top: GROUND_Y - SPROUT.height + 2,
              left: CENTER_X - SPROUT.width / 2,
              opacity: anim.sprout.interpolate({ inputRange: [0, 0.15, 1], outputRange: [0, 1, 1] }),
              // grows upwards from its base: scale around the centre and shift down to keep the base fixed
              transform: [
                { translateY: anim.sprout.interpolate({ inputRange: [0, 1], outputRange: [SPROUT.height / 2, 0] }) },
                { scaleY: anim.sprout.interpolate({ inputRange: [0, 1], outputRange: [0.05, 1] }) },
              ],
            },
          ]}
        >
          <SproutSvg width={SPROUT.width} height={SPROUT.height} />
        </Animated.View>
        {drops.map(({ top, left, width, height }, i) => {
          const distance = GROUND_Y - top - height;
          return (
            <Animated.View
              key={i}
              style={[
                styles.layer,
                {
                  top,
                  left,
                  opacity: anim.fall[i].interpolate({ inputRange: [0, 0.85, 1], outputRange: [1, 1, 0] }),
                  transform: [
                    { translateY: anim.fall[i].interpolate({ inputRange: [0, 1], outputRange: [0, distance] }) },
                  ],
                },
              ]}
            >
              <DropSvg width={width} height={height} />
            </Animated.View>
          );
        })}
        <View style={styles.texts}>
          <AppText variant="heroIntro">{label}</AppText>
          <AppText variant="heading">{`“${quote}”`}</AppText>
        </View>
        {!playing && (
          <Pressable onPress={play} accessibilityRole="button" accessibilityLabel="Play" style={styles.play}>
            <Svg width={16} height={16} viewBox="0 0 16 16">
              <Path d="M4 2.5v11a1 1 0 0 0 1.5.86l9-5.5a1 1 0 0 0 0-1.72l-9-5.5A1 1 0 0 0 4 2.5Z" fill={colors.forest} />
            </Svg>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16, // space between the intro and the card
  },
  intro: {
    gap: 8,
  },
  subtext: {
    color: colors.ink600,
  },
  card: {
    height: 150,
    borderRadius: 26,
    backgroundColor: colors.heroBackground,
    overflow: 'hidden', // clips the landscape to the rounded corners
  },
  background: {
    position: 'absolute', // landscape fills the card behind the text
    top: 0,
    left: 0,
  },
  layer: {
    position: 'absolute', // drops, ripple, glow and sprout sit at fixed spots on the card
  },
  play: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.whiteOutline,
    backgroundColor: '#FFFFFF59', // white at 35%, same as in BreatheCard
  },
  texts: {
    paddingTop: 25,
    paddingHorizontal: 24,
    gap: 5, // space between label and quote
  },
});
