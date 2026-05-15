import React from 'react';
import { View, ScrollView } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import { Body, Heading, Subheading } from '../components/Typography';
import { useTheme } from '../context/ThemeContext';

export default function PrivacyPolicyScreen() {
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
        <Heading style={{ color: colors.text }}>Privacy Policy</Heading>
      </View>

      <ScrollView className="px-6 py-8" contentContainerStyle={{ gap: 24 }}>
        <View className="gap-2">
          <Subheading style={{ color: colors.text }}>Data Collection</Subheading>
          <Body style={{ color: colors.subtext }}>
            MindLog stores all your journal entries and personal data locally on your device. We do not collect or store your personal information on our servers.
          </Body>
        </View>

        <View className="gap-2">
          <Subheading style={{ color: colors.text }}>Security</Subheading>
          <Body style={{ color: colors.subtext }}>
            We take reasonable measures to protect your data. However, you are responsible for maintaining the security of your device and any PIN or biometrics used to lock the app.
          </Body>
        </View>

        <View className="gap-2">
          <Subheading style={{ color: colors.text }}>Third-Party Services</Subheading>
          <Body style={{ color: colors.subtext }}>
            We may use third-party analytics tools to improve the app, but these tools do not have access to your journal entries or personal data.
          </Body>
        </View>

        <View className="gap-2">
          <Subheading style={{ color: colors.text }}>Changes to Policy</Subheading>
          <Body style={{ color: colors.subtext }}>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </Body>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
