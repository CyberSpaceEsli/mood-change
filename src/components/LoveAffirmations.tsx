import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { SoundCard } from '@/components/SoundCard';

export function LoveAffirmations() {
  return (
    <View style={styles.container}>
      <AppText variant="heading">Love affirmations</AppText>
      <SoundCard duration={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8, // space between the title and the card
  },
});
