import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { colors } from '@/constants/theme';

type StepCardProps = {
  letter: string;
  title: string;
  text: string;
};

export function StepCard({ letter, title, text }: StepCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.letterBox}>
        <AppText variant="stepLetter" style={styles.letter}>
          {letter}
        </AppText>
      </View>
      <View>
        <AppText variant="stepTitle">{title}</AppText>
        <AppText variant="heroText" style={styles.text}>
          {text}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexBasis: '40%', // 2 equal cards per row: 175px wide on a 390px-wide phone
    flexGrow: 1,
    height: 120,
    gap: 4,
    paddingVertical: 12, // reduced so letter, title and 2 text lines fit in 120px
    paddingHorizontal: 16,
    borderRadius: 26,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.outline, // same subtle grey as the TabBar
  },
  letterBox: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    width: 32, // same width for every letter (an "I" is narrower than an "R")
    paddingVertical: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.whiteOutline,
    backgroundColor: colors.mint,
  },
  letter: {
    color: colors.ink900,
  },
  text: {
    color: colors.ink600,
  },
});
