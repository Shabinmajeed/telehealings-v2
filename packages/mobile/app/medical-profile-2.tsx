import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
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
  check: 'M20 6L9 17l-4-4',
};

export default function MedicalProfile2Screen() {
  const router = useRouter();

  const [bringsYou, setBringsYou] = useState('');
  const [howLong, setHowLong] = useState('');
  const [affecting, setAffecting] = useState('');
  const [expectations, setExpectations] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(15)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start();
  }, []);

  const handleSave = () => {
    router.push('/medical-profile-3' as any);
  };

  const showCheck = (value: string) => value.trim().length >= 10;

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
          <View style={styles.stepper}>
            <View style={styles.step} />
            <View style={[styles.step, styles.stepActive]} />
            <View style={styles.step} />
            <View style={styles.step} />
          </View>
          <Svg height={35} width="100%" viewBox={`0 0 ${SCREEN_WIDTH} 35`} preserveAspectRatio="none" style={styles.curveSvg}>
            <Path d={`M0 35 L0 0 Q${SCREEN_WIDTH / 2} 35 ${SCREEN_WIDTH} 0 L${SCREEN_WIDTH} 35 Z`} fill="#ffffff" />
          </Svg>
        </View>

        {/* Form */}
        <Animated.View style={[styles.formSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.pageTitle}>Presenting Concerns</Text>
          <Text style={styles.pageDescription}>Please provide detailed information about your current situation to help us match you with the right therapist.</Text>

          {/* Q1 */}
          <View style={styles.questionBlock}>
            <Text style={styles.questionTitle}>What brings you to therapy?</Text>
            <View style={styles.textareaWrap}>
              <TextInput
                style={[styles.textarea, showCheck(bringsYou) && styles.textareaValid]}
                placeholder="Share your main reasons for seeking support..."
                placeholderTextColor="#94a3b8"
                value={bringsYou}
                onChangeText={setBringsYou}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              {showCheck(bringsYou) && (
                <View style={styles.checkIndicator}>
                  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <Polyline points="20 6 9 17 4 12" />
                  </Svg>
                </View>
              )}
            </View>
          </View>

          {/* Q2 */}
          <View style={styles.questionBlock}>
            <Text style={styles.questionTitle}>Since how long have you been experiencing this?</Text>
            <View style={styles.textareaWrap}>
              <TextInput
                style={[styles.textarea, showCheck(howLong) && styles.textareaValid]}
                placeholder="Provide a timeline of when these concerns started..."
                placeholderTextColor="#94a3b8"
                value={howLong}
                onChangeText={setHowLong}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              {showCheck(howLong) && (
                <View style={styles.checkIndicator}>
                  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <Polyline points="20 6 9 17 4 12" />
                  </Svg>
                </View>
              )}
            </View>
          </View>

          {/* Q3 */}
          <View style={styles.questionBlock}>
            <Text style={styles.questionTitle}>How is this affecting your daily life?</Text>
            <View style={styles.textareaWrap}>
              <TextInput
                style={[styles.textarea, showCheck(affecting) && styles.textareaValid]}
                placeholder="Describe the impact on your work, relationships, or personal wellbeing..."
                placeholderTextColor="#94a3b8"
                value={affecting}
                onChangeText={setAffecting}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              {showCheck(affecting) && (
                <View style={styles.checkIndicator}>
                  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <Polyline points="20 6 9 17 4 12" />
                  </Svg>
                </View>
              )}
            </View>
          </View>

          {/* Q4 */}
          <View style={[styles.questionBlock, { marginBottom: 8 }]}>
            <Text style={styles.questionTitle}>What are your expectations from therapy?</Text>
            <View style={styles.textareaWrap}>
              <TextInput
                style={[styles.textarea, showCheck(expectations) && styles.textareaValid]}
                placeholder="What goals or outcomes are you hoping to achieve?"
                placeholderTextColor="#94a3b8"
                value={expectations}
                onChangeText={setExpectations}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              {showCheck(expectations) && (
                <View style={styles.checkIndicator}>
                  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <Polyline points="20 6 9 17 4 12" />
                  </Svg>
                </View>
              )}
            </View>
          </View>

          <TouchableOpacity style={styles.btnPrimary} onPress={handleSave} activeOpacity={0.8}>
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
  questionBlock: { marginBottom: 20 },
  questionTitle: { fontSize: 17, fontWeight: '700', color: '#000000', marginBottom: 14 },
  textareaWrap: { position: 'relative' },
  textarea: {
    width: '100%', minHeight: 100, padding: 16, paddingRight: 40,
    borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12,
    fontSize: 15, color: '#1a293b', backgroundColor: '#ffffff',
    textAlignVertical: 'top',
  },
  textareaValid: { borderColor: '#10b981' },
  checkIndicator: { position: 'absolute', right: 12, top: 16 },
  btnPrimary: {
    width: '100%', backgroundColor: '#387bd5', borderRadius: 25, paddingVertical: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    marginTop: 16, marginBottom: 24,
    shadowColor: '#387bd5', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25, shadowRadius: 20, elevation: 4,
  },
  btnPrimaryText: { color: '#ffffff', fontSize: 15, fontWeight: '600' },
});
