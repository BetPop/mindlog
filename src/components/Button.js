import React, { useCallback } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';

const Button = React.memo(({ 
  onPress, 
  title, 
  variant = 'primary', 
  icon: Icon, 
  className = '', 
  textClassName = '',
  disabled = false,
  style = {},
  ...props 
}) => {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96);
  }, []);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1);
  }, []);

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 };
      case 'outline':
        return { backgroundColor: 'transparent', borderColor: colors.text, borderWidth: 1 };
      case 'ghost':
        return { backgroundColor: 'transparent' };
      case 'primary':
      default:
        return { backgroundColor: colors.text };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'secondary':
      case 'outline':
      case 'ghost':
        return colors.text;
      case 'primary':
      default:
        return colors.background;
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'secondary':
      case 'outline':
      case 'ghost':
        return colors.text;
      case 'primary':
      default:
        return colors.background;
    }
  };

  return (
    <TouchableOpacity 
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={0.8}
      className={`h-12 px-6 rounded-lg flex-row justify-center items-center gap-2 ${disabled ? 'opacity-50' : ''} ${className}`}
      style={[getVariantStyles(), style]}
      {...props}
    >
      <Animated.View style={[animatedStyle, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }]}>
        {Icon && <Icon color={getIconColor()} size={20} />}
        {title && (
          <Text 
            className={`text-center text-base font-medium font-primary leading-6 ${textClassName}`}
            style={{ color: getTextColor() }}
          >
            {title}
          </Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
});

export default Button;
