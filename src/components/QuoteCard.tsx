import { StyleSheet, View } from 'react-native';

import MoodCloudSvg from '../../assets/icons/mood-cloud.svg';
import MountainSvg from '../../assets/icons/mountain-landscape.svg';

import { AppText } from '@/components/AppText';
import { colors } from '@/constants/theme';

type QuoteCardProps = {
  label: string;
  quote: string;
};

export function QuoteCard({ label, quote }: QuoteCardProps) {
  return (
    <View style={styles.card}>
      <MountainSvg
        style={styles.background}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      />
      <MoodCloudSvg style={styles.cloud} width={74} height={70} />
      <View style={styles.texts}>
        <AppText variant="heroIntro">{label}</AppText>
        <AppText variant="heading">{`“${quote}”`}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 150,
    borderRadius: 26,
    backgroundColor: colors.heroBackground,
    overflow: 'hidden', // clips the landscape to the rounded corners
  },
  background: {
    position: 'absolute', // landscape fills the card behind the text
    top: 0,
    left: 0,
  },
  cloud: {
    position: 'absolute', // cloud floats on the right, around the highest peak
    top: 14,
    right: 28,
  },
  texts: {
    paddingTop: 25, // text starts at the top
    paddingHorizontal: 24,
    gap: 5, // space between label and quote
  },
});
