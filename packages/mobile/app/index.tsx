import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image, Dimensions } from 'react-native';
import { navigate } from '../App';

const LOGO_SIZE = 130;
const AUTO_ADVANCE_MS = 3000;
const FADE_OUT_MS = 600;

export default function SplashScreen() {
  const [exiting, setExiting] = useState(false);
  const brandAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const timerAnim = useRef(new Animated.Value(0)).current;

  const navigateAway = () => {
    if (exiting) return;
    setExiting(true);
    Animated.timing(fadeAnim, {
      toValue: 0, duration: FADE_OUT_MS, useNativeDriver: true,
    }).start(() => {
      navigate('/marketing');
    });
  };

  useEffect(() => {
    Animated.timing(brandAnim, { toValue: 1, duration: 1200, useNativeDriver: true }).start();
    setTimeout(() => {
      Animated.timing(timerAnim, { toValue: 1, duration: AUTO_ADVANCE_MS, useNativeDriver: false }).start();
    }, 50);
    const timer = setTimeout(navigateAway, AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TouchableOpacity activeOpacity={1} onPress={navigateAway} style={styles.container}>
      <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
        <View style={styles.gradientBg}>
          <View style={styles.gradientInner} />
        </View>

        <Animated.View style={[styles.brandBlock, {
          opacity: brandAnim,
          transform: [
            { scale: brandAnim.interpolate({ inputRange: [0, 1], outputRange: [0.98, 1] }) },
            { translateY: brandAnim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) },
          ],
        }]}>
          <View style={styles.logoCircle}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>Telehealings</Text>
          <Text style={styles.subtitle}>Continuity-First Wellness Care Platform</Text>
        </Animated.View>

        <View style={styles.bottomFade} />
        <TouchableOpacity style={styles.skipButton} onPress={navigateAway} activeOpacity={0.7}>
          <Text style={styles.skipText}>Skip →</Text>
        </TouchableOpacity>
        <View style={styles.timerContainer}>
          <Animated.View style={[styles.timerBar, { width: timerAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]} />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1 },
  splashContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  gradientBg: { ...StyleSheet.absoluteFillObject, backgroundColor: '#387bd4' },
  gradientInner: { flex: 1, backgroundColor: '#5b96ea', opacity: 0.5, borderRadius: SCREEN_WIDTH, transform: [{ scale: 2 }], position: 'absolute', top: '-50%', left: '-50%', width: SCREEN_WIDTH * 2, height: SCREEN_WIDTH * 2 },
  brandBlock: { alignItems: 'center', zIndex: 2 },
  logoCircle: { backgroundColor: '#ffffff', width: LOGO_SIZE, height: LOGO_SIZE, borderRadius: LOGO_SIZE / 2, alignItems: 'center', justifyContent: 'center', marginBottom: 25, marginTop: -60, shadowColor: '#000', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.1, shadowRadius: 40, elevation: 10 },
  logoImage: { width: 100, height: 100 },
  title: { fontSize: 36, fontWeight: '600', color: '#ffffff', marginBottom: 12, letterSpacing: 0.36 },
  subtitle: { fontSize: 12, fontWeight: '500', color: '#E2EFFB', opacity: 0.85, letterSpacing: 0.72 },
  bottomFade: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, backgroundColor: 'rgba(56, 123, 213, 0.3)', zIndex: 1 },
  skipButton: { position: 'absolute', bottom: 30, right: 24, zIndex: 10 },
  skipText: { fontSize: 13, fontWeight: '600', color: 'rgba(255, 255, 255, 0.7)' },
  timerContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, backgroundColor: 'rgba(255, 255, 255, 0.2)', zIndex: 10 },
  timerBar: { height: '100%', backgroundColor: '#ffffff' },
});
