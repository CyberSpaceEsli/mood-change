import { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import BackgroundSvg from '../../assets/icons/done-background-mountains.svg';
import FlowerSvg from '../../assets/icons/sprout-flower.svg';

import { colors } from '@/constants/theme';

const FLOWER = { width: 40, height: 64 }; // the size of the svg

export function DoneCard() {
  const [wind] = useState(() => new Animated.Value(0));

  // a light breeze: the flower sways slowly back and forth
  useEffect(() => {
    const sway = (toValue: number) =>
      Animated.timing(wind, { toValue, duration: 2400, easing: Easing.inOut(Easing.sin), useNativeDriver: true });
    const loop = Animated.loop(Animated.sequence([sway(1), sway(0)]));
    loop.start();
    return () => loop.stop();
  }, [wind]);

  return (
    <View style={styles.card}>
      <BackgroundSvg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
      <Animated.View
        style={[
          styles.flower,
          {
            transformOrigin: '50% 100%', // sways around its base
            transform: [{ rotate: wind.interpolate({ inputRange: [0, 1], outputRange: ['-4deg', '4deg'] }) }],
          },
        ]}
      >
        <FlowerSvg width={FLOWER.width} height={FLOWER.height} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 212,
    borderRadius: 26,
    backgroundColor: colors.heroBackground,
    overflow: 'hidden', // clips the picture to the rounded corners
  },
  flower: {
    position: 'absolute', // stands on the hills at the bottom, in the middle
    bottom: 0,
    alignSelf: 'center',
  },
});
