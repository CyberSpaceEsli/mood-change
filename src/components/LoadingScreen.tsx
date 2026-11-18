import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, useWindowDimensions, View } from 'react-native';

import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

import MountainsSvg from '../../assets/icons/loading-mountains.svg';
import CloudSvg from '../../assets/icons/mood-cloud.svg';
import SunMoodySvg from '../../assets/icons/sun-moody.svg';

import { AppText } from '@/components/AppText';
import { colors, fonts } from '@/constants/theme';

const CLOUD = { width: 168, height: 156 };
const GLOW = 420; // size of the warm glow around the sun
const SUN_MOODY = 141; // size of the sun picture next to the cloud
const SUN_SUNNY = 162; // size of the same picture when it is sunny (drawn at this size, then scaled down: stays sharp)
const SUN_SHIFT = 40; // the moody sun sits a bit to the right, behind the cloud
const CLOUD_OFFSCREEN = 300; // how far right the cloud waits
const MOUNTAINS_RATIO = 399 / 390; // height / width of loading-mountains.svg
const MOUNTAINS_VISIBLE = 0.58; // share of the picture that is shown, from the bottom

type LoadingScreenProps = {
  onFinish?: () => void;
};

export function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const { width, height } = useWindowDimensions();
  const [mood] = useState(() => new Animated.Value(0)); // 0 = sunny, 1 = cloud in front of the sun
  const [slide] = useState(() => new Animated.Value(0)); // 0 = on screen, 1 = swiped out to the left

  const finishRef = useRef(onFinish);
  useEffect(() => {
    finishRef.current = onFinish; // the animation must not restart when the parent re-renders
  }, [onFinish]);

  useEffect(() => {
    const native = { useNativeDriver: true };
    const move = { duration: 1200, easing: Easing.inOut(Easing.cubic), ...native };

    const animation = Animated.sequence([
      Animated.delay(600), // sunny sun
      Animated.timing(mood, { toValue: 1, ...move }), // the cloud moves in, the sun turns moody
      Animated.delay(1200),
      Animated.timing(mood, { toValue: 0, ...move }), // the cloud moves back, the sun is sunny again
      Animated.delay(300),
      Animated.timing(slide, { toValue: 1, duration: 500, easing: Easing.inOut(Easing.cubic), ...native }), // swipe to the left, the app is revealed
    ]);
    animation.start(({ finished }) => {
      if (finished) finishRef.current?.();
    });
    return () => animation.stop();
  }, [mood, slide]);

  const mountainsHeight = width * MOUNTAINS_RATIO;
  const centerX = Math.round(width / 2);
  const sunY = Math.round(height * 0.58); // vertical centre of the sun (whole pixels keep the images sharp)

  return (
    <Animated.View style={[
        styles.screen,
        { transform: [{ translateX: slide.interpolate({ inputRange: [0, 1], outputRange: [0, -width] }) }] },
      ]} pointerEvents="none">
      {/* background: only the lower part of the picture is shown, so there is little fog above the mountains */}
      <View style={[styles.mountains, { height: mountainsHeight * MOUNTAINS_VISIBLE }]}>
        <MountainsSvg
          style={styles.mountainsImage}
          width={width}
          height={mountainsHeight}
          preserveAspectRatio="none"
        />
        <View style={styles.mountainsFade} />
      </View>

      <View style={[styles.texts, { top: Math.round(height * 0.4) - 40 }]}>
        <AppText variant="title" style={styles.title}>
          Mood Change
        </AppText>
        <AppText variant="body" style={styles.subtitle}>
          Reconnect.
        </AppText>
      </View>

      {/* one sun picture only: it moves, shrinks a little and loses part of its glow when the cloud arrives */}
      <Animated.View
        style={[
          styles.layer,
          {
            top: sunY - GLOW / 2,
            left: centerX - GLOW / 2,
            width: GLOW,
            height: GLOW,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ translateX: mood.interpolate({ inputRange: [0, 1], outputRange: [0, SUN_SHIFT] }) }],
          },
        ]}
      >
        <Animated.View
          style={[styles.layer, { opacity: mood.interpolate({ inputRange: [0, 1], outputRange: [1, 0.35] }) }]}
        >
          <Svg width={GLOW} height={GLOW} viewBox="0 0 420 420">
            <Defs>
              <RadialGradient id="warmth" cx="0.5" cy="0.5" r="0.5">
                <Stop offset="0" stopColor="#F6D35F" stopOpacity={0.28} />
                <Stop offset="1" stopColor="#F6D35F" stopOpacity={0} />
              </RadialGradient>
            </Defs>
            <Circle cx={210} cy={210} r={210} fill="url(#warmth)" />
          </Svg>
        </Animated.View>
        <Animated.View
          style={{
            transform: [{ scale: mood.interpolate({ inputRange: [0, 1], outputRange: [1, SUN_MOODY / SUN_SUNNY] }) }],
          }}
        >
          <SunMoodySvg width={SUN_SUNNY} height={SUN_SUNNY} />
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={[
          styles.layer,
          {
            top: sunY - 21,
            left: centerX - CLOUD.width / 2,
            transform: [
              { translateX: mood.interpolate({ inputRange: [0, 1], outputRange: [CLOUD_OFFSCREEN, 0] }) },
            ],
          },
        ]}
      >
        <CloudSvg width={CLOUD.width} height={CLOUD.height} />
      </Animated.View>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden', // the cloud waits outside the screen
    backgroundColor: colors.heroBackground,
  },
  layer: {
    position: 'absolute',
  },
  texts: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: 2,
  },
  title: {
    fontSize: 34,
    lineHeight: 40,
  },
  subtitle: {
    fontFamily: fonts.inter.medium,
    fontSize: 17,
    lineHeight: 24,
    color: colors.forest,
  },
  mountains: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden', // cuts off the fog at the top of the picture
  },
  mountainsImage: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  mountainsFade: {
    position: 'absolute', // soft edge between the background colour and the cropped picture
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundImage: `linear-gradient(${colors.heroBackground}, ${colors.heroBackground}00)`,
  },
});
