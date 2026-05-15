import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Calendar, BarChart2, User as UserIcon } from 'lucide-react-native';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import { SCREENS } from '../constants/screens';
import { useTheme } from '../context/ThemeContext';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import InsightsScreen from '../screens/InsightsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const AnimatedTabIcon = ({ focused, icon: Icon, color }) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(focused ? 1.2 : 1, {
      damping: 10,
      stiffness: 100,
    });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Icon color={color} size={24} />
    </Animated.View>
  );
};

export default function TabNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        animation: 'fade',
        tabBarIcon: ({ color, focused }) => {
          let icon;
          if (route.name === SCREENS.HOME) icon = Home;
          if (route.name === SCREENS.CALENDAR) icon = Calendar;
          if (route.name === SCREENS.INSIGHTS) icon = BarChart2;
          if (route.name === SCREENS.PROFILE) icon = UserIcon;
          
          return <AnimatedTabIcon focused={focused} icon={icon} color={color} />;
        },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.subtext,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 86,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontFamily: 'PlusJakartaSans',
          fontSize: 12,
        }
      })}
    >
      <Tab.Screen name={SCREENS.HOME} component={HomeScreen} />
      <Tab.Screen name={SCREENS.CALENDAR} component={CalendarScreen} />
      <Tab.Screen name={SCREENS.INSIGHTS} component={InsightsScreen} />
      <Tab.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
}
