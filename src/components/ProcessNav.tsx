import { StyleSheet, View } from 'react-native';

import CheckSvg from '../../assets/icons/check.svg';

import { AppText } from '@/components/AppText';
import { colors } from '@/constants/theme';

const steps = [
  { letter: 'R', title: 'Recognise' },
  { letter: 'A', title: 'Allow' },
  { letter: 'I', title: 'Investigate' },
  { letter: 'N', title: 'Nurture' },
];

type ProcessNavProps = {
  step: number; // current step, 1 to 4
};

export function ProcessNav({ step }: ProcessNavProps) {
  return (
    <View style={styles.row}>
      <View style={styles.line} />
      <View style={[styles.lineDone, { width: `${((step - 1) / (steps.length - 1)) * 75}%` }]} />
      {steps.map(({ letter, title }, index) => {
        const isActive = index + 1 === step;
        const isDone = index + 1 < step;
        return (
          <View key={letter} style={styles.item}>
            <View style={[styles.box, isActive && styles.boxActive]}>
              {isDone ? (
                <CheckSvg width={16} height={16} />
              ) : (
                <AppText variant="label" style={{ color: isActive ? colors.white : colors.ink900 }}>
                  {letter}
                </AppText>
              )}
            </View>
            <AppText
              variant="small"
              style={{ color: isActive ? colors.ink900 : colors.ink600, opacity: isActive ? 1 : 0.7 }}
            >
              {title}
            </AppText>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  line: {
    position: 'absolute', // runs behind the boxes, from the first to the last
    top: 15, // vertical middle of the boxes
    left: '12.5%', // centre of the first column
    right: '12.5%', // centre of the last column
    height: 1,
    backgroundColor: colors.stepLine,
  },
  lineDone: {
    position: 'absolute', // forest part of the line, from the first step up to the active one
    top: 15,
    left: '12.5%',
    height: 1,
    backgroundColor: colors.forest,
  },
  item: {
    flex: 1, // 4 equal columns
    alignItems: 'center',
    gap: 4,
  },
  box: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.stepIdleOutline,
    backgroundColor: colors.stepIdle,
  },
  boxActive: {
    borderColor: colors.forest,
    backgroundColor: colors.forest,
  },
});
