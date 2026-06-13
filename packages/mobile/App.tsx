import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { addRouteListener } from './src/navigation';

// Import screens
import SplashScreen from './src/screens/SplashScreen';
import MarketingScreen from './src/screens/MarketingScreen';
import SoftOnboardingScreen from './src/screens/SoftOnboardingScreen';
import PersonalisationScreen from './src/screens/PersonalisationScreen';

export default function App() {
  const [route, setRoute] = useState('/');

  useEffect(() => {
    const unsubscribe = addRouteListener((newRoute) => {
      setRoute(newRoute);
    });
    return unsubscribe;
  }, []);

  const renderScreen = () => {
    switch (route) {
      case '/':
        return <SplashScreen />;
      case '/marketing':
        return <MarketingScreen />;
      case '/soft-onboarding':
        return <SoftOnboardingScreen />;
      case '/personalisation':
        return <PersonalisationScreen />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
