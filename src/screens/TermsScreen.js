import React from 'react';
import { View, ScrollView } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import { Body, Heading, Subheading } from '../components/Typography';
import { useTheme } from '../context/ThemeContext';

export default function TermsScreen() {
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
        <Heading style={{ color: colors.text }}>Terms of Service</Heading>
      </View>

      <ScrollView className="px-6 py-8" contentContainerStyle={{ gap: 24 }}>
        <View className="gap-2">
          <Subheading style={{ color: colors.text }}>1. Acceptance of Terms</Subheading>
          <Body style={{ color: colors.subtext }}>
            By using MindLog, you agree to these terms. If you do not agree, please do not use the app.
          </Body>
        </View>

        <View className="gap-2">
          <Subheading style={{ color: colors.text }}>2. Privacy</Subheading>
          <Body style={{ color: colors.subtext }}>
            Your privacy is important to us. Please review our Privacy Policy for more details on how we handle your data.
          </Body>
        </View>

        <View className="gap-2">
          <Subheading style={{ color: colors.text }}>3. User Conduct</Subheading>
          <Body style={{ color: colors.subtext }}>
            You are responsible for all activity that occurs under your account. You agree not to use the app for any illegal or unauthorized purpose.
          </Body>
        </View>

        <View className="gap-2">
          <Subheading style={{ color: colors.text }}>4. Disclaimer</Subheading>
          <Body style={{ color: colors.subtext }}>
            The app is provided "as is" without any warranties. We are not responsible for any data loss or other issues.
          </Body>
        </View>

        <View className="gap-2">
          <Subheading style={{ color: colors.text }}>5. Changes to Terms</Subheading>
          <Body style={{ color: colors.subtext }}>
            We may update these terms from time to time. Your continued use of the app after such changes constitutes your acceptance of the new terms.
          </Body>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
