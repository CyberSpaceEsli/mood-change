import { StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/AppHeader';
import { HeroCard } from '@/components/HeroCard';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <AppHeader />
      <HeroCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
  },
});
