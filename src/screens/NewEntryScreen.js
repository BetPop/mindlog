import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, TextInput, Text } from 'react-native';
import { ChevronLeft, Image as ImageIcon, Mic } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { Body, Subheading } from '../components/Typography';

export default function NewEntryScreen() {
  const navigation = useNavigation();
  const [selectedMood, setSelectedMood] = useState(1);
  const [entryText, setEntryText] = useState('');
  const [gratitude1, setGratitude1] = useState('');
  const [gratitude2, setGratitude2] = useState('');
  const [gratitude3, setGratitude3] = useState('');

  const moods = ['😊', '😌', '😔', '😰', '😡', '😴'];

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <ScreenContainer padding={false} scrollable={false}>
      {/* Header */}
      <View className="px-6 pt-6 pb-4 border-b border-neutral-200 flex-row justify-between items-center">
        <TouchableOpacity 
          className="w-10 h-10 rounded-lg justify-center items-center"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft color="#2c2926" size={24} />
        </TouchableOpacity>
        <Subheading>New Entry</Subheading>
        <Button 
          title="Save"
          className="h-10 px-4"
          textClassName="text-sm"
          onPress={handleSave}
        />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        {/* Mood Section */}
        <View className="p-6 gap-3">
          <Body className="text-[#2c2926]">How are you feeling?</Body>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2">
            {moods.map((mood, index) => (
              <TouchableOpacity 
                key={index}
                onPress={() => setSelectedMood(index)}
                className={`w-12 h-12 rounded-lg justify-center items-center mr-2 ${selectedMood === index ? 'bg-[#2c2926]' : 'bg-[#e0dddb]'}`}
              >
                <Text className="text-2xl leading-8">{mood}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Journal Entry Section */}
        <View className="px-6 pb-6 border-b border-[#e0dddb] gap-3">
          <Body className="text-[#2c2926]">Journal Entry</Body>
          <View className="h-[180px] p-4 bg-[#fcfbfa] rounded-lg border border-[#cbc5bf]">
            <TextInput 
              placeholder="What's on your mind today?"
              placeholderTextColor="#cbc5bf"
              multiline
              textAlignVertical="top"
              value={entryText}
              onChangeText={setEntryText}
              className="flex-1 text-[#2c2926] text-base font-normal font-primary leading-6"
            />
          </View>
          <View className="flex-row gap-2">
            <Button 
              title="Image"
              variant="secondary"
              icon={ImageIcon}
              className="flex-1 h-10 px-4"
              textClassName="text-sm"
            />
            <Button 
              title="Audio"
              variant="secondary"
              icon={Mic}
              className="flex-1 h-10 px-4"
              textClassName="text-sm"
            />
          </View>
        </View>

        {/* 3 Good Things Section */}
        <View className="p-6 gap-3">
          <Body className="text-[#2c2926]">3 Good Things Today</Body>
          <View className="gap-4">
            {[
              { num: 1, val: gratitude1, setVal: setGratitude1 },
              { num: 2, val: gratitude2, setVal: setGratitude2 },
              { num: 3, val: gratitude3, setVal: setGratitude3 },
            ].map((item, index) => (
              <View key={index} className="flex-row gap-2 items-center">
                <Body className="w-[20px] text-base">{item.num}.</Body>
                <InputField 
                  containerClassName="flex-1"
                  placeholder="Something you're grateful for..."
                  value={item.val}
                  onChangeText={item.setVal}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
