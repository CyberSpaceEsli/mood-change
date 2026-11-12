import { StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/AppHeader';
import { HeroCard } from '@/components/HeroCard';
import { TabBar } from '@/components/TabBar';
import { spacing } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <AppHeader />
      <HeroCard />
      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    paddingHorizontal: spacing.screen, // same side space for everything on the screen
  },
});
