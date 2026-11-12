import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ProcessHeader } from '@/components/ProcessHeader';
import { ProcessNav } from '@/components/ProcessNav';
import { RecognizeContent } from '@/components/RecognizeContent';
import { spacing } from '@/constants/theme';

export default function ProcessScreen() {
  return (
    <View style={styles.screen}>
      <ProcessHeader step={1} onClose={() => router.back()} />
      <View style={styles.nav}>
        <ProcessNav step={1} />
      </View>
      <View style={styles.content}>
        <RecognizeContent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: spacing.screen,
  },
  nav: {
    marginTop: 24,
  },
  content: {
    marginTop: 32,
  },
});
