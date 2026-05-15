import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export const Heading = React.memo(({ children, className = '', style = {}, ...props }) => {
  const { colors } = useTheme();
  return (
    <Text 
      className={`text-2xl font-normal font-primary leading-8 ${className}`} 
      style={[{ color: colors.text }, style]}
      {...props}
    >
      {children}
    </Text>
  );
});

export const Subheading = React.memo(({ children, className = '', style = {}, ...props }) => {
  const { colors } = useTheme();
  return (
    <Text 
      className={`text-base font-normal font-primary leading-6 ${className}`} 
      style={[{ color: colors.text }, style]}
      {...props}
    >
      {children}
    </Text>
  );
});

export const Body = React.memo(({ children, className = '', style = {}, ...props }) => {
  const { colors } = useTheme();
  return (
    <Text 
      className={`text-sm font-normal font-primary leading-5 ${className}`} 
      style={[{ color: colors.subtext }, style]}
      {...props}
    >
      {children}
    </Text>
  );
});

export const Caption = React.memo(({ children, className = '', style = {}, ...props }) => {
  const { colors } = useTheme();
  return (
    <Text 
      className={`text-xs font-normal font-primary leading-[18px] ${className}`} 
      style={[{ color: colors.subtext }, style]}
      {...props}
    >
      {children}
    </Text>
  );
});

export const Label = React.memo(({ children, className = '', style = {}, ...props }) => {
  const { colors } = useTheme();
  return (
    <Text 
      className={`text-sm font-normal font-primary leading-5 mb-1 ${className}`} 
      style={[{ color: colors.text }, style]}
      {...props}
    >
      {children}
    </Text>
  );
});
