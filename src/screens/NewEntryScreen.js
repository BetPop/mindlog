import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, TextInput, Text, Image } from 'react-native';
import { ChevronLeft, Image as ImageIcon, Mic, Square, Trash2 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import { addEntry } from '../store/slices/entriesSlice';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { Body, Subheading, Caption } from '../components/Typography';

export default function NewEntryScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedMood, setSelectedMood] = useState(1);
  const [entryText, setEntryText] = useState('');
  const [gratitude1, setGratitude1] = useState('');
  const [gratitude2, setGratitude2] = useState('');
  const [gratitude3, setGratitude3] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [recording, setRecording] = useState();
  const [audioUri, setAudioUri] = useState(null);

  const moods = ['😊', '😌', '😔', '😰', '😡', '😴'];

  const handleSave = () => {
    const date = new Date();
    
    dispatch(addEntry({
      title: entryText ? (entryText.substring(0, 30) + (entryText.length > 30 ? '...' : '')) : 'New Journal Entry',
      body: entryText,
      date: date.toISOString().split('T')[0],
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mood: moods[selectedMood],
      emoji: moods[selectedMood],
      text: entryText,
      tags: [],
      imageUri,
      audioUri
    }));

    navigation.goBack();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setAudioUri(uri);
  };

  const toggleRecording = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
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
              onPress={pickImage}
            />
            <Button 
              title={recording ? "Stop" : "Audio"}
              variant={recording ? "primary" : "secondary"}
              icon={recording ? Square : Mic}
              className="flex-1 h-10 px-4"
              textClassName="text-sm"
              onPress={toggleRecording}
            />
          </View>
          
          {/* Media Previews */}
          {(imageUri || audioUri) && (
            <View className="mt-2 flex-row gap-2">
              {imageUri && (
                <View className="relative w-24 h-24 rounded-lg overflow-hidden border border-[#cbc5bf]">
                  <Image source={{ uri: imageUri }} className="w-full h-full" />
                  <TouchableOpacity 
                    className="absolute top-1 right-1 bg-[#2c2926] rounded-full p-1 opacity-80"
                    onPress={() => setImageUri(null)}
                  >
                    <Trash2 size={12} color="#fff" />
                  </TouchableOpacity>
                </View>
              )}
              {audioUri && (
                <View className="h-24 w-40 rounded-lg border border-[#cbc5bf] bg-[#fcfbfa] justify-center items-center">
                  <Mic size={24} color="#2c2926" />
                  <Caption className="mt-2">Audio Recorded</Caption>
                  <TouchableOpacity 
                    className="absolute top-1 right-1 bg-[#2c2926] rounded-full p-1 opacity-80"
                    onPress={() => setAudioUri(null)}
                  >
                    <Trash2 size={12} color="#fff" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
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
