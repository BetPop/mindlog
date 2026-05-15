import React from 'react';
import { View, ScrollView } from 'react-native';
import { ChevronLeft, ShieldCheck } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import { Body, Heading, Subheading } from '../components/Typography';
import { useTheme } from '../context/ThemeContext';

export default function PrivacyScreen() {
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
        <Heading style={{ color: colors.text }}>Privacy</Heading>
      </View>

      <ScrollView className="px-6 py-8" contentContainerStyle={{ gap: 24 }}>
        <View className="items-center py-4">
           <ShieldCheck size={64} color={colors.text} />
        </View>

        <View className="gap-4">
          <Subheading style={{ color: colors.text }}>Your Data is Private</Subheading>
          <Body style={{ color: colors.subtext }}>
            At MindLog, we believe your thoughts and feelings are yours alone. All your journal entries are stored locally on your device and are never uploaded to our servers without your explicit permission.
          </Body>
        </View>

        <View className="gap-4">
          <Subheading style={{ color: colors.text }}>Data Sharing</Subheading>
          <Body style={{ color: colors.subtext }}>
            We do not sell or share your personal data with third parties. Anonymous usage statistics may be collected to help us improve the app experience, but this never includes your journal content.
          </Body>
        </View>

        <View className="gap-4">
          <Subheading style={{ color: colors.text }}>Local Encryption</Subheading>
          <Body style={{ color: colors.subtext }}>
            You can enable PIN or Biometric lock in the Profile settings to ensure that even if someone has access to your phone, your mind remains private.
          </Body>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
