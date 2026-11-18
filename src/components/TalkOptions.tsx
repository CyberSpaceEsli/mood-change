import type { FC } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path, type SvgProps } from 'react-native-svg';

import ClockSvg from '../../assets/icons/clock.svg';
import FeedbackSvg from '../../assets/icons/feedback.svg';

import { AppText } from '@/components/AppText';
import { colors, fonts } from '@/constants/theme';

type Option = { title: string; text: string; Icon: FC<SvgProps>; onPress?: () => void };

type TalkOptionsProps = {
  onNow?: () => void;
  onLater?: () => void;
};

export function TalkOptions({ onNow, onLater }: TalkOptionsProps) {
  const options: Option[] = [
    { title: 'Now', text: 'We both feel calm\nand ready.', Icon: FeedbackSvg, onPress: onNow },
    { title: 'Later', text: "We'll come back\nto it later.", Icon: ClockSvg, onPress: onLater },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.intro}>
        <AppText variant="heading">Content</AppText>
        <AppText variant="body">When do you want to talk about it?</AppText>
      </View>
      <View style={styles.row}>
        {options.map(({ title, text, Icon, onPress }) => (
          <Pressable key={title} style={styles.option} onPress={onPress} accessibilityRole="button">
            <View style={styles.top}>
              <View style={styles.iconBox}>
                <Icon width={20} height={20} color={colors.forest} />
              </View>
              <Svg width={16} height={16} viewBox="0 0 16 16">
                <Path
                  d="M6 3.5L10.5 8L6 12.5"
                  stroke={colors.forest}
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </Svg>
            </View>
            <View style={styles.texts}>
              <AppText variant="heroButtonText" style={styles.title}>
                {title}
              </AppText>
              <AppText variant="body" style={styles.text}>
                {text}
              </AppText>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  intro: {
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  option: {
    flex: 1, // two equal columns
    gap: 12,
    padding: 16,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: colors.whiteOutline,
    backgroundColor: colors.mint,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBox: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: colors.white,
  },
  texts: {
    gap: 2,
  },
  title: {
    fontFamily: fonts.inter.bold,
    fontSize: 18,
    color: colors.ink900,
  },
  text: {
    color: colors.ink600,
  },
});
