import { StyleSheet, View } from 'react-native';

import { BodyCard } from '@/components/BodyCard';
import { EmotionOption } from '@/components/EmotionOption';
import { ProcessIntro } from '@/components/ProcessIntro';

export function InvestigateContent() {
  return (
    <View style={styles.container}>
      <ProcessIntro step={3} title="Investigate" text="Name what you feel, and notice where it sits." />
      <EmotionOption />
      <BodyCard />
      {/* action steps of the Investigate step go here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
});
