import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import { AppText } from '@/components/AppText';
import { colors } from '@/constants/theme';

type RememberLabelsProps = {
  title: string;
  items: { Icon: FC<SvgProps>; text: string }[];
};

export function RememberLabels({ title, items }: RememberLabelsProps) {
  return (
    <View style={styles.container}>
      <AppText variant="labelBig">{title}</AppText>
      <View style={styles.list}>
        {items.map(({ Icon, text }) => (
          <View key={text} style={styles.action}>
            <View style={styles.iconBox}>
              <Icon width={18} height={18} color={colors.forest} />
            </View>
            <AppText variant="label" numberOfLines={1} style={styles.text}>
              {text}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8, // space between "Remember:" and the labels
  },
  list: {
    gap: 8, // space between the two labels
  },
  action: {
    flexDirection: 'row', // icon box next to the text
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 26,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.outline, // same subtle grey as the TabBar
  },
  iconBox: {
    width: 34,
    height: 34, // same as the StepCard letter box: 24 line + 2×2 padding + 2 border
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.whiteOutline,
    backgroundColor: colors.mint,
  },
  text: {
    flex: 1,
    color: colors.ink900,
  },
});
