import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, TextInput, Text } from 'react-native';
import { ImageIcon, Mic, X, Plus, Trash2 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import InputField from '../components/InputField';
import Card from '../components/Card';
import { Body, Subheading, Caption } from '../components/Typography';

export default function EntryDetailEditScreen() {
  const navigation = useNavigation();
  const [selectedMood, setSelectedMood] = useState(1);
  const [entryText, setEntryText] = useState("Today was surprisingly productive. I woke up early and managed to get my morning run in before the day got too hectic. The fresh air really helped clear my mind and set a positive tone for the rest of the day. Work was challenging");
  const [gratitude1, setGratitude1] = useState('');
  const [gratitude2, setGratitude2] = useState('');
  const [gratitude3, setGratitude3] = useState('');
  const [tags, setTags] = useState(['Work', 'Friends', 'Productivity', 'Exercise']);
  const [newTag, setNewTag] = useState('');

  const moods = ['😊', '😌', '😔', '😰', '😡', '😴'];

  const handleSave = () => {
    navigation.goBack();
  };

  const removeTag = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const addTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  return (
    <ScreenContainer padding={false} scrollable={false}>
      {/* Header */}
      <View className="px-6 pt-6 pb-4 border-b border-[#e0dddb] flex-row justify-between items-center">
        <Button 
          title="Cancel"
          variant="ghost"
          className="h-10 px-4"
          textClassName="text-sm"
          onPress={() => navigation.goBack()}
        />
        <Subheading>Edit Entry</Subheading>
        <Button 
          title="Save"
          className="h-10 px-4"
          textClassName="text-sm"
          onPress={handleSave}
        />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        {/* Date & Time Section */}
        <View className="px-6 pt-6 pb-4 border-b border-neutral-200">
           <Caption>Date & Time</Caption>
           <Body className="text-[#2c2926]">Tuesday, April 15, 2025 • 9:42 PM</Body>
        </View>

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
        <View className="px-6 pb-6 border-b border-neutral-200 gap-3">
          <Caption>Journal Entry</Caption>
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
        </View>

        {/* Media Section */}
        <View className="p-6 border-b border-neutral-200 gap-4">
          <Body className="text-[#2c2926]">Media</Body>
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
          <Card className="flex-row items-center gap-3">
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

        {/* Tags Section */}
        <View className="p-6 border-b border-neutral-200 gap-4">
          <Body className="text-[#2c2926]">Tags</Body>
          <View className="flex-row flex-wrap gap-2">
            {tags.map((tag, index) => (
              <View key={index} className="px-3 py-1.5 bg-[#f1f0ee] rounded-lg border border-[#e0dddb] flex-row items-center gap-2">
                <Caption className="text-[#2c2926]">{tag}</Caption>
                <TouchableOpacity onPress={() => removeTag(index)}>
                  <X color="#2c2926" size={14} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View className="flex-row gap-2">
            <InputField 
              containerClassName="flex-1"
              placeholder="Type something"
              value={newTag}
              onChangeText={setNewTag}
            />
            <Button 
              icon={Plus}
              className="w-12 h-12 px-0"
              onPress={addTag}
            />
          </View>
        </View>

        {/* 3 Good Things Section */}
        <View className="p-6 border-b border-neutral-200 gap-3">
          <Body className="text-[#2c2926]">3 Good Things Today</Body>
          <View className="gap-4">
            {[
              { num: 1, val: gratitude1, setVal: setGratitude1 },
              { num: 2, val: gratitude2, setVal: setGratitude2 },
              { num: 3, val: gratitude3, setVal: setGratitude3 },
            ].map((item, index) => (
              <View key={index} className="flex-row gap-2 items-center">
                <Body className="w-[20px]">{item.num}.</Body>
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

        {/* Delete Button */}
        <View className="px-6 pt-6 pb-10">
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
