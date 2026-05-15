const fs = require('fs');
const screens = [
  'SignInScreen',
  'SetupScreen',
  'HomeScreen',
  'CalendarScreen',
  'InsightsScreen',
  'ProfileScreen',
  'NewEntryScreen',
  'EntryDetailScreen',
  'EntryDetailEditScreen'
];

screens.forEach(screen => {
  const content = `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ${screen}() {
  return (
    <View style={styles.container}>
      <Text>${screen}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
`;
  fs.writeFileSync(`./src/screens/${screen}.js`, content);
});
console.log('Screens created');
