import React from 'react';
import { View, TouchableOpacity, ScrollView, Text, Image, Alert } from 'react-native';
import { ChevronLeft, Pencil, Trash2, ImageIcon, Mic } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import Card from '../components/Card';
import { Body, Heading, Caption, Subheading } from '../components/Typography';
import { SCREENS } from '../constants/screens';
import { useSelector, useDispatch } from 'react-redux';
import { removeEntry } from '../store/slices/entriesSlice';
import AudioPlayer from '../components/AudioPlayer';
import { useTheme } from '../context/ThemeContext';

/**
 * EntryDetailScreen displays specific information about a journal entry.
 * Demonstrates Завдання 3: Передача даних між екранами.
 */
export default function EntryDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { colors } = useTheme();
  
  // Extracting parameters passed from the previous screen (e.g., CalendarScreen)
  const { id } = route.params || { id: 'Mock ID' };

  const allEntries = useSelector(state => state.entries.list);
  const entry = allEntries.find(e => e.id === id) || {
    id: id || 'Mock ID',
    date: '2025-04-15',
    time: '9:42 PM',
    emoji: '😊',
    body: 'Today was surprisingly productive. I woke up early and managed to get my morning run in before the day got too hectic. The fresh air really helped clear my mind and set a positive tone for the rest of the day.',
    tags: ['Work', 'Friends', 'Productivity', 'Exercise'],
    gratitude: [
      "Morning run in perfect weather - felt energized all day",
      "Team breakthrough on the project - collaboration at its best",
      "Quality time with Sarah over dinner - reminded me what matters"
    ]
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Entry",
      "Are you sure you want to delete this journal entry? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => {
            dispatch(removeEntry(entry.id));
            navigation.goBack();
          }
        }
      ]
    );
  };

  return (
    <ScreenContainer padding={false} scrollable={false}>
      {/* Header */}
      <View className="px-6 pt-6 pb-4 border-b border-[#e0dddb] flex-row justify-between items-center">
        <TouchableOpacity 
          className="w-10 h-10 rounded-lg justify-center items-center"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft color="#2c2926" size={24} />
        </TouchableOpacity>
        <Subheading>Entry Details</Subheading>
        <View className="w-10" />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        {/* Date and Mood */}
        <View className="px-6 pt-6 pb-4 border-b border-[#e0dddb] flex-row justify-between items-center">
          <View className="gap-1">
            <Heading className="text-lg">{entry.date}</Heading>
            <Caption>{entry.time || '12:00 PM'} • ID: {entry.id}</Caption>
          </View>
          <Text className="text-4xl leading-10">{entry.emoji || entry.mood}</Text>
        </View>

        {/* Journal Entry text */}
        <View className="p-6 border-b border-[#e0dddb] gap-3">
          <Body className="font-medium">Journal Entry</Body>
          <Body>
            {entry.body || entry.text}
          </Body>
        </View>

        {/* Media */}
        {(entry.imageUri || entry.audioUri) && (
          <View className="p-6 border-b border-neutral-200 gap-4">
            <Body className="font-medium">Media</Body>
            {entry.imageUri && (
              <View className="w-full h-48 rounded-lg overflow-hidden">
                <Image 
                  source={{ uri: entry.imageUri }} 
                  className="w-full h-full" 
                  resizeMode="cover"
                />
              </View>
            )}
            {entry.audioUri && (
              <AudioPlayer uri={entry.audioUri} />
            )}
          </View>
        )}

        {/* Tags */}
        {entry.tags && entry.tags.length > 0 && (
          <View className="p-6 border-b border-neutral-200 gap-4">
            <Body className="font-medium">Tags</Body>
            <View className="flex-row flex-wrap gap-2">
              {entry.tags.map((tag, i) => (
                <View key={i} className="px-3 py-1.5 bg-[#f1f0ee] rounded-lg border border-[#e0dddb]">
                  <Caption className="text-[#2c2926]">{tag}</Caption>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* 3 Good Things */}
        {entry.gratitude && entry.gratitude.length > 0 && (
          <View className="p-6 border-b border-neutral-200 gap-4">
            <Body className="font-medium">3 Good Things Today</Body>
            <View className="gap-3">
              {entry.gratitude.map((item, i) => (
                <View key={i} className="flex-row gap-3 items-start">
                  <Body className="w-[20px]">{i + 1}.</Body>
                  <Body className="flex-1">{item}</Body>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Actions */}
        <View className="px-6 pt-6 pb-10 gap-3">
          <Button 
            title="Edit"
            icon={Pencil}
            onPress={() => navigation.navigate(SCREENS.ENTRY_DETAIL_EDIT, { id: entry.id })}
          />
          <Button 
            title="Delete"
            variant="secondary"
            icon={Trash2}
            onPress={handleDelete}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
