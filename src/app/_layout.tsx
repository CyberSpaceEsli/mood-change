import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_800ExtraBold as Inter_800Bold,
} from '@expo-google-fonts/inter';
import {
  Lora_400Regular,
  Lora_500Medium,
  Lora_600SemiBold,
  Lora_700Bold,
} from '@expo-google-fonts/lora';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { LoadingScreen } from '@/components/LoadingScreen';
import { colors } from '@/constants/theme';

// Keep the splash screen visible until the fonts are ready.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [showLoading, setShowLoading] = useState(true);
  const [loaded, error] = useFonts({
    Lora_400Regular,
    Lora_500Medium,
    Lora_600SemiBold,
    Lora_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_800Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hide();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.root}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        {/* no swipe-back from the screen edge, the process is left with the close icon only */}
        <Stack.Screen name="process" options={{ gestureEnabled: false }} />
        {/* the TabBar screens switch without a slide */}
        <Stack.Screen name="done" options={{ gestureEnabled: false, animation: 'slide_from_right', animationTypeForReplace: 'push' }} />
        <Stack.Screen name="index" options={{ animation: 'none' }} />
        <Stack.Screen name="feedback" options={{ animation: 'none' }} />
        <Stack.Screen name="content" options={{ animation: 'none' }} />
        <Stack.Screen name="calm" options={{ animation: 'none' }} />
      </Stack>
      <StatusBar style="dark" />
      {showLoading && <LoadingScreen onFinish={() => setShowLoading(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
