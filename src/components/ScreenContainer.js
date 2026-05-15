import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScreenContainer = ({ 
  children, 
  scrollable = true, 
  padding = true, 
  backgroundColor = '#f7f5f4',
  contentContainerStyle = {},
  ...props 
}) => {
  const content = (
    <View 
      className={`flex-1 ${padding ? 'px-6' : ''}`}
      style={contentContainerStyle}
    >
      {children}
    </View>
  );

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {scrollable ? (
          <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}
            {...props}
          >
            {content}
          </ScrollView>
        ) : (
          content
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ScreenContainer;
