import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { SoundCard } from '@/components/SoundCard';

const DURATION = 15; // shown length of the soundtrack in seconds

export function LoveAffirmations() {
  const player = useAudioPlayer(require('../../assets/audio/love-affirmations.m4a'));
  const status = useAudioPlayerStatus(player);

  // Play even when the iPhone's silent switch is on.
  useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: true });
  }, []);

  // Rewind when the soundtrack has finished, so the next press starts from the beginning.
  useEffect(() => {
    if (status.didJustFinish) player.seekTo(0);
  }, [status.didJustFinish, player]);

  const toggle = () => {
    if (status.playing) player.pause();
    else player.play();
  };

  return (
    <View style={styles.container}>
      <AppText variant="heading">Love affirmations</AppText>
      <SoundCard duration={DURATION} position={Math.min(status.currentTime, DURATION)}
        playing={status.playing}
        onPress={toggle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8, // space between the title and the card
  },
});
