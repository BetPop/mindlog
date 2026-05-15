import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Bell, Lock, Info, Circle, CheckCircle2 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import Card from '../components/Card';
import { Heading, Body, Subheading } from '../components/Typography';
import { SCREENS } from '../constants/screens';

export default function SetupScreen() {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState(false);
  const [privacyLock, setPrivacyLock] = useState(false);

  return (
    <ScreenContainer contentContainerStyle={{ flexGrow: 1 }}>
      {/* Header Section */}
      <View className="pt-16 pb-8 items-center gap-6">
        <View className="w-16 h-16 bg-[#e0dddb] rounded-lg justify-center items-center">
          <Bell color="#2c2926" size={24} />
        </View>
        <View className="px-4">
          <Heading className="text-center">Stay Connected</Heading>
        </View>
        <View className="px-4">
          <Body className="text-center">
            Get reminders for daily entries and {'\n'}insights about your journaling journey
          </Body>
        </View>
      </View>

      {/* Options Section */}
      <View className="pb-8 gap-4">
        <Card 
          onPress={() => setNotifications(!notifications)}
          className={`flex-row items-center justify-between ${notifications ? 'border-[#2c2926]' : 'border-[#cbc5bf]'}`}
        >
          <View className="flex-row items-center gap-4 flex-1">
            <View className="w-12 h-12 bg-[#e0dddb] rounded-lg justify-center items-center">
              <Bell color="#2c2926" size={20} />
            </View>
            <View className="flex-1">
              <Subheading>Enable Notifications</Subheading>
              <Body>Daily reminders and {'\n'}journaling streaks</Body>
            </View>
          </View>
          {notifications ? (
            <CheckCircle2 color="#2c2926" size={24} />
          ) : (
            <Circle color="#cbc5bf" size={24} />
          )}
        </Card>

        <Card 
          onPress={() => setPrivacyLock(!privacyLock)}
          className={`flex-row items-center justify-between ${privacyLock ? 'border-[#2c2926]' : 'border-[#cbc5bf]'}`}
        >
          <View className="flex-row items-center gap-4 flex-1">
            <View className="w-12 h-12 bg-[#e0dddb] rounded-lg justify-center items-center">
              <Lock color="#2c2926" size={20} />
            </View>
            <View className="flex-1">
              <Subheading>Privacy Lock</Subheading>
              <Body>Protect your entries with {'\n'}PIN or Face ID</Body>
            </View>
          </View>
          {privacyLock ? (
            <CheckCircle2 color="#2c2926" size={24} />
          ) : (
            <Circle color="#cbc5bf" size={24} />
          )}
        </Card>

        <View className="p-4 bg-[#f1f0ee] rounded-lg border border-[#cbc5bf] flex-row gap-2 mt-2">
          <Info color="#423d38" size={20} />
          <Body className="flex-1 text-[#423d38]">
            You can change these settings anytime in {'\n'}the app preferences
          </Body>
        </View>
      </View>

      {/* Footer Buttons Section */}
      <View className="pb-10 gap-3 mt-auto">
        <Button 
          title="Finish setup"
          onPress={() => navigation.navigate(SCREENS.DRAWER_ROOT)}
        />
        <Button 
          title="Skip for now"
          variant="ghost"
          onPress={() => navigation.navigate(SCREENS.DRAWER_ROOT)}
        />
      </View>
    </ScreenContainer>
  );
}
