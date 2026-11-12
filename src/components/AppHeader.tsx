import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/AppText';
import { FiltersIcon } from '@/components/icons/FiltersIcon';
import { colors } from '@/constants/theme';

export function AppHeader() {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.row}>
        <View style={styles.texts}>
          <AppText variant="title">Mood Change</AppText>
          <AppText variant="titleIntro" style={styles.subtitle}>
            Reconnect.
          </AppText>
        </View>
        <FiltersIcon />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  texts: {
    flex: 1,
  },
  subtitle: {
    color: colors.ink300,
  },
});
