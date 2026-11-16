import { StyleSheet, View } from 'react-native';

import { BreatheCard } from '@/components/BreatheCard';
import { ConfirmBox } from '@/components/ConfirmBox';
import { ProcessIntro } from '@/components/ProcessIntro';

export function AllowContent() {
  return (
    <View style={styles.container}>
      <ProcessIntro step={2} title="Allow" text="Breathe to stay calm, and accept your emotions." />
      <BreatheCard />
      <ConfirmBox title="Confirm:" items={['I allow my emotion just as it is']} />
      {/* action steps of the Allow step go here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
});
