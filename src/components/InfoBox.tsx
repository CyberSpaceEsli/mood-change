import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import { AppText } from '@/components/AppText';
import { colors } from '@/constants/theme';

type InfoBoxProps = {
  Icon: FC<SvgProps>;
  text: string;
  subText: string;
};

export function InfoBox({ Icon, text, subText }: InfoBoxProps) {
  return (
    <View style={styles.box}>
      <View style={styles.iconBox}>
        <Icon width={18} height={18} color={colors.ink900} />
      </View>
      <View style={styles.texts}>
        <AppText variant="labelBig" numberOfLines={1} style={styles.text}>
          {text}
        </AppText>
        <AppText variant="small" numberOfLines={1} style={styles.subText}>
          {subText}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 20,
    backgroundColor: colors.yellowPale,
    borderWidth: 1,
    borderColor: colors.yellowOutline,
  },
  iconBox: {
    width: 34,
    height: 34, // same as the icon box in RememberLabels
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.whiteOutline,
    backgroundColor: colors.yellowSoft, // nearly white yellow
  },
  texts: {
    flex: 1,
    gap: 2, // space between the two text lines
  },
  text: {
    color: colors.ink900,
  },
  subText: {
    color: colors.ink600,
  },
});
