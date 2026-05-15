import React from 'react';
import { View, TextInput } from 'react-native';
import { Label } from './Typography';

const InputField = ({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry = false, 
  keyboardType = 'default',
  autoCapitalize = 'none',
  className = '',
  containerClassName = '',
  ...props 
}) => {
  return (
    <View className={`w-full gap-1 ${containerClassName}`}>
      {label && <Label>{label}</Label>}
      <View className="w-full h-12 px-4 bg-[#fcfbfa] rounded-lg border border-[#cbc5bf] justify-center">
        <TextInput 
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#cbc5bf"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          className={`flex-1 text-[#2c2926] text-base font-medium font-primary leading-6 ${className}`}
          {...props}
        />
      </View>
    </View>
  );
};

export default InputField;
