import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';

import HeadphonesSvg from '../../assets/icons/headphones.svg';
import PauseSvg from '../../assets/icons/pause.svg';
import PlaySvg from '../../assets/icons/play.svg';

import { AppText } from '@/components/AppText';
import { colors } from '@/constants/theme';

type SoundCardProps = {
  duration: number; // total length in seconds
  position?: number; // current position in seconds
  playing?: boolean;
  onPress?: () => void;
};

const formatTime = (seconds: number) => {
  const total = Math.max(0, Math.floor(seconds));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
};

export function SoundCard({ duration, position = 0, playing = false, onPress }: SoundCardProps) {
  const [progress] = useState(() => new Animated.Value(0)); // 0 to 1
  const positionRef = useRef(position);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  // Paused or stopped: the bar shows the reported position.
  useEffect(() => {
    if (!playing) progress.setValue(duration > 0 ? Math.min(1, position / duration) : 0);
  }, [playing, position, duration, progress]);

  // Playing: the bar moves linearly to the end instead of jumping with every position update.
  useEffect(() => {
    if (!playing || duration <= 0) return;
    const start = Math.min(1, positionRef.current / duration);
    progress.setValue(start);
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: (1 - start) * duration * 1000,
      easing: Easing.linear,
      useNativeDriver: false, // animates the width
    });
    animation.start();
    return () => animation.stop();
  }, [playing, duration, progress]);

  // Pause while playing, play when paused part-way, headphones at the very start.
  const Icon = playing ? PauseSvg : position > 0 ? PlaySvg : HeadphonesSvg;

  return (
    <View style={styles.card}>
      <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={playing ? 'Pause' : 'Listen'} style={styles.button}>
        <Icon width={18} height={18} />
      </Pressable>
      <View style={styles.track}>
        <Animated.View
          style={[styles.progress, { width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]}
        />
      </View>
      <AppText variant="label" style={styles.time}>
        {formatTime(position)} / {formatTime(duration)}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 26,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  button: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.whiteOutline,
    backgroundColor: colors.forest,
  },
  track: {
    flex: 1,
    height: 4,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: colors.stepLine,
  },
  progress: {
    height: '100%',
    backgroundColor: colors.forest,
  },
  time: {
    color: colors.ink900,
    fontVariant: ['tabular-nums'],
  },
});
