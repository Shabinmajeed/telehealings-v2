import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SoftOnboardingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Soft Onboarding</Text>
      <Text style={styles.subtitle}>Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e5ab8',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
  },
});
