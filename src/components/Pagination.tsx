import { StyleSheet, View } from 'react-native';

import { colors } from '@/constants/theme';

type PaginationProps = {
  count: number; // total number of pages
  index: number; // current page, 0-based
};

export function Pagination({ count, index }: PaginationProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: count }, (_, i) => (
        <View key={i} style={[styles.dot, i === index && styles.dotActive, i < index && styles.dotDone]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.stepIdleOutline,
  },
  dotDone: {
    opacity: 0.4, // already passed, the user can only swipe forward
  },
  dotActive: {
    width: 20, // the current page is a pill
    backgroundColor: colors.forest,
  },
});
