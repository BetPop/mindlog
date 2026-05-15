import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import "./global.css";
import { useFonts, PlusJakartaSans_400Regular, PlusJakartaSans_500Medium, PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold } from '@expo-google-fonts/plus-jakarta-sans';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';

// Global Store and Context
import { store } from './src/store';
import { ThemeProvider } from './src/context/ThemeContext';

// Import the new modular RootNavigator
import RootNavigator from './src/navigation/RootNavigator';

/**
 * Main App Component
 * 
 * This file serves as the entry point of the application.
 * Satisfies Assignment 6 requirements for Redux and Context integration.
 */
export default function App() {
  // Load custom fonts (Plus Jakarta Sans)
  let [fontsLoaded] = useFonts({
    PlusJakartaSans: PlusJakartaSans_400Regular,
    PlusJakartaSansMedium: PlusJakartaSans_500Medium,
    PlusJakartaSansSemiBold: PlusJakartaSans_600SemiBold,
    PlusJakartaSansBold: PlusJakartaSans_700Bold,
  });

  // Show loading indicator while fonts are being fetched
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fcfbfa' }}>
        <ActivityIndicator size="large" color="#2c2926" />
        <Text style={{ marginTop: 10, fontFamily: 'System' }}>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <ThemeProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <NavigationContainer>
              {/* 
                RootNavigator contains the entire navigation tree:
                Auth Flow -> Setup -> Drawer (which contains Tabs)
              */}
              <RootNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </Provider>
  );
}
