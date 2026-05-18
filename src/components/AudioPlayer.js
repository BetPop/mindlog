import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Play, Square } from 'lucide-react-native';
import { Audio } from 'expo-av';
import { useTheme } from '../context/ThemeContext';
import { Caption } from './Typography';

export default function AudioPlayer({ uri }) {
  const { colors } = useTheme();
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handlePlayPause = async () => {
    if (isPlaying) {
      if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    } else {
      if (!sound) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri },
          { shouldPlay: true }
        );
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setIsPlaying(false);
          }
        });
        setSound(newSound);
        setIsPlaying(true);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  return (
    <View 
      className="flex-row items-center gap-3 px-3 py-2 rounded-lg border"
      style={{ backgroundColor: colors.background, borderColor: colors.border }}
    >
      <TouchableOpacity 
        onPress={handlePlayPause}
        className="w-8 h-8 rounded-full justify-center items-center"
        style={{ backgroundColor: colors.text }}
      >
        {isPlaying ? (
          <Square color={colors.background} size={14} fill={colors.background} />
        ) : (
          <Play color={colors.background} size={14} fill={colors.background} />
        )}
      </TouchableOpacity>
      <Caption style={{ color: colors.text }}>
        {isPlaying ? 'Playing...' : 'Voice Note'}
      </Caption>
    </View>
  );
}
