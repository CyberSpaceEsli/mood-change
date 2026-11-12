import { StyleSheet, View } from 'react-native';

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
      {steps.map(({ letter, title }, index) => {
        const isActive = index + 1 === step;
        return (
          <View key={letter} style={styles.item}>
            <View style={[styles.box, isActive && styles.boxActive]}>
              <AppText variant="stepLetter" style={{ color: isActive ? colors.white : colors.ink900 }}>
                {letter}
              </AppText>
            </View>
            <AppText
              variant={isActive ? 'labelBig' : 'label'}
              style={{ color: isActive ? colors.ink900 : colors.ink600 }}
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
    top: 24, // vertical middle of the boxes
    left: '12.5%', // centre of the first column
    right: '12.5%', // centre of the last column
    height: 2,
    backgroundColor: colors.stepLine,
  },
  item: {
    flex: 1, // 4 equal columns
    alignItems: 'center',
    gap: 8,
  },
  box: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.stepIdleOutline,
    backgroundColor: colors.stepIdle,
  },
  boxActive: {
    borderWidth: 1, // same outline as the Start button
    borderColor: colors.whiteOutline,
    backgroundColor: colors.forest,
  },
});
