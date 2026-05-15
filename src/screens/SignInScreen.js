import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Apple, Lock } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { Heading, Body, Caption } from '../components/Typography';
import { SCREENS } from '../constants/screens';

export default function SignInScreen() {
  const navigation = useNavigation();

  return (
    <ScreenContainer contentContainerStyle={{ flexGrow: 1 }}>
      {/* Header Section */}
      <View className="pt-16 pb-8 items-center gap-5">
        <View className="w-16 h-16 bg-[#2c2926] rounded-lg justify-center items-center">
          <Lock color="white" size={24} />
        </View>
        <View className="items-center">
          <Heading className="text-center">Welcome to MindLog</Heading>
        </View>
        <View className="items-center">
          <Body className="text-center">Sign in to continue your journey</Body>
        </View>
      </View>

      {/* Form Section */}
      <View className="pb-8 items-start gap-8">
        <Button 
          title="Continue with Apple"
          icon={Apple}
          className="w-full"
          onPress={() => {}}
        />

        <View className="w-full flex-row justify-center items-center">
          <View className="flex-1 h-[1px] bg-gray-300" />
          <View className="px-4">
            <Text className="text-[#cbc5bf] text-base font-normal font-primary leading-6">or</Text>
          </View>
          <View className="flex-1 h-[1px] bg-gray-300" />
        </View>

        <InputField 
          label="Email Address"
          placeholder="you@example.com"
          keyboardType="email-address"
        />

        <InputField 
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
        />

        <View className="w-full items-end">
          <TouchableOpacity>
            <Body className="text-right text-[#2c2926]">Forgot Password?</Body>
          </TouchableOpacity>
        </View>

        <Button 
          title="Continue"
          className="w-full"
          onPress={() => navigation.navigate(SCREENS.SETUP)}
        />

        <View className="w-full items-center">
          <Text className="text-center">
            <Body>Don't have an account? </Body>
            <Body className="text-[#2c2926] underline">Sign up.</Body>
          </Text>
        </View>
      </View>

      {/* Footer Section */}
      <View className="pb-10 items-center mt-auto">
        <Caption className="text-center">By continuing, you agree to our</Caption>
        <TouchableOpacity>
          <Caption className="text-center text-[#2c2926] underline">
            Terms of Service and Privacy Policy
          </Caption>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
