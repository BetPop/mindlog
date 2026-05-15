import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const Card = React.memo(({ children, onPress, className = '', style = {}, ...props }) => {
  const { colors } = useTheme();
  const Container = onPress ? TouchableOpacity : View;
  
  return (
    <Container 
      onPress={onPress}
      activeOpacity={onPress ? 0.8 : 1}
      className={`p-4 rounded-lg border ${className}`}
      style={[{ backgroundColor: colors.card, borderColor: colors.border }, style]}
      {...props}
    >
      {children}
    </Container>
  );
});

export default Card;
