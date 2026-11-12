import { StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/AppHeader';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <AppHeader />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
