import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronLeft, Check } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import Card from '../components/Card';
import { Body, Heading } from '../components/Typography';
import { useTheme } from '../context/ThemeContext';
import { setLanguage } from '../store/slices/settingsSlice';

const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'ua', name: 'Ukrainian', native: 'Українська' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'de', name: 'German', native: 'Deutsch' },
];

export default function LanguageScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { colors } = useTheme();
  
  const selectedLanguage = useSelector(state => state.settings.language);

  const handleSelectLanguage = (lang) => {
    dispatch(setLanguage(lang));
  };

  return (
    <ScreenContainer padding={false} scrollable={false} backgroundColor={colors.background}>
      {/* Header */}
      <View className="px-6 pt-6 pb-4 border-b flex-row items-center gap-4" style={{ borderBottomColor: colors.border }}>
        <Button 
          icon={ChevronLeft}
          variant="ghost"
          className="w-10 h-10 p-0"
          onPress={() => navigation.goBack()}
        />
        <Heading style={{ color: colors.text }}>Language</Heading>
      </View>

      <ScrollView className="px-6 py-8">
        <View className="gap-3">
          {LANGUAGES.map((lang) => (
            <TouchableOpacity 
              key={lang.code}
              onPress={() => handleSelectLanguage(lang)}
            >
              <Card 
                className="flex-row justify-between items-center py-4"
                style={{ 
                  backgroundColor: colors.card, 
                  borderColor: selectedLanguage === lang.code ? colors.text : colors.border 
                }}
              >
                <View className="gap-1">
                  <Body style={{ color: colors.text, fontWeight: '500' }}>{lang.name}</Body>
                  <Body style={{ color: colors.subtext, fontSize: 12 }}>{lang.native}</Body>
                </View>
                {selectedLanguage === lang.code && <Check size={20} color={colors.text} />}
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
