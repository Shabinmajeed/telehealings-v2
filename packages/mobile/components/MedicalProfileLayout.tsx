import { useRef, useEffect } from 'react';
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
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Polyline, Line } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Icon = ({ d, size = 24, color = '#000', strokeWidth = 2 }: { d: string; size?: number; color?: string; strokeWidth?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d={d} />
  </Svg>
);

const ICONS = {
  back: 'M19 12H5M12 19l-7-7 7-7',
  arrowRight: 'M5 12h14M12 5l7 7-7 7',
};

export interface MedicalProfileLayoutProps {
  step: 1 | 2 | 3 | 4;
  title: string;
  description: string;
  onSaveAndNext: () => void;
  children: React.ReactNode;
}

export default function MedicalProfileLayout({ step, title, description, onSaveAndNext, children }: MedicalProfileLayoutProps) {
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(15)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.topSection}>
          <LinearGradient colors={['#e7f2ff', '#2366bd']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={StyleSheet.absoluteFillObject} />
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Icon d={ICONS.back} size={24} color="#ffffff" strokeWidth={2.5} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Medical Profile</Text>
            <View style={styles.mascot}>
              <Image source={require('../assets/Heali.png')} style={styles.mascotImg} resizeMode="contain" />
            </View>
          </View>
          {/* Stepper */}
          <View style={styles.stepper}>
            {[1, 2, 3, 4].map((s) => (
              <View key={s} style={[styles.step, s === step && styles.stepActive]} />
            ))}
          </View>
          {/* Bottom curve */}
          <Svg height={35} width="100%" viewBox={`0 0 ${SCREEN_WIDTH} 35`} preserveAspectRatio="none" style={styles.curveSvg}>
            <Path d={`M0 35 L0 0 Q${SCREEN_WIDTH / 2} 35 ${SCREEN_WIDTH} 0 L${SCREEN_WIDTH} 35 Z`} fill="#ffffff" />
          </Svg>
        </View>

        {/* Form */}
        <Animated.View style={[styles.formSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.pageTitle}>{title}</Text>
          <Text style={styles.pageDescription}>{description}</Text>
          {children}

          {/* Save Button */}
          <TouchableOpacity style={styles.btnPrimary} onPress={onSaveAndNext} activeOpacity={0.8}>
            <Text style={styles.btnPrimaryText}>Save & Next</Text>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <Line x1="5" y1="12" x2="19" y2="12" />
              <Polyline points="12 5 19 12 12 19" />
            </Svg>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  scrollContent: { flexGrow: 1 },
  topSection: {
    paddingTop: 18, paddingBottom: 30, paddingHorizontal: 20,
    position: 'relative', overflow: 'hidden',
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  backBtn: { width: 40, alignItems: 'flex-start' },
  headerTitle: { flex: 1, textAlign: 'center', color: '#ffffff', fontSize: 22, fontWeight: '700' },
  mascot: { width: 40, alignItems: 'flex-end' },
  mascotImg: { width: 32, height: 32 },
  stepper: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 12 },
  step: { flex: 1, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.3)', maxWidth: 60 },
  stepActive: { backgroundColor: '#ffffff' },
  curveSvg: { position: 'absolute', bottom: -1, left: 0, right: 0 },
  formSection: { flex: 1, padding: 20, paddingBottom: 40 },
  pageTitle: { fontSize: 26, fontWeight: '800', color: '#000000', marginBottom: 8, marginTop: 8 },
  pageDescription: { fontSize: 14, color: '#475569', lineHeight: 21, marginBottom: 24 },
  btnPrimary: {
    width: '100%', backgroundColor: '#387bd5', borderRadius: 25, paddingVertical: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    marginTop: 16, marginBottom: 24,
    shadowColor: '#387bd5', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25, shadowRadius: 20, elevation: 4,
  },
  btnPrimaryText: { color: '#ffffff', fontSize: 15, fontWeight: '600' },
});
