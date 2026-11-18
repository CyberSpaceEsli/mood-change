import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/AppText';
import { DoneCard } from '@/components/DoneCard';
import { ProcessHeader } from '@/components/ProcessHeader';
import { ProcessNav } from '@/components/ProcessNav';
import { TalkOptions } from '@/components/TalkOptions';
import { colors, spacing } from '@/constants/theme';

export default function DoneScreen() {
  const goHome = () => router.replace('/');
  const goToContent = () => router.replace('/content'); // shows ComingSoon for now

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <ProcessHeader onClose={goHome} />
        <View style={styles.nav}>
          <ProcessNav step={5} />
        </View>
        <View style={styles.card}>
          <DoneCard />
        </View>
        <View style={styles.badge}>
          <AppText variant="labelBig" style={styles.badgeText}>
            RAIN COMPLETE
          </AppText>
        </View>
        <AppText variant="heroQuestion" style={styles.title}>
          {'You found your\nway back.'}
        </AppText>
        <View style={styles.options}>
          <TalkOptions onNow={goToContent} onLater={goToContent} />
        </View>
        <SafeAreaView edges={['bottom']} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.screen,
    paddingBottom: 16,
  },
  nav: {
    marginTop: 24,
  },
  card: {
    marginTop: 24,
  },
  badge: {
    alignSelf: 'flex-start',
    marginTop: 16,
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
  title: {
    marginTop: 12,
  },
  options: {
    marginTop: 28,
  },
});
