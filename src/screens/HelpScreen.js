import React from 'react';
import { View, ScrollView } from 'react-native';
import { ChevronLeft, HelpCircle, MessageCircle, Mail } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import Card from '../components/Card';
import { Body, Heading, Subheading } from '../components/Typography';
import { useTheme } from '../context/ThemeContext';

export default function HelpScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const faqs = [
    { q: "How do I create a new entry?", a: "Tap the '+' button on the Home or Calendar screen to start a new journal entry." },
    { q: "Can I edit an old entry?", a: "Yes, find the entry in the Calendar or Recent list, tap it to view details, and then tap the 'Edit' icon." },
    { q: "Is my data backed up?", a: "Currently, MindLog stores data locally on your device. We recommend making regular phone backups to ensure your data is safe." },
    { q: "How do I change the theme?", a: "Go to your Profile screen and toggle the 'Dark Mode' switch." }
  ];

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
        <Heading style={{ color: colors.text }}>Help & Support</Heading>
      </View>

      <ScrollView className="px-6 py-8" contentContainerStyle={{ gap: 32 }}>
        <View className="gap-4">
          <Subheading style={{ color: colors.text }}>Contact Us</Subheading>
          <View className="flex-row gap-3">
             <Card className="flex-1 items-center gap-2" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
                <Mail size={24} color={colors.text} />
                <Body style={{ color: colors.text }}>Email</Body>
             </Card>
             <Card className="flex-1 items-center gap-2" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
                <MessageCircle size={24} color={colors.text} />
                <Body style={{ color: colors.text }}>Chat</Body>
             </Card>
          </View>
        </View>

        <View className="gap-6">
          <Subheading style={{ color: colors.text }}>Common Questions</Subheading>
          <View className="gap-4">
            {faqs.map((faq, i) => (
              <View key={i} className="gap-2">
                <Body style={{ color: colors.text, fontWeight: '600' }}>{faq.q}</Body>
                <Body style={{ color: colors.subtext }}>{faq.a}</Body>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
