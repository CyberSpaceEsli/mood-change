import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CloseSvg from '../../assets/icons/close.svg';

import { AppText } from '@/components/AppText';
import { colors } from '@/constants/theme';

type ProcessHeaderProps = {
  step: number;
  onClose: () => void;
};

export function ProcessHeader({ step, onClose }: ProcessHeaderProps) {
  return (
    <SafeAreaView edges={['top']}>
      <View style={styles.row}>
        <View style={[styles.side, styles.left]}>
          <Pressable onPress={onClose} hitSlop={12}>
            <CloseSvg width={22} height={22} color={colors.ink900} />
          </Pressable>
        </View>

        <AppText variant="titleSmall">Mood Change</AppText>

        <View style={[styles.side, styles.right]}>
          <View style={styles.label}>
            <AppText variant="labelBig">{step} / 4</AppText>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  side: {
    flex: 1, // equal width on both sides keeps the title in the middle
  },
  left: {
    alignItems: 'flex-start',
  },
  right: {
    alignItems: 'flex-end',
  },
  label: {
    width: 52,
    height: 30,
    alignItems: 'center', // "1/4" centered horizontally
    justifyContent: 'center',
    borderRadius: 14,
    opacity: 1,
    backgroundImage: `linear-gradient(${colors.yellowLight} 0%, ${colors.yellow} 100%)`,
  },
});
