import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { navigate } from '../navigation';
import { LinearGradient } from 'expo-linear-gradient';

const LOGO_SIZE = 130;
const AUTO_ADVANCE_MS = 3000;
const FADE_OUT_MS = 600;

export default function SplashScreen() {
  const [exiting, setExiting] = useState(false);

  // Brand fade-in animation
  const brandAnim = useRef(new Animated.Value(0)).current;
  // Opacity for fade-out transition
  const fadeAnim = useRef(new Animated.Value(1)).current;
  // Timer bar width
  const timerAnim = useRef(new Animated.Value(0)).current;

  const navigateAway = () => {
    if (exiting) return;
    setExiting(true);

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: FADE_OUT_MS,
      useNativeDriver: false,
    }).start(() => {
      navigate('/marketing');
    });
  };

  useEffect(() => {
    // Brand fade-in on mount
    Animated.timing(brandAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: false,
    }).start();

    // Timer bar animation (0 → 100% over 3s)
    setTimeout(() => {
      Animated.timing(timerAnim, {
        toValue: 1,
        duration: AUTO_ADVANCE_MS,
        useNativeDriver: false,
      }).start();
    }, 50);

    // Auto-advance after 3 seconds
    const timer = setTimeout(navigateAway, AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, []);

  const brandOpacity = brandAnim;
  const brandTransform = {
    scale: brandAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.98, 1],
    }),
    translateY: brandAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [10, 0],
    }),
  };

  const timerWidth = timerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={navigateAway}
      style={styles.container}
    >
      <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
        {/* Radial gradient background simulated with LinearGradient */}
        <View style={styles.gradientBg}>
          <View style={styles.gradientInner} />
        </View>

        {/* Brand block */}
        <Animated.View
          style={[
            styles.brandBlock,
            {
              opacity: brandOpacity,
              transform: [{ scale: brandTransform.scale }, { translateY: brandTransform.translateY }],
            },
          ]}
        >
          {/* Logo circle */}
          <View style={styles.logoCircle}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>Telehealings</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>Continuity-First Wellness Care Platform</Text>
        </Animated.View>

        {/* Bottom fade gradient */}
        <View style={styles.bottomFade} />

        {/* Skip button */}
        <TouchableOpacity
          style={styles.skipButton}
          onPress={(e) => {
            // @ts-ignore — stopPropagation for RN web
            e?.stopPropagation?.();
            navigateAway();
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.skipText}>Skip →</Text>
        </TouchableOpacity>

        {/* Timer bar */}
        <View style={styles.timerContainer}>
          <Animated.View style={[styles.timerBar, { width: timerWidth }]} />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  gradientBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#387bd4',
  },
  gradientInner: {
    flex: 1,
    backgroundColor: '#5b96ea',
    opacity: 0.5,
    borderRadius: Dimensions.get('window').width,
    transform: [{ scale: 2 }],
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: Dimensions.get('window').width * 2,
    height: Dimensions.get('window').width * 2,
  },
  brandBlock: {
    alignItems: 'center',
    zIndex: 2,
  },
  logoCircle: {
    backgroundColor: '#ffffff',
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: LOGO_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    marginTop: -60,
    // Cross-platform shadow
    boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
    elevation: 10,
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
    letterSpacing: 0.36,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#E2EFFB',
    opacity: 0.85,
    letterSpacing: 0.72,
  },
  bottomFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'rgba(56, 123, 213, 0.3)',
    zIndex: 1,
  },
  skipButton: {
    position: 'absolute',
    bottom: 30,
    right: 24,
    zIndex: 10,
  },
  skipText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  timerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    zIndex: 10,
  },
  timerBar: {
    height: '100%',
    backgroundColor: '#ffffff',
  },
});
