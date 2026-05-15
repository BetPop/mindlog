import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Settings, HelpCircle, Layout } from 'lucide-react-native';
import TabNavigator from './TabNavigator';
import { SCREENS } from '../constants/screens';
import { View } from 'react-native';
import { Body, Subheading } from '../components/Typography';
import ScreenContainer from '../components/ScreenContainer';
import AppHeader from '../components/AppHeader';

const Drawer = createDrawerNavigator();

/**
 * Mock screens for Drawer content.
 * Demonstrates additional navigation types as per requirements.
 */
function SupportScreen() {
  return (
    <ScreenContainer>
      <AppHeader title="Support" />
      <View className="py-10 items-center">
        <HelpCircle size={48} color="#2c2926" />
        <Subheading className="mt-4">How can we help?</Subheading>
        <Body className="text-center mt-2 px-6">
          Our support team is available 24/7 to assist you with any questions.
        </Body>
      </View>
    </ScreenContainer>
  );
}

function SettingsScreen() {
  return (
    <ScreenContainer>
      <AppHeader title="Settings" />
      <View className="py-10 items-center">
        <Settings size={48} color="#2c2926" />
        <Subheading className="mt-4">App Settings</Subheading>
        <Body className="text-center mt-2 px-6">
          Manage your notifications, privacy, and account preferences here.
        </Body>
      </View>
    </ScreenContainer>
  );
}

/**
 * DrawerNavigator wraps the TabNavigator and adds secondary screens.
 * Provides a slide-out menu as required by the assignment.
 */
export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#2c2926',
        drawerInactiveTintColor: '#6d665e',
        drawerLabelStyle: {
          fontFamily: 'PlusJakartaSans',
          fontSize: 14,
        },
        drawerStyle: {
          backgroundColor: '#fcfbfa',
          width: 280,
        },
      }}
    >
      <Drawer.Screen 
        name={SCREENS.MAIN_TABS} 
        component={TabNavigator} 
        options={{ 
          drawerLabel: 'Main App',
          drawerIcon: ({ color }) => <Layout color={color} size={22} />
        }}
      />
      <Drawer.Screen 
        name={SCREENS.SETTINGS} 
        component={SettingsScreen} 
        options={{ 
          drawerIcon: ({ color }) => <Settings color={color} size={22} />
        }}
      />
      <Drawer.Screen 
        name={SCREENS.SUPPORT} 
        component={SupportScreen} 
        options={{ 
          drawerIcon: ({ color }) => <HelpCircle color={color} size={22} />
        }}
      />
    </Drawer.Navigator>
  );
}
