import { router } from 'expo-router';
import { useState } from 'react';
import {
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AllowContent } from '@/components/AllowContent';
import { AppText } from '@/components/AppText';
import { Pagination } from '@/components/Pagination';
import { ProcessHeader } from '@/components/ProcessHeader';
import { ProcessNav } from '@/components/ProcessNav';
import { RecognizeContent } from '@/components/RecognizeContent';
import { spacing } from '@/constants/theme';

// One page per RAIN step. Steps 2 to 4 are placeholders until their content exists.
const pages = [
  <RecognizeContent key="recognise" />,
  <AllowContent key="allow" />,
  <AppText key="investigate">Investigate</AppText>,
  <AppText key="nurture">Nurture</AppText>,
];

export default function ProcessScreen() {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (width > 0) setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.padded}>
        <ProcessHeader step={index + 1} onClose={() => router.back()} />
        <View style={styles.nav}>
          <ProcessNav step={index + 1} />
        </View>
      </View>

      <View style={styles.pager} onLayout={onLayout}>
        {width > 0 && (
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onScrollEnd}
          >
            {pages.map((page, i) => (
              <ScrollView key={i} style={{ width }} contentContainerStyle={styles.page}>
                {page}
              </ScrollView>
            ))}
          </ScrollView>
        )}
      </View>

      <SafeAreaView edges={['bottom']} style={styles.pagination}>
        <Pagination count={pages.length} index={index} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: spacing.screen,
  },
  nav: {
    marginTop: 24,
  },
  pager: {
    flex: 1,
    marginTop: 32,
  },
  page: {
    paddingHorizontal: spacing.screen,
  },
  pagination: {
    paddingVertical: 12,
  },
});
