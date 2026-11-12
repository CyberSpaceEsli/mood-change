import { Pressable, StyleSheet, View } from 'react-native';

import HeroBackgroundSvg from '../../assets/icons/hero-background.svg';
import RaindropSvg from '../../assets/icons/raindrop.svg';

import { AppText } from '@/components/AppText';
import { colors } from '@/constants/theme';

export function HeroCard() {
  return (
    <View style={styles.card}>
      <View style={styles.image}>
        {/* "slice" fills the card like "cover", trimming edges if the shape differs */}
        <HeroBackgroundSvg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
      </View>
      <View style={styles.content}>
        <View style={styles.texts}>
          <AppText variant="heroIntro">RAIN · 4 STEPS</AppText>
          <AppText variant="heroQuestion">{'Notice a\nmood change?'}</AppText>
          <AppText variant="heroText">{'Pause. Use the steps.\nFind your way back together.'}</AppText>
        </View>

        <Pressable style={styles.button}>
          <AppText variant="heroButtonText" style={styles.buttonText}>
            Start
          </AppText>
          <RaindropSvg width={16} height={19} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 238,
    backgroundColor: colors.heroBackground,
    borderRadius: 26,
    boxShadow: '0px 4px 12px 1px rgba(27, 58, 64, 0.04)', // Ink 900 at 4%, spread 1
  },
  image: {
    position: 'absolute', // image fills the card behind the content
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 26,
    overflow: 'hidden', // clips the SVG to the rounded corners
  },
  content: {
    flex: 1,
    paddingTop: 25,
    paddingBottom: 16, // button sits closer to the bottom
    paddingHorizontal: 24,
    gap: 15, // space between the text and the button
    alignItems: 'flex-start',
    borderRadius: 26,
    boxShadow: 'inset 0px 4px 12px 1px rgba(27, 58, 64, 0.04)', // inner shadow, Ink 900 at 4%, spread 1
  },
  texts: {
    gap: 5, // space between the text lines
  },
  button: {
    width: 102,
    height: 48,
    borderRadius: 20,
    backgroundColor: colors.forest,
    borderWidth: 1,
    borderColor: colors.whiteOutline,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },
  buttonText: {
    color: colors.background,
  },
});
