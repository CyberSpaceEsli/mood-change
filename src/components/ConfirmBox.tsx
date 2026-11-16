import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { CheckBox } from '@/components/CheckBox';
import { colors } from '@/constants/theme';

type ConfirmBoxProps = {
  title: string;
  items: string[];
  onChange?: (checked: boolean[]) => void;
};

export function ConfirmBox({ title, items, onChange }: ConfirmBoxProps) {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));

  const toggle = (index: number) => {
    const next = checked.map((value, i) => (i === index ? !value : value));
    setChecked(next);
    onChange?.(next);
  };

  return (
    <View style={styles.container}>
      <AppText variant="labelBig">{title}</AppText>
      <View style={styles.list}>
        {items.map((text, index) => {
          const isChecked = checked[index];
          return (
            <Pressable
              key={text}
              onPress={() => toggle(index)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: isChecked }}
              style={[styles.action, isChecked && styles.actionChecked]}
            >
              <CheckBox checked={isChecked} size={26} radius={6} />
              <AppText variant="label" style={styles.text}>
                {text}
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
    gap: 8, // space between the title and the boxes
  },
  list: {
    gap: 8,
  },
  action: {
    flexDirection: 'row', // checkbox next to the text
    alignItems: 'center',
    gap: 14,
    minHeight: 64, // same height as RememberLabels (34 icon box + 2×14 padding + 2 border)
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  actionChecked: {
    borderColor: '#2F6B6A66', // forest at 40%
  },
  text: {
    flex: 1,
    color: colors.ink900,
  },
});
