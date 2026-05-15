import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Mail, Lock, Bell, Clock, Fingerprint, Cookie, Globe, Download, HelpCircle, FileText, ShieldAlert, Info, ChevronRight, User, Moon, Sun } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import ScreenContainer from '../components/ScreenContainer';
import AppHeader from '../components/AppHeader';
import Button from '../components/Button';
import Card from '../components/Card';
import { Body, Subheading, Caption } from '../components/Typography';
import { SCREENS } from '../constants/screens';
import { useTheme } from '../context/ThemeContext';
import { toggleSetting } from '../store/slices/settingsSlice';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { theme, toggleTheme, colors } = useTheme();
  const [profile, setProfile] = useState(null);

  // Redux Settings State
  const { pushNotifications, dailyReminders, pinLock, biometrics, languageName } = useSelector(state => state.settings);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(response => response.json())
      .then(data => {
        setProfile(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const SettingsItem = ({ icon: Icon, label, value, onPress, showBorder = true, hasChevron = true, children }) => (
    <TouchableOpacity 
      className={`px-4 py-3.5 flex-row justify-between items-center ${showBorder ? 'border-b' : ''}`}
      style={{ borderBottomColor: colors.border }}
      onPress={onPress}
      disabled={!onPress}
    >
      <View className="flex-row items-center gap-3">
        {Icon && <Icon color={colors.text} size={20} />}
        <Body style={{ color: colors.text }}>{label}</Body>
      </View>
      <View className="flex-row items-center gap-2">
        {value && <Body style={{ color: colors.subtext }}>{value}</Body>}
        {children}
        {hasChevron && <ChevronRight color={colors.border} size={20} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer padding={false} scrollable={false} backgroundColor={colors.background}>
      {/* Header */}
      <View className="px-6">
        <AppHeader title="Profile" />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View className="p-6 items-center gap-4">
          <View 
            className="w-24 h-24 rounded-full border-2 justify-center items-center"
            style={{ borderColor: colors.border, backgroundColor: colors.card }}
          >
            <User color={colors.subtext} size={40} />
          </View>
          <View className="items-center">
            <Subheading className="text-lg" style={{ color: colors.text }}>
              {profile ? profile.name : 'Sarah Mitchell'}
            </Subheading>
            <Body style={{ color: colors.subtext }}>
              {profile ? profile.email : 'sarah.mitchell@email.com'}
            </Body>
          </View>
          <TouchableOpacity>
            <Body style={{ color: colors.text }}>Edit Profile</Body>
          </TouchableOpacity>
        </View>

        {/* Sections */}
        <View className="px-6 gap-6">
          {/* Account */}
          <View className="gap-2">
            <Body className="px-4" style={{ color: colors.subtext }}>Account</Body>
            <Card className="p-0 overflow-hidden" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
              <SettingsItem icon={Mail} label="Email Address" />
              <SettingsItem 
                icon={theme === 'light' ? Moon : Sun} 
                label={theme === 'light' ? "Dark Mode" : "Light Mode"}
                hasChevron={false}
              >
                <Switch 
                  value={theme === 'dark'} 
                  onValueChange={toggleTheme}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor="#fcfbfa"
                />
              </SettingsItem>
              <SettingsItem 
                icon={Lock} 
                label="Change Password" 
                showBorder={false} 
                onPress={() => navigation.navigate(SCREENS.CHANGE_PASSWORD)}
              />
            </Card>
          </View>

          {/* Notifications */}
          <View className="gap-2">
            <Body className="px-4" style={{ color: colors.subtext }}>Notifications</Body>
            <Card className="p-0 overflow-hidden" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
              <SettingsItem 
                icon={Bell} 
                label="Push Notifications" 
                hasChevron={false}
                onPress={() => dispatch(toggleSetting('pushNotifications'))}
              >
                <View 
                  className="w-5 h-5 rounded-full border-2 justify-center items-center" 
                  style={{ borderColor: pushNotifications ? colors.text : colors.border }}
                >
                  {pushNotifications && <View className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors.text }} />}
                </View>
              </SettingsItem>
              <SettingsItem 
                icon={Clock} 
                label="Daily Reminders" 
                showBorder={false} 
                hasChevron={false}
                onPress={() => dispatch(toggleSetting('dailyReminders'))}
              >
                <View 
                  className="w-5 h-5 rounded-full border-2 justify-center items-center" 
                  style={{ borderColor: dailyReminders ? colors.text : colors.border }}
                >
                  {dailyReminders && <View className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors.text }} />}
                </View>
              </SettingsItem>
            </Card>
          </View>

          {/* Privacy & Security */}
          <View className="gap-2">
            <Body className="px-4" style={{ color: colors.subtext }}>Privacy & Security</Body>
            <Card className="p-0 overflow-hidden" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
              <SettingsItem 
                icon={Lock} 
                label="PIN Lock" 
                hasChevron={false}
                onPress={() => dispatch(toggleSetting('pinLock'))}
              >
                <View 
                  className="w-5 h-5 rounded-full border-2 justify-center items-center" 
                  style={{ borderColor: pinLock ? colors.text : colors.border }}
                >
                  {pinLock && <View className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors.text }} />}
                </View>
              </SettingsItem>
              <SettingsItem 
                icon={Fingerprint} 
                label="Face ID / Touch ID" 
                hasChevron={false}
                onPress={() => dispatch(toggleSetting('biometrics'))}
              >
                <View 
                  className="w-5 h-5 rounded-full border-2 justify-center items-center" 
                  style={{ borderColor: biometrics ? colors.text : colors.border }}
                >
                  {biometrics && <View className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors.text }} />}
                </View>
              </SettingsItem>
              <SettingsItem 
                icon={Cookie} 
                label="Manage Privacy" 
                showBorder={false} 
                onPress={() => navigation.navigate(SCREENS.PRIVACY)}
              />
            </Card>
          </View>

          {/* Preferences */}
          <View className="gap-2">
            <Body className="px-4" style={{ color: colors.subtext }}>Preferences</Body>
            <Card className="p-0 overflow-hidden" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
              <SettingsItem 
                icon={Globe} 
                label="Language" 
                value={languageName} 
                showBorder={false} 
                onPress={() => navigation.navigate(SCREENS.LANGUAGE)}
              />
            </Card>
          </View>

          {/* Data */}
          <View className="gap-2">
            <Body className="px-4" style={{ color: colors.subtext }}>Data</Body>
            <Card className="p-0 overflow-hidden" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
              <SettingsItem icon={Download} label="Export Data" showBorder={false} />
            </Card>
          </View>

          {/* About */}
          <View className="gap-2">
            <Body className="px-4" style={{ color: colors.subtext }}>About</Body>
            <Card className="p-0 overflow-hidden" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
              <SettingsItem 
                icon={HelpCircle} 
                label="Help & Support" 
                onPress={() => navigation.navigate(SCREENS.HELP)}
              />
              <SettingsItem 
                icon={FileText} 
                label="Terms of Service" 
                onPress={() => navigation.navigate(SCREENS.TERMS)}
              />
              <SettingsItem 
                icon={ShieldAlert} 
                label="Privacy Policy" 
                onPress={() => navigation.navigate(SCREENS.PRIVACY_POLICY)}
              />
              <SettingsItem 
                icon={Info} 
                label="About MindLog" 
                value="v2.1.0" 
                showBorder={false} 
                onPress={() => navigation.navigate(SCREENS.ABOUT_APP)}
              />
            </Card>
          </View>

          {/* Sign out */}
          <View className="pt-2">
            <Button 
              title="Sign out"
              variant="secondary"
              onPress={() => navigation.navigate(SCREENS.SIGN_IN)}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
