import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { ProcessHeader } from '@/components/ProcessHeader';
import { spacing } from '@/constants/theme';

export default function ProcessScreen() {
  return (
    <View style={styles.screen}>
      <ProcessHeader step={1} onClose={() => router.back()} />
      <View style={styles.content}>
        <AppText variant="heading">Recognize</AppText>
        <AppText variant="body">Call out the mood change.</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: spacing.screen,
  },
  content: {
    marginTop: 32,
    gap: 8,
  },
});
