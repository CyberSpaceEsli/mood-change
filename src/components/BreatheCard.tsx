import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import SunSvg from '../../assets/icons/allow-animate-sun.svg';
import CardBackSvg from '../../assets/icons/allow-card-back.svg';
import CardFrontSvg from '../../assets/icons/allow-card-front.svg';

import { AppText } from '@/components/AppText';
import { colors } from '@/constants/theme';

const BREATHS = 3;
const PHASE_MS = 4000; // one breath in or out
const SUN_SMALL = 0.6;
const SUN_BIG = 1.1;

type BreatheCardProps = {
  onPlay?: () => void;
};

export function BreatheCard({ onPlay }: BreatheCardProps) {
  const layer = { width: '100%', height: '100%', preserveAspectRatio: 'xMidYMid slice' } as const;

  const [scale] = useState(() => new Animated.Value(1));
  const animation = useRef<Animated.CompositeAnimation | null>(null);
  const [playing, setPlaying] = useState(false);
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  const [count, setCount] = useState(1); // current breath, 1 to BREATHS

  const stop = () => {
    animation.current?.stop();
    animation.current = null;
    scale.setValue(1);
    setPlaying(false);
    setCount(1);
    setPhase('in');
  };

  useEffect(() => () => animation.current?.stop(), []);

  const breathe = (n: number) => {
    setCount(n);
    setPhase('in');
    animation.current = Animated.timing(scale, {
      toValue: SUN_BIG,
      duration: PHASE_MS,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    });
    animation.current.start(({ finished }) => {
      if (!finished) return;
      setPhase('out');
      animation.current = Animated.timing(scale, {
        toValue: SUN_SMALL,
        duration: PHASE_MS,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      });
      animation.current.start(({ finished: done }) => {
        if (!done) return;
        if (n < BREATHS) breathe(n + 1);
        else stop();
      });
    });
  };

  const onPress = () => {
    if (playing) return stop();
    onPlay?.();
    setPlaying(true);
    scale.setValue(SUN_SMALL);
    breathe(1);
  };

  return (
    <View style={styles.card}>
      <CardBackSvg style={styles.layer} {...layer} />
      <Animated.View style={[styles.sun, { transform: [{ scale }] }]}>
        <SunSvg width={148} height={148} />
      </Animated.View>
      <CardFrontSvg style={styles.layer} {...layer} />

      <AppText variant="heroIntro" style={styles.label}>
        {playing ? (phase === 'in' ? 'BREATHE IN' : 'BREATHE OUT') : 'BREATHE IN · BREATHE OUT'}
      </AppText>
      <AppText variant="heading" style={styles.text}>
        {playing ? `Breath ${count} of ${BREATHS}` : `Do it ${BREATHS} times.`}
      </AppText>

      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={playing ? 'Stop' : 'Play'}
        style={styles.play}
      >
        <Svg width={16} height={16} viewBox="0 0 16 16">
          {playing ? (
            <>
              <Rect x={3} y={2} width={3.5} height={12} rx={1} fill={colors.forest} />
              <Rect x={9.5} y={2} width={3.5} height={12} rx={1} fill={colors.forest} />
            </>
          ) : (
            <Path d="M4 2.5v11a1 1 0 0 0 1.5.86l9-5.5a1 1 0 0 0 0-1.72l-9-5.5A1 1 0 0 0 4 2.5Z" fill={colors.forest} />
          )}
        </Svg>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 238,
    borderRadius: 26,
    backgroundColor: colors.heroBackground,
    overflow: 'hidden', // clips the landscape to the rounded corners
    boxShadow: '0px 4px 12px 1px rgba(27, 58, 64, 0.04)', // Ink 900 at 4%, spread 1
  },
  layer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  sun: {
    position: 'absolute', // sits between the two mountains
    top: 36,
    alignSelf: 'center', // scales around its own centre
  },
  label: {
    position: 'absolute',
    top: 24,
    width: '100%',
    textAlign: 'center',
    letterSpacing: 1,
  },
  text: {
    position: 'absolute',
    bottom: 26,
    width: '100%',
    textAlign: 'center',
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
    backgroundColor: '#FFFFFF59', // white at 35%, soft glass look
  },
});
