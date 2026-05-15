import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { ChevronLeft, Lock } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { Body, Heading } from '../components/Typography';
import { useTheme } from '../context/ThemeContext';

export default function ChangePasswordScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
        <Heading style={{ color: colors.text }}>Change Password</Heading>
      </View>

      <ScrollView className="px-6 py-8" contentContainerStyle={{ gap: 24 }}>
        <View className="gap-6">
          <View className="gap-2">
            <Body style={{ color: colors.text }}>Current Password</Body>
            <InputField 
              placeholder="Enter current password"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
          </View>

          <View className="gap-2">
            <Body style={{ color: colors.text }}>New Password</Body>
            <InputField 
              placeholder="Enter new password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </View>

          <View className="gap-2">
            <Body style={{ color: colors.text }}>Confirm New Password</Body>
            <InputField 
              placeholder="Confirm new password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
        </View>

        <Button 
          title="Update Password"
          icon={Lock}
          onPress={() => navigation.goBack()}
          className="mt-4"
        />
      </ScrollView>
    </ScreenContainer>
  );
}
