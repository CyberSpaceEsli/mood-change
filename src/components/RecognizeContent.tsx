import { StyleSheet, View } from 'react-native';

import ClockSvg from '../../assets/icons/clock.svg';
import IndividualSvg from '../../assets/icons/individual.svg';
import LeafSvg from '../../assets/icons/leaf.svg';

import { InfoBox } from '@/components/InfoBox';
import { ProcessIntro } from '@/components/ProcessIntro';
import { QuoteCard } from '@/components/QuoteCard';
import { RememberLabels } from '@/components/RememberLabels';

export function RecognizeContent() {
  return (
    <View style={styles.container}>
      <ProcessIntro step={1} title="Recognise" text="Be aware of a mood change." />
      <QuoteCard label="SPEAK OUT LOUD:" quote={'I recognise a\nmood change.'} />
      <RememberLabels
        title="Remember:"
        items={[
          { Icon: LeafSvg, text: 'Stay calm' },
          { Icon: ClockSvg, text: 'Talk about the issue later' },
        ]}
      />
      <InfoBox Icon={IndividualSvg} text="Continue individually," subText="the next two steps allow & investigate." />
      {/* more action steps of the Recognise step go here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
});
