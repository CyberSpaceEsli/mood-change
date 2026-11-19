import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/AppText';
import { DoneCard } from '@/components/DoneCard';
import { ProcessHeader } from '@/components/ProcessHeader';
import { ProcessIntro } from '@/components/ProcessIntro';
import { ProcessNav } from '@/components/ProcessNav';
import { TalkOptions } from '@/components/TalkOptions';
import { colors, spacing } from '@/constants/theme';

export default function DoneScreen() {
  const goHome = () => router.replace('/');
  const goToContent = () => router.replace('/content'); // shows ComingSoon for now

  return (
    <View style={styles.screen}>
      <View style={styles.top}>
        <ProcessHeader onClose={goHome} />
        <View style={styles.nav}>
          <ProcessNav step={5} />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <ProcessIntro step="4 / 4 STEPS" title={'You found your\nway back.'} mediumTitle/>
        <DoneCard />
        {/*<View style={styles.message}>
         <View style={styles.badge}>
            <AppText variant="labelBig" style={styles.badgeText}>
              RAIN COMPLETE
            </AppText>
          </View>
          <AppText variant="heroQuestion">{'You found your\nway back.'}</AppText>
        </View>*/}
        {/*<View style={styles.divider} />*/}
        <TalkOptions onNow={goToContent} onLater={goToContent} />
        <SafeAreaView edges={['bottom']} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  top: {
    paddingHorizontal: spacing.screen, // header and nav stay fixed above the scrolling part
  },
  content: {
    gap: 24, // same space between the parts as in NurtureContent (LetGoCard, ReconnectLabels, ...)
    paddingHorizontal: spacing.screen,
    paddingBottom: 16,
  },
  nav: {
    marginTop: 24,
    paddingBottom: 32, // space to the card belongs to the fixed nav, so the scrolling content starts right below it
  },
  message: {
    gap: 12,
    alignItems: 'flex-start',
  },
  badge: {
    paddingHorizontal: 14,
    height: 32,
    justifyContent: 'center',
    borderRadius: 16,
    backgroundImage: `linear-gradient(${colors.yellowLight} 0%, ${colors.yellow} 100%)`,
  },
  badgeText: {
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 1,
  },
  divider: {
    height: 1, // as thin as the line in ProcessNav
    backgroundColor: colors.mint,
  },
});
