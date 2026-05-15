import React from 'react';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';
import { ChevronLeft, Pencil, Trash2, ImageIcon, Mic } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import Card from '../components/Card';
import { Body, Heading, Caption, Subheading } from '../components/Typography';
import { SCREENS } from '../constants/screens';

/**
 * EntryDetailScreen displays specific information about a journal entry.
 * Demonstrates Завдання 3: Передача даних між екранами.
 */
export default function EntryDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Extracting parameters passed from the previous screen (e.g., CalendarScreen)
  const { id } = route.params || { id: 'Mock ID' };

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
            <Heading className="text-lg">Tuesday, April 15, 2025</Heading>
            <Caption>9:42 PM • ID: {id}</Caption>
          </View>
          <Text className="text-4xl leading-10">😊</Text>
        </View>

        {/* Journal Entry text */}
        <View className="p-6 border-b border-[#e0dddb] gap-3">
          <Body className="font-medium">Journal Entry</Body>
          <View className="gap-4">
            <Body>
              Today was surprisingly productive. I woke up early and managed to get my morning run in before the day got too hectic. The fresh air really helped clear my mind and set a positive tone for the rest of the day.
            </Body>
            <Body>
              Work was challenging but rewarding. We finally made progress on the project that's been stalled for weeks. The team collaboration was excellent, and I felt really valued for my contributions. It's moments like these that remind me why I love what I do.
            </Body>
            <Body>
              In the evening, I had dinner with Sarah. We talked about our upcoming plans and it felt good to reconnect. Sometimes we get so caught up in our routines that we forget to make time for the people who matter most.
            </Body>
          </View>
        </View>

        {/* Media */}
        <View className="p-6 border-b border-neutral-200 gap-4">
          <Body className="font-medium">Media</Body>
          <View className="flex-row gap-2">
            <View className="flex-1 h-[101px] bg-[#cbc5bf] rounded-lg justify-center items-center">
              <ImageIcon color="#fcfbfa" size={24} />
              <Caption className="text-[#fcfbfa] mt-1">Photo 1</Caption>
            </View>
            <View className="flex-1 h-[101px] bg-[#cbc5bf] rounded-lg justify-center items-center">
              <ImageIcon color="#fcfbfa" size={24} />
              <Caption className="text-[#fcfbfa] mt-1">Photo 2</Caption>
            </View>
            <View className="flex-1 h-[101px] bg-[#cbc5bf] rounded-lg justify-center items-center">
              <Mic color="#fcfbfa" size={24} />
              <Caption className="text-[#fcfbfa] mt-1">Audio</Caption>
            </View>
          </View>
          {/* Audio Player Mock */}
          <Card className="flex-row items-center gap-3 mt-2">
            <View className="w-10 h-10 bg-[#2c2926] rounded-full justify-center items-center">
              <View className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
            </View>
            <View className="flex-1 gap-2">
              <View className="w-full h-1 bg-[#e0dddb] rounded-full overflow-hidden">
                <View className="w-1/3 h-full bg-[#2c2926]" />
              </View>
              <View className="flex-row justify-between">
                <Caption>1:23</Caption>
                <Caption>3:45</Caption>
              </View>
            </View>
          </Card>
        </View>

        {/* Tags */}
        <View className="p-6 border-b border-neutral-200 gap-4">
          <Body className="font-medium">Tags</Body>
          <View className="flex-row flex-wrap gap-2">
            {['Work', 'Friends', 'Productivity', 'Exercise'].map((tag, i) => (
              <View key={i} className="px-3 py-1.5 bg-[#f1f0ee] rounded-lg border border-[#e0dddb]">
                <Caption className="text-[#2c2926]">{tag}</Caption>
              </View>
            ))}
          </View>
        </View>

        {/* 3 Good Things */}
        <View className="p-6 border-b border-neutral-200 gap-4">
          <Body className="font-medium">3 Good Things Today</Body>
          <View className="gap-3">
            {[
              "Morning run in perfect weather - felt energized all day",
              "Team breakthrough on the project - collaboration at its best",
              "Quality time with Sarah over dinner - reminded me what matters"
            ].map((item, i) => (
              <View key={i} className="flex-row gap-3 items-start">
                <Body className="w-[20px]">{i + 1}.</Body>
                <Body className="flex-1">{item}</Body>
              </View>
            ))}
          </View>
        </View>

        {/* Actions */}
        <View className="px-6 pt-6 pb-10 gap-3">
          <Button 
            title="Edit"
            icon={Pencil}
            onPress={() => navigation.navigate(SCREENS.ENTRY_DETAIL_EDIT)}
          />
          <Button 
            title="Delete"
            variant="secondary"
            icon={Trash2}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
