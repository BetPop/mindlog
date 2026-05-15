import React from 'react';
import { View } from 'react-native';
import { Heading, Body } from './Typography';
import { useTheme } from '../context/ThemeContext';

/**
 * AppHeader component for main screens.
 * Menu icon has been removed per user request.
 */
const AppHeader = React.memo(({ title, subtitle, rightComponent }) => {
  const { colors } = useTheme();

  return (
    <View className="pt-6 pb-4 border-b gap-1" style={{ borderBottomColor: colors.border }}>
      <View className="flex-row justify-between items-center">
        <Heading style={{ color: colors.text }}>{title}</Heading>
        {rightComponent}
      </View>
      {subtitle && <Body style={{ color: colors.subtext }}>{subtitle}</Body>}
    </View>
  );
});

export default AppHeader;
