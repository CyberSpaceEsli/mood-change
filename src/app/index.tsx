import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <AppText variant="title">Mood Change</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
