import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { navigate } from '../navigation';

const LOGO_SIZE = 130;
const AUTO_ADVANCE_MS = 3000;
const FADE_OUT_MS = 600;

export default function SplashScreen() {
  const brandAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(brandAnim, { toValue: 1, duration: 1200, useNativeDriver: true }).start();
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0, duration: FADE_OUT_MS, useNativeDriver: true,
      }).start(() => {
        navigate('/marketing');
      });
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
        <Animated.View style={[styles.brandBlock, {
          opacity: brandAnim,
          transform: [
            { scale: brandAnim.interpolate({ inputRange: [0, 1], outputRange: [0.98, 1] }) },
            { translateY: brandAnim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) },
          ],
        }]}>
          <View style={styles.logoCircle}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>Telehealings</Text>
          <Text style={styles.subtitle}>Continuity-First Wellness Care Platform</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#387bd5' },
  splashContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  brandBlock: { alignItems: 'center' },
  logoCircle: { backgroundColor: '#ffffff', width: LOGO_SIZE, height: LOGO_SIZE, borderRadius: LOGO_SIZE / 2, alignItems: 'center', justifyContent: 'center', marginBottom: 25, marginTop: -60, shadowColor: '#000', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.1, shadowRadius: 40, elevation: 10 },
  logoImage: { width: 100, height: 100 },
  title: { fontSize: 36, fontWeight: '600', color: '#ffffff', marginBottom: 12, letterSpacing: 0.36 },
  subtitle: { fontSize: 12, fontWeight: '500', color: '#E2EFFB', opacity: 0.85, letterSpacing: 0.72 },
});
