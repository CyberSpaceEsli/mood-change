import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { StepCard } from '@/components/StepCard';
import { colors } from '@/constants/theme';

const steps = [
  { letter: 'R', title: 'Recognize', text: 'Call out the mood change.' },
  { letter: 'A', title: 'Allow', text: 'Let the feeling be there.' },
  { letter: 'I', title: 'Investigate', text: 'The feeling in your body.' },
  { letter: 'N', title: 'Nurture', text: 'Switch back to connection.' },
];

export function FourSteps() {
  return (
    <View style={styles.container}>
      <View style={styles.intro}>
        <AppText variant="heading">The four steps</AppText>
        <AppText variant="heroText" style={styles.introText}>
          {'RAIN is a mindfulness practice that helps you\nmeet difficult feelings, one step at a time.'}
        </AppText>
      </View>

      <View style={styles.grid}>
        {steps.map((step) => (
          <StepCard key={step.letter} {...step} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16, // space between the intro and the cards
  },
  intro: {
    gap: 8, // space between the heading and the text
  },
  introText: {
    color: colors.ink600,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap', // 2 cards per row
    gap: 8, // space between the cards
  },
});
