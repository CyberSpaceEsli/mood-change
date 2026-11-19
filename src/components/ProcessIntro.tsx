import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { colors, fonts } from '@/constants/theme';

type ProcessIntroProps = {
  step: number | string; // a number shows "STEP n", a string is shown as it is
  title: string;
  text?: string; // no text, no subtext
  mediumTitle?: boolean;
};

export function ProcessIntro({ step, title, text, mediumTitle }: ProcessIntroProps) {
  return (
    <View style={styles.container}>
      <AppText variant="heroIntro">
        {typeof step === 'number' ? `STEP ${step}` : step}
      </AppText>
      <AppText variant="heroQuestion" style={mediumTitle && styles.bold}>
        {title}
      </AppText>
      {text ? (
        <AppText variant="body" style={styles.text}>
          {text}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  text: {
    color: colors.ink600,
  },
  bold: {
    fontFamily: fonts.lora.medium, // weights are separate font families
  },
});
