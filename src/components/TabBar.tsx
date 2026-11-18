import { router, usePathname } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import BookmarkSvg from '../../assets/icons/bookmark.svg';
import FeedbackSvg from '../../assets/icons/feedback.svg';
import HomeSvg from '../../assets/icons/home.svg';
import WindSvg from '../../assets/icons/wind.svg';

import { AppText } from '@/components/AppText';
import { colors, spacing } from '@/constants/theme';

const items = [
  { label: 'Home', Icon: HomeSvg, href: '/' },
  { label: 'Feedback', Icon: FeedbackSvg, href: '/feedback' },
  { label: 'Content', Icon: BookmarkSvg, href: '/content' },
  { label: 'Calm', Icon: WindSvg, href: '/calm' },
] as const;

export function TabBar() {
  const pathname = usePathname(); // the active item follows the current screen

  return (
    <View style={styles.bar}>
      {items.map(({ label, Icon, href }) => {
        const isActive = pathname === href;
        return (
          <Pressable
            key={label}
            onPress={() => router.replace(href)}
            style={[styles.item, isActive && styles.itemActive]}
          >
            <Icon
              width={20}
              height={20}
              color={isActive ? colors.forestIcon : colors.ink600}
              fill={isActive ? colors.forestIcon : 'none'}
            />
            <AppText
              variant={isActive ? 'linkActive' : 'link'}
              style={{ color: isActive ? colors.ink900 : colors.ink600 }}
            >
              {label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute', // floats above the screen content
    bottom: 22,
    left: spacing.screen,
    right: spacing.screen,
    flexDirection: 'row',
    justifyContent: 'space-evenly', // equal gaps between the 4 items
    paddingVertical: 6,
    borderRadius: 26,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.outline, // subtle off-grey edge against the background
  },
  item: {
    alignItems: 'center', // icon centered above its text
    justifyContent: 'center', // icon + text centered vertically in the box
    gap: 4,
    height: 54,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent', // same height as the active box
  },
  itemActive: {
    width: 86,
    backgroundColor: colors.mint,
    borderColor: colors.whiteOutline,
  },
});
