import { ScrollView, StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/AppHeader';
import { FourSteps } from '@/components/FourSteps';
import { HeroCard } from '@/components/HeroCard';
import { TabBar } from '@/components/TabBar';
import { spacing } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <AppHeader />
        <View style={styles.sections}>
          <HeroCard />
          <FourSteps />
        </View>
      </ScrollView>
      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    gap: 24, // space between the header and the HeroCard
    paddingHorizontal: spacing.screen, // same side space for everything on the screen
    paddingBottom: 120, // room so the last content can scroll above the floating TabBar
  },
  sections: {
    gap: 32, // space between HeroCard and FourSteps
  },
});
