import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { colors } from '@/constants/theme';

type ProcessIntroProps = {
  step: number;
  title: string;
  text: string;
};

export function ProcessIntro({ step, title, text }: ProcessIntroProps) {
  return (
    <View style={styles.container}>
      <AppText variant="heroIntro">
        {`STEP ${step}`}
      </AppText>
      <AppText variant="heroQuestion">{title}</AppText>
      <AppText variant="body" style={styles.text}>
        {text}
      </AppText>
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
});
