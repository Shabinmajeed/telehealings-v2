import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Polyline, Line, Rect, Circle } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Icon = ({ d, size = 24, color = '#000', strokeWidth = 2 }: { d: string; size?: number; color?: string; strokeWidth?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d={d} />
  </Svg>
);

const ICONS = {
  back: 'M19 12H5M12 19l-7-7 7-7',
  video: 'M23 7l-7 5 7 5V7z M1 5h14a2 2 0 012 2v10a2 2 0 01-2 2H1a2 2 0 01-2-2V7a2 2 0 012-2z',
  calendar: 'M3 4h18v18H3z M16 2v4 M8 2v4 M3 10h18',
  clock: 'M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2',
  info: 'M12 2a10 10 0 100 20 10 10 0 000-20zM12 16v-4M12 8h.01',
  tag: 'M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01',
  card: 'M1 4h22v16H1z M1 10h23',
  lock: 'M12 2a10 10 0 100 20 10 10 0 000-20zM12 16v-4M12 8h.01',
  check: 'M20 6L9 17l-4-4',
  home: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22v-6h6v6',
};

const CONFETTI_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];
const CONFETTI = Array.from({ length: 40 }, (_, i) => ({
  id: i, left: Math.random() * 100, delay: Math.random() * 0.8,
  duration: 2 + Math.random() * 1.5, size: 6 + Math.random() * 10,
  color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
}));

export default function BookingConfirmedScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(15)).current;
  const checkAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start();

    Animated.spring(checkAnim, { toValue: 1, friction: 4, tension: 40, useNativeDriver: true }).start();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.topSection}>
          <LinearGradient colors={['#e7f2ff', '#2366bd']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={StyleSheet.absoluteFillObject} />
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/home' as any)}>
              <Icon d={ICONS.back} size={24} color="#ffffff" strokeWidth={2.5} />
              <Text style={styles.backBtnText}>Session Details</Text>
            </TouchableOpacity>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80' }}
              style={styles.avatarSm}
            />
          </View>
          <Svg height={35} width="100%" viewBox={`0 0 ${SCREEN_WIDTH} 35`} preserveAspectRatio="none" style={styles.curveSvg}>
            <Path d={`M0 35 L0 0 Q${SCREEN_WIDTH / 2} 35 ${SCREEN_WIDTH} 0 L${SCREEN_WIDTH} 35 Z`} fill="#ffffff" />
          </Svg>
        </View>

        {/* Content */}
        <Animated.View style={[styles.contentWrapper, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          {/* Status badge */}
          <View style={styles.statusBadge}>
            <Animated.View style={{ transform: [{ scale: checkAnim }] }}>
              <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={2}>
                <Path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <Polyline points="22 4 12 14.01 9 11.01" />
              </Svg>
            </Animated.View>
            <Text style={styles.statusText}>Booking Confirmed!</Text>
          </View>

          {/* Hero */}
          <View style={styles.heroBlock}>
            <Text style={styles.heroTitle}>Your journey to wellness is scheduled.</Text>
            <Image source={require('../assets/Heali.png')} style={styles.heroMascot} resizeMode="contain" />
          </View>

          <Text style={styles.descText}>We've sent a confirmation email to your registered address with all the details and meeting links.</Text>

          {/* Summary card */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryCardTitle}>Appointment Summary</Text>

            <View style={styles.summaryRow}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80' }}
                style={styles.therapistAvatar}
              />
              <View style={styles.rowContent}>
                <Text style={styles.rowLabel}>Specialist</Text>
                <Text style={styles.rowVal}>Dr. Smitha.S</Text>
              </View>
            </View>

            <View style={styles.summaryRow}>
              <View style={styles.iconBox}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2}>
                  <Path d={ICONS.video} />
                </Svg>
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.rowLabel}>Session Type</Text>
                <Text style={styles.rowVal}>Video Consultation</Text>
              </View>
            </View>

            <View style={styles.summaryRow}>
              <View style={styles.iconBox}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2}>
                  <Path d={ICONS.calendar} />
                </Svg>
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.rowLabel}>Date & Time</Text>
                <Text style={styles.rowVal}>Thu, Oct 24 • 10:30 AM</Text>
              </View>
            </View>

            <View style={styles.summaryRow}>
              <View style={styles.iconBox}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2}>
                  <Path d={ICONS.clock} />
                </Svg>
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.rowLabel}>Duration</Text>
                <Text style={styles.rowVal}>50 minutes</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.homeBtn} onPress={() => router.push('/home' as any)} activeOpacity={0.8}>
            <Text style={styles.homeBtnText}>Go to Home</Text>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2.5}>
              <Path d={ICONS.home} />
            </Svg>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      {/* Confetti */}
      <View style={styles.confettiContainer} pointerEvents="none">
        {CONFETTI.map(c => (
          <ConfettiPiece key={c.id} {...c} />
        ))}
      </View>
    </View>
  );
}

function ConfettiPiece({ left, delay, duration, size, color }: {
  left: number; delay: number; duration: number; size: number; color: string;
}) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(anim, { toValue: 1, duration: duration * 1000, easing: Easing.out(Easing.quad), useNativeDriver: true }).start();
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Animated.View style={{
      position: 'absolute', left: `${left}%`, top: -20, width: size, height: size, borderRadius: 2,
      backgroundColor: color,
      opacity: anim.interpolate({ inputRange: [0, 0.3, 1], outputRange: [1, 1, 0] }),
      transform: [
        { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, 120] }) },
        { rotate: anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '720deg'] }) },
      ],
    }} />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  scrollContent: { flexGrow: 1 },
  topSection: {
    paddingTop: 18, paddingBottom: 30, paddingHorizontal: 20,
    position: 'relative', overflow: 'hidden',
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtnText: { color: '#ffffff', fontSize: 20, fontWeight: '800' },
  avatarSm: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, borderColor: '#ffffff' },
  curveSvg: { position: 'absolute', bottom: -1, left: 0, right: 0 },
  contentWrapper: { flex: 1, padding: 16, paddingHorizontal: 24, paddingBottom: 40 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  statusText: { fontSize: 15, fontWeight: '700', color: '#10b981' },
  heroBlock: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  heroTitle: { fontSize: 32, fontWeight: '800', color: '#000000', lineHeight: 38, flex: 1, letterSpacing: -0.5 },
  heroMascot: { width: 90, height: 90, marginLeft: 10 },
  descText: { fontSize: 14, color: '#64748b', lineHeight: 21, marginBottom: 32 },
  summaryCard: {
    backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 16,
    padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02, shadowRadius: 20, elevation: 2,
  },
  summaryCardTitle: { fontSize: 13, fontWeight: '700', color: '#64748b', marginBottom: 16 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  therapistAvatar: { width: 48, height: 48, borderRadius: 24 },
  iconBox: {
    width: 48, height: 48, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0',
    alignItems: 'center', justifyContent: 'center',
  },
  rowContent: { gap: 4 },
  rowLabel: { fontSize: 11, fontWeight: '600', color: '#94a3b8' },
  rowVal: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  homeBtn: {
    width: '100%', backgroundColor: '#3b82f6', borderRadius: 16, padding: 18,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12,
    marginTop: 32,
    shadowColor: '#3b82f6', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3, shadowRadius: 20, elevation: 4,
  },
  homeBtnText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  confettiContainer: { ...StyleSheet.absoluteFillObject, overflow: 'hidden', zIndex: 999 },
});
