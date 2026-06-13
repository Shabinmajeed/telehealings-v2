import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image, ScrollView } from 'react-native';
import { navigate } from '../App';

export default function MarketingScreen() {
  const titleAnim = useRef(new Animated.Value(0)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const featuresAnim = useRef(new Animated.Value(0)).current;
  const statsAnim = useRef(new Animated.Value(0)).current;
  const bottomAnim = useRef(new Animated.Value(0)).current;
  const healiAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(100, [
      Animated.timing(titleAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(subtitleAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(featuresAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(statsAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(bottomAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(healiAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(healiAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ]),
    ).start();
  }, []);

  const slideFade = (anim) => ({
    opacity: anim,
    transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.topSection}>
        <View style={styles.gradientBg}>
          <View style={styles.gradientTop} />
          <View style={styles.gradientBottom} />
        </View>

        <View style={styles.logoBox}>
          <Image source={require('../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
        </View>

        <Animated.Text style={[styles.title, slideFade(titleAnim)]}>Telehealings</Animated.Text>
        <Animated.Text style={[styles.subtitle, slideFade(subtitleAnim)]}>Continuity-first wellness care platform</Animated.Text>

        <Animated.View style={[styles.featuresList, slideFade(featuresAnim)]}>
          <View style={styles.featureItem}>
            <Text style={styles.featureStar}>✦</Text>
            <Text style={styles.featureText}>Ai-powered conversational partner</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureStar}>✦</Text>
            <Text style={styles.featureText}>Therapist handover continuity</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureStar}>✦</Text>
            <Text style={styles.featureText}>Self-help library</Text>
          </View>
        </Animated.View>

        <Animated.View style={[styles.statsRow, slideFade(statsAnim)]}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>200+</Text>
            <Text style={styles.statLabel}>{'Verified\ntherapists'}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>8+</Text>
            <Text style={styles.statLabel}>{'Languages\n'}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>1,000+</Text>
            <Text style={styles.statLabel}>{'Hours of\ntherapy'}</Text>
          </View>
        </Animated.View>
      </View>

      <Animated.View style={[styles.bottomSection, slideFade(bottomAnim)]}>
        <Animated.View style={{ transform: [{ translateY: healiAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -8] }) }] }}>
          <Image source={require('../assets/Heali.png')} style={styles.healiImage} resizeMode="contain" />
        </Animated.View>

        <View style={styles.ctaRow}>
          <Text style={styles.ctaText}>{'Your wellness journey\nis one click away.'}</Text>
          <TouchableOpacity
            style={styles.ctaButton}
            activeOpacity={0.8}
            onPress={() => navigate('/soft-onboarding')}
          >
            <Text style={styles.ctaArrow}>→</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  contentContainer: { flexGrow: 1 },
  topSection: { paddingTop: 40, paddingBottom: 25, paddingHorizontal: 20, alignItems: 'center', position: 'relative', overflow: 'hidden' },
  gradientBg: { ...StyleSheet.absoluteFillObject },
  gradientTop: { flex: 1, backgroundColor: '#e7f2ff' },
  gradientBottom: { flex: 1, backgroundColor: '#2366bd', opacity: 0.3 },
  logoBox: { marginBottom: 10, zIndex: 1 },
  logoImage: { width: 120, height: 120 },
  title: { color: '#1e5ab8', fontSize: 34, fontWeight: '700', marginBottom: 8, letterSpacing: -0.5, zIndex: 1 },
  subtitle: { color: '#1e5ab8', fontSize: 15, fontWeight: '700', marginBottom: 35, textAlign: 'center', zIndex: 1 },
  featuresList: { marginBottom: 40, width: '100%', maxWidth: 300, zIndex: 1 },
  featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 9 },
  featureStar: { color: '#1e5ab8', fontSize: 16, marginRight: 8 },
  featureText: { color: '#1e5ab8', fontSize: 14, fontWeight: '600' },
  statsRow: { flexDirection: 'row', gap: 12, width: '100%', maxWidth: 340, justifyContent: 'space-between', zIndex: 1 },
  statBox: { backgroundColor: 'rgba(255, 255, 255, 0.9)', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 16, paddingVertical: 20, paddingHorizontal: 12, flex: 1, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.04, shadowRadius: 30, elevation: 2 },
  statValue: { color: '#1e5ab8', fontSize: 20, fontWeight: '700', marginBottom: 6 },
  statLabel: { color: '#55605E', fontSize: 10, fontWeight: '600', lineHeight: 13, letterSpacing: 0.5, textAlign: 'center' },
  bottomSection: { flex: 1, alignItems: 'center', paddingHorizontal: 25, paddingTop: 20, paddingBottom: 60, backgroundColor: '#ffffff' },
  healiImage: { width: 90, height: 90, marginTop: 'auto', marginBottom: 10 },
  ctaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 'auto' },
  ctaText: { color: '#1e5ab8', fontSize: 24, fontWeight: '700', lineHeight: 31, letterSpacing: -0.5 },
  ctaButton: { backgroundColor: '#387bd5', width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', shadowColor: '#387bd5', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.18, shadowRadius: 12, elevation: 4 },
  ctaArrow: { color: '#ffffff', fontSize: 28, fontWeight: '400' },
});
