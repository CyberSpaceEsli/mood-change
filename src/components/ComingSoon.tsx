import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';

import HomeSvg from '../../assets/icons/home.svg';
import BackgroundSvg from '../../assets/icons/letgo-background.svg';
import SproutSvg from '../../assets/icons/sprout-flower.svg';
import SunSvg from '../../assets/icons/sun-sunny.svg';

import { AppHeader } from '@/components/AppHeader';
import { AppText } from '@/components/AppText';
import { TabBar } from '@/components/TabBar';
import { colors, fonts, spacing } from '@/constants/theme';

const CIRCLE = 230; // diameter of the picture
const SUN = { size: 264, centerX: 168, centerY: 75 }; // sun-sunny incl. glow, clipped by the circle
const SPROUT = { width: 56, height: 72, baseY: 196 };

// A value that moves back and forth forever, like a light breeze.
function useBreeze(duration: number) {
  const [value] = useState(() => new Animated.Value(0));
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(value, { toValue: 1, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(value, { toValue: 0, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [value, duration]);
  return value;
}

export function ComingSoon() {
  const sproutWind = useBreeze(2200);
  const sunWind = useBreeze(3200);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <AppHeader />
      </View>

      <View style={styles.content}>
        <View style={styles.shadow}>
          <View style={styles.circle}>
            <BackgroundSvg width={CIRCLE} height={CIRCLE} preserveAspectRatio="xMidYMid slice" />
            <Animated.View
              style={[
                styles.layer,
                {
                  top: SUN.centerY - SUN.size / 2,
                  left: SUN.centerX - SUN.size / 2,
                  transform: [
                    { translateX: sunWind.interpolate({ inputRange: [0, 1], outputRange: [-3, 3] }) },
                    { translateY: sunWind.interpolate({ inputRange: [0, 1], outputRange: [2, -2] }) },
                  ],
                },
              ]}
            >
              <SunSvg width={SUN.size} height={SUN.size} />
            </Animated.View>
            <Animated.View
              style={[
                styles.layer,
                {
                  top: SPROUT.baseY - SPROUT.height,
                  left: (CIRCLE - SPROUT.width) / 2,
                  transformOrigin: '50% 100%', // sways around its base in the sand
                  transform: [{ rotate: sproutWind.interpolate({ inputRange: [0, 1], outputRange: ['-3deg', '3deg'] }) }],
                },
              ]}
            >
              <SproutSvg width={SPROUT.width} height={SPROUT.height} />
            </Animated.View>
          </View>
        </View>

        <View style={styles.texts}>
          <AppText variant="heroQuestion" style={styles.centered}>
            {'Something new\nis growing.'}
          </AppText>
          <AppText variant="body" style={[styles.centered, styles.text]}>
            {'We’re still nurturing this part of Mood Change.\nIt will be ready for you soon.'}
          </AppText>
        </View>

        <Pressable style={styles.button} onPress={() => router.replace('/')} accessibilityRole="button">
          <AppText variant="heroButtonText" style={styles.buttonText}>
            Back to Home
          </AppText>
        </Pressable>
      </View>

      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.screen,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // centred between the header and the TabBar
    paddingBottom: 100, // room for the floating TabBar
    paddingHorizontal: spacing.screen,
  },
  shadow: {
    borderRadius: CIRCLE / 2,
    shadowColor: colors.ink900,
    shadowOpacity: 0.1,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  circle: {
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
    overflow: 'hidden', // clips the picture, sun and sprout to the circle
    borderWidth: 1,
    borderColor: colors.outline,
    backgroundColor: colors.heroBackground,
  },
  layer: {
    position: 'absolute',
  },
  texts: {
    marginTop: 40, // space between the circle and the text
    alignItems: 'center',
    gap: 8,
  },
  label: {
    letterSpacing: 1,
    marginBottom: 4,
  },
  centered: {
    textAlign: 'center',
  },
  text: {
    color: colors.ink600,
    marginTop: 4,
  },
  button: {
    marginTop: 32,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.whiteOutline,
    backgroundColor: colors.mint,
  },
  buttonText: {
    color: colors.ink900,
    fontFamily: fonts.inter.semiBold,
  },
});
