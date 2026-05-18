import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, TextInput, Text, Image, Alert } from 'react-native';
import { ImageIcon, Mic, X, Plus, Trash2, Square } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { Body, Subheading, Caption } from '../components/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { updateEntry, removeEntry } from '../store/slices/entriesSlice';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import AudioPlayer from '../components/AudioPlayer';

export default function EntryDetailEditScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const entryId = route.params?.id;

  const existingEntry = useSelector(state => 
    state.entries.list.find(e => e.id === entryId)
  );

  const [selectedMood, setSelectedMood] = useState(1);
  const [entryText, setEntryText] = useState("");
  const [gratitude1, setGratitude1] = useState('');
  const [gratitude2, setGratitude2] = useState('');
  const [gratitude3, setGratitude3] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  
  const [imageUri, setImageUri] = useState(null);
  const [audioUri, setAudioUri] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);

  const moods = ['😊', '😌', '😔', '😰', '😡', '😴'];

  useEffect(() => {
    if (existingEntry) {
      setSelectedMood(existingEntry.mood ?? 1);
      setEntryText(existingEntry.body || existingEntry.text || "");
      if (existingEntry.gratitude && Array.isArray(existingEntry.gratitude)) {
        setGratitude1(existingEntry.gratitude[0] || '');
        setGratitude2(existingEntry.gratitude[1] || '');
        setGratitude3(existingEntry.gratitude[2] || '');
      }
      setTags(existingEntry.tags || []);
      setImageUri(existingEntry.imageUri || null);
      setAudioUri(existingEntry.audioUri || null);
    }
  }, [existingEntry]);

  const handleSave = () => {
    if (!existingEntry) return;

    const updatedEntry = {
      ...existingEntry,
      mood: selectedMood,
      body: entryText.trim(),
      gratitude: [gratitude1.trim(), gratitude2.trim(), gratitude3.trim()].filter(g => g !== ''),
      tags: tags,
      imageUri,
      audioUri
    };

    dispatch(updateEntry(updatedEntry));
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Entry",
      "Are you sure you want to delete this journal entry?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => {
            dispatch(removeEntry(entryId));
            // Go back twice (from edit screen, and then from detail screen)
            navigation.pop(2);
          }
        }
      ]
    );
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      setIsRecording(false);
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setAudioUri(uri);
        setRecording(null);
      }
    } else {
      try {
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording: newRecording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(newRecording);
        setIsRecording(true);
      } catch (err) {
        console.error('Failed to start recording', err);
      }
    }
  };

  if (!existingEntry) {
    return (
      <ScreenContainer padding={true} scrollable={false}>
        <Body>Entry not found.</Body>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </ScreenContainer>
    );
  }

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
           <Body className="text-[#2c2926]">
             {existingEntry.date || "Unknown Date"} • {existingEntry.time || "Unknown Time"}
           </Body>
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
          
          {(imageUri || audioUri) && (
            <View className="gap-3">
              {imageUri && (
                <View className="w-full h-32 rounded-lg overflow-hidden relative">
                  <Image source={{ uri: imageUri }} className="w-full h-full" resizeMode="cover" />
                  <TouchableOpacity 
                    className="absolute top-2 right-2 bg-[#2c2926] p-1.5 rounded-full"
                    onPress={() => setImageUri(null)}
                  >
                    <X color="white" size={16} />
                  </TouchableOpacity>
                </View>
              )}
              {audioUri && (
                <View className="relative mt-2">
                  <AudioPlayer uri={audioUri} />
                  <TouchableOpacity 
                    className="absolute top-2 right-2 bg-[#2c2926] p-1.5 rounded-full z-10"
                    onPress={() => setAudioUri(null)}
                  >
                    <X color="white" size={16} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}

          <View className="flex-row gap-2 mt-2">
            <Button 
              title="Image"
              variant="secondary"
              icon={ImageIcon}
              className="flex-1 h-10 px-4"
              textClassName="text-sm"
              onPress={pickImage}
            />
            <Button 
              title={isRecording ? "Stop" : "Audio"}
              variant={isRecording ? "primary" : "secondary"}
              icon={isRecording ? Square : Mic}
              className="flex-1 h-10 px-4"
              textClassName="text-sm"
              onPress={toggleRecording}
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
            onPress={handleDelete}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
