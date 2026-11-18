import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import HandshakeSvg from '../../assets/icons/handshake.svg';
import HugSvg from '../../assets/icons/hug.svg';

import { AppText } from '@/components/AppText';
import { colors } from '@/constants/theme';

const options = [
  { label: 'Handshake', Icon: HandshakeSvg },
  { label: 'Hug', Icon: HugSvg },
];

type ReconnectLabelsProps = {
  onChange?: (selected: string | null) => void;
  subText?: string;
};

export function ReconnectLabels({ onChange, subText }: ReconnectLabelsProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const select = (label: string) => {
    const next = selected === label ? null : label; // tap again to deselect
    setSelected(next);
    onChange?.(next);
  };

  return (
    <View style={styles.container}>
      <AppText variant="heading">Reconnect</AppText>
         <AppText variant="body" style={styles.subText}>
            {subText}
          </AppText>
      <View style={styles.row}>
        {options.map(({ label, Icon }) => {
          const isSelected = selected === label;
          return (
            <Pressable
              key={label}
              onPress={() => select(label)}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              style={[styles.option, isSelected && styles.optionSelected]}
            >
              <View style={styles.iconBox}>
                <Icon width={22} height={22} />
              </View>
              <AppText variant="labelBig" style={styles.text}>
                {label}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8, // space between the title and the options
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  option: {
    flex: 1, // two equal columns
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 26,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  optionSelected: {
    borderColor: '#2F6B6A66', // forest at 40%
  },
  iconBox: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.whiteOutline,
    backgroundColor: colors.mint,
  },
  text: {
    color: colors.ink900,
  },
   subText: {
    color: colors.ink600,
  }
});
