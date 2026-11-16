import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { AppText } from '@/components/AppText';
import { CheckBox } from '@/components/CheckBox';
import { colors, fonts } from '@/constants/theme';

const emotions = ['Irritated', 'Overwhelmed', 'Angry', 'Anxious', 'Disconnected'];

type EmotionOptionProps = {
  onChange?: (selected: string[]) => void;
};

export function EmotionOption({ onChange }: EmotionOptionProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [other, setOther] = useState<string | null>(null); // null: "Other..." not opened yet

  const update = (next: string[]) => {
    setSelected(next);
    onChange?.(next);
  };

  const toggle = (emotion: string) =>
    update(selected.includes(emotion) ? selected.filter((e) => e !== emotion) : [...selected, emotion]);

  const cells = [
    ...emotions.map((emotion) => {
      const isChecked = selected.includes(emotion);
      return (
        <Pressable
          key={emotion}
          onPress={() => toggle(emotion)}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: isChecked }}
          style={[styles.option, isChecked && styles.optionChecked]}
        >
          <CheckBox checked={isChecked} size={26} radius={6} />
          <AppText variant="label" numberOfLines={1} style={styles.text}>
            {emotion}
          </AppText>
        </Pressable>
      );
    }),
    other === null ? (
      <Pressable key="other" onPress={() => setOther('')} accessibilityRole="button" style={styles.option}>
        <View style={styles.plusBox}>
          <Svg width={12} height={12} viewBox="0 0 12 12">
            <Path d="M6 1.5v9M1.5 6h9" stroke={colors.forest} strokeWidth={1.6} strokeLinecap="round" />
          </Svg>
        </View>
        <AppText variant="label" style={[styles.text, { color: colors.forest }]}>
          Other...
        </AppText>
      </Pressable>
    ) : (
      <View key="other" style={[styles.option, other.trim() !== '' && styles.optionChecked]}>
        <CheckBox checked={other.trim() !== ''} size={26} radius={6} />
        <TextInput
          autoFocus
          value={other}
          onChangeText={(text) => {
            setOther(text);
            const rest = selected.filter((e) => emotions.includes(e));
            update(text.trim() ? [...rest, text.trim()] : rest);
          }}
          placeholder="Other..."
          placeholderTextColor={colors.ink600}
          style={styles.input}
        />
      </View>
    ),
  ];

  // two columns
  const rows = [];
  for (let i = 0; i < cells.length; i += 2) rows.push(cells.slice(i, i + 2));

  return (
    <View style={styles.container}>
      <AppText variant="heading">Which emotion do you feel?</AppText>
      <View style={styles.grid}>
        {rows.map((row, i) => (
          <View key={i} style={styles.row}>
            {row}
            {row.length === 1 && <View style={styles.spacer} />}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  grid: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  spacer: {
    flex: 1,
  },
  option: {
    flex: 1, // two equal columns
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    minHeight: 52,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.outline
  },
  optionChecked: {
    borderColor: '#2F6B6A66', // forest at 40%
  },
  text: {
    flex: 1,
    color: colors.ink900,
  },
  plusBox: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: 'dashed',
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
