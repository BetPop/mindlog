import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS } from '../constants/screens';

// Import screens
import SignInScreen from '../screens/SignInScreen';
import SetupScreen from '../screens/SetupScreen';
import NewEntryScreen from '../screens/NewEntryScreen';
import EntryDetailScreen from '../screens/EntryDetailScreen';
import EntryDetailEditScreen from '../screens/EntryDetailEditScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import PrivacyScreen from '../screens/PrivacyScreen';
import LanguageScreen from '../screens/LanguageScreen';
import HelpScreen from '../screens/HelpScreen';
import TermsScreen from '../screens/TermsScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import AboutAppScreen from '../screens/AboutAppScreen';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

/**
 * RootNavigator manages the top-level stack of the application.
 * It includes Auth screens, Setup, and the primary application content (via Tabs).
 */
export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.SIGN_IN} component={SignInScreen} />
      <Stack.Screen name={SCREENS.SETUP} component={SetupScreen} />
      
      {/* The main app content is now directly using the Tab Navigator */}
      <Stack.Screen name={SCREENS.DRAWER_ROOT} component={TabNavigator} />
      
      {/* Modals or linear flows that should appear over the main navigation */}
      <Stack.Screen name={SCREENS.NEW_ENTRY} component={NewEntryScreen} />
      <Stack.Screen name={SCREENS.ENTRY_DETAIL} component={EntryDetailScreen} />
      <Stack.Screen name={SCREENS.ENTRY_DETAIL_EDIT} component={EntryDetailEditScreen} />
      
      {/* Settings & About Screens */}
      <Stack.Screen name={SCREENS.CHANGE_PASSWORD} component={ChangePasswordScreen} />
      <Stack.Screen name={SCREENS.PRIVACY} component={PrivacyScreen} />
      <Stack.Screen name={SCREENS.LANGUAGE} component={LanguageScreen} />
      <Stack.Screen name={SCREENS.HELP} component={HelpScreen} />
      <Stack.Screen name={SCREENS.TERMS} component={TermsScreen} />
      <Stack.Screen name={SCREENS.PRIVACY_POLICY} component={PrivacyPolicyScreen} />
      <Stack.Screen name={SCREENS.ABOUT_APP} component={AboutAppScreen} />
    </Stack.Navigator>
  );
}
