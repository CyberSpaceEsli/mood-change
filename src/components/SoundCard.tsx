import { Pressable, StyleSheet, View } from 'react-native';

import HeadphonesSvg from '../../assets/icons/headphones.svg';

import { AppText } from '@/components/AppText';
import { colors } from '@/constants/theme';

type SoundCardProps = {
  duration: number; // total length in seconds
  position?: number; // current position in seconds
  onPress?: () => void;
};

const formatTime = (seconds: number) => {
  const total = Math.max(0, Math.floor(seconds));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
};

export function SoundCard({ duration, position = 0, onPress }: SoundCardProps) {
  const progress = duration > 0 ? Math.min(1, position / duration) : 0;

  return (
    <View style={styles.card}>
      <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel="Listen" style={styles.button}>
        <HeadphonesSvg width={18} height={18} />
      </Pressable>
      <View style={styles.track}>
        <View style={[styles.progress, { width: `${progress * 100}%` }]} />
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
