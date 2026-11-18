import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import HumanBodySvg from '../../assets/icons/human-body.svg';

import { AppText } from '@/components/AppText';
import { CheckBox } from '@/components/CheckBox';
import { colors, fonts } from '@/constants/theme';

const parts = ['Head', 'Heart', 'Stomach'];

type BodyCardProps = {
  onChange?: (selected: string[]) => void;
};

export function BodyCard({ onChange }: BodyCardProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [other, setOther] = useState<string | null>(null); // null: "Other..." not opened yet

  const update = (next: string[]) => {
    setSelected(next);
    onChange?.(next);
  };

  const toggle = (part: string) =>
    update(selected.includes(part) ? selected.filter((p) => p !== part) : [...selected, part]);

  const cells = [
    ...parts.map((part) => {
      const isChecked = selected.includes(part);
      return (
        <Pressable
          key={part}
          onPress={() => toggle(part)}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: isChecked }}
          style={[styles.option, isChecked && styles.optionChecked]}
        >
          <CheckBox checked={isChecked} size={22} radius={6} checkedBackground={colors.white} checkedBorderColor={colors.forest} />
          <AppText variant="label" numberOfLines={1} style={styles.text}>
            {part}
          </AppText>
        </Pressable>
      );
    }),
    other === null ? (
      <Pressable key="other" onPress={() => setOther('')} accessibilityRole="button" style={styles.option}>
        <View style={styles.plusBox}>
          <Svg width={10} height={10} viewBox="0 0 12 12">
            <Path d="M6 1.5v9M1.5 6h9" stroke={colors.forest} strokeWidth={1.6} strokeLinecap="round" />
          </Svg>
        </View>
        <AppText variant="label" style={[styles.text, { color: colors.forest }]}>
          Other...
        </AppText>
      </Pressable>
    ) : (
      <View key="other" style={[styles.option, other.trim() !== '' && styles.optionChecked]}>
        <CheckBox checked={other.trim() !== ''} size={22} radius={6} checkedBackground={colors.white} checkedBorderColor={colors.forest} />
        <TextInput
          autoFocus
          value={other}
          onChangeText={(text) => {
            setOther(text);
            const rest = selected.filter((p) => parts.includes(p));
            update(text.trim() ? [...rest, text.trim()] : rest);
          }}
          placeholder="Other..."
          placeholderTextColor={colors.ink600}
          style={styles.input}
        />
      </View>
    ),
  ];

  return (
    <View style={styles.card}>
      <View style={styles.figure}>
        <HumanBodySvg width={44} height={96} />
      </View>
      <View style={styles.content}>
        <AppText variant="headingSmall">
          {'Where do you feel it\nin your body?'}
        </AppText>
        <View style={styles.grid}>
          <View style={styles.row}>{cells.slice(0, 2)}</View>
          <View style={styles.row}>{cells.slice(2)}</View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 164, // grows with the content
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    borderRadius: 26,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  figure: {
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: colors.heroBackground,
  },
  content: {
    flex: 1,
    gap: 8, // space between title and options
  },
  grid: {
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    gap: 6,
  },
  option: {
    flex: 1, // two equal columns
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minHeight: 46,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: '#F1F7F2',
    borderWidth: 1,
    borderColor: '#2F6B6A66', // forest at 40%
  },
  optionChecked: {
    borderColor: colors.forest,
  },
  text: {
    flex: 1,
    color: colors.ink900,
  },
  plusBox: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.forest,
  },
  input: {
    flex: 1,
    padding: 0,
    fontFamily: fonts.inter.medium,
    fontSize: 14,
    color: colors.ink900,
  },
});
