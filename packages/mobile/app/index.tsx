import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(0.98)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/marketing');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.brandBlock,
          {
            opacity: opacityAnim,
            transform: [
              { scale: scaleAnim },
              {
                translateY: opacityAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [10, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.logoCircle}>
          <Image source={require('../assets/logo.png')} style={styles.logoImg} resizeMode="contain" />
        </View>
        <Text style={styles.title}>Telehealings</Text>
        <Text style={styles.subtitle}>Continuity-First Wellness Care Platform</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#387bd5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandBlock: {
    alignItems: 'center',
    marginTop: -60,
  },
  logoCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 40,
    elevation: 8,
  },
  logoImg: {
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
    color: '#e2effb',
    letterSpacing: 0.6,
    opacity: 0.85,
  },
});
