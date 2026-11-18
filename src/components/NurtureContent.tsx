import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import TogetherSvg from '../../assets/icons/together.svg';

import { AppText } from '@/components/AppText';
import { InfoBox } from '@/components/InfoBox';
import { LetGoCard } from '@/components/LetGoCard';
import { LoveAffirmations } from '@/components/LoveAffirmations';
import { ProcessIntro } from '@/components/ProcessIntro';
import { ReconnectLabels } from '@/components/ReconnectLabels';
import { colors } from '@/constants/theme';

export function NurtureContent() {
  return (
    <View style={styles.container}>
      <ProcessIntro step={4} title="Nurture" text="Switch back to love." />
      <InfoBox Icon={TogetherSvg} text="Continue together," subText="with the next actions." />
      <LoveAffirmations />
      <LetGoCard
        title="Let Go"
        subtext="Feel your feet on the ground and let the negative energy flow back into the earth, making room for positive energy to grow."
        label="SPEAK OUT LOUD:"
        quote={'I let the emotion go,\nso love can grow.'}
      />
      <ReconnectLabels subText="Choose your way to connect."/>
      <Pressable style={styles.button} onPress={() => router.replace('/done')} accessibilityRole="button">
        <AppText variant="heroButtonText" style={styles.buttonText}>
          Finish
        </AppText>
      </Pressable>
      {/* action steps of the Nurture step go here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  button: {
    height: 48, // same as the Start button in HeroCard, but full width
    alignItems: 'center', // text centered
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.whiteOutline,
    backgroundColor: colors.forest,
  },
  buttonText: {
    color: colors.white,
  },
});
