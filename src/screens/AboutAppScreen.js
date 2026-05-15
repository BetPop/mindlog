import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { ChevronLeft, Github, Globe, Heart } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import { Body, Heading, Subheading, Caption } from '../components/Typography';
import { useTheme } from '../context/ThemeContext';

export default function AboutAppScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();

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
        <Heading style={{ color: colors.text }}>About MindLog</Heading>
      </View>

      <ScrollView className="px-6 py-8" contentContainerStyle={{ gap: 40 }}>
        <View className="items-center gap-4">
          <View className="w-24 h-24 bg-neutral-900 rounded-3xl justify-center items-center shadow-lg">
            <Heart color="white" size={48} />
          </View>
          <View className="items-center">
            <Heading style={{ color: colors.text }}>MindLog</Heading>
            <Caption style={{ color: colors.subtext }}>Version 2.1.0</Caption>
          </View>
        </View>

        <View className="gap-6">
          <View className="gap-2">
            <Subheading style={{ color: colors.text }}>Our Mission</Subheading>
            <Body style={{ color: colors.subtext }}>
              MindLog was created to help people reflect on their daily lives, manage their emotions, and build a lasting habit of gratitude. We believe that small, daily reflections can lead to significant personal growth.
            </Body>
          </View>

          <View className="gap-2">
            <Subheading style={{ color: colors.text }}>Connect With Us</Subheading>
            <View className="flex-row gap-4">
              <Button icon={Github} variant="secondary" className="flex-1" title="GitHub" />
              <Button icon={Globe} variant="secondary" className="flex-1" title="Website" />
            </View>
          </View>

          <View className="items-center pt-8">
            <Caption style={{ color: colors.subtext }}>Made with ❤️ by the MindLog Team</Caption>
            <Caption style={{ color: colors.subtext }}>© 2026 MindLog App</Caption>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
