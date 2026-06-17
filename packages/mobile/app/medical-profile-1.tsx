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
import Svg, { Path, Circle, Line, Rect, Polyline } from 'react-native-svg';

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

const THERAPY_OPTIONS = ['Yes, currently', 'Yes, in the past', 'No, never'];
const HOSPITAL_OPTIONS = ['Yes', 'No'];

export default function MedicalProfile1Screen() {
  const router = useRouter();

  const [therapyAnswer, setTherapyAnswer] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [trauma, setTrauma] = useState('');
  const [hospitalAnswer, setHospitalAnswer] = useState('');
  const [hospitalReason, setHospitalReason] = useState('');
  const [hospitalDate, setHospitalDate] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(15)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start();
  }, []);

  const handleSave = () => {
    router.push('/medical-profile-2' as any);
  };

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
            <View style={[styles.step, styles.stepActive]} />
            <View style={styles.step} />
            <View style={styles.step} />
            <View style={styles.step} />
          </View>
          {/* Bottom curve */}
          <Svg height={35} width="100%" viewBox={`0 0 ${SCREEN_WIDTH} 35`} preserveAspectRatio="none" style={styles.curveSvg}>
            <Path d={`M0 35 L0 0 Q${SCREEN_WIDTH / 2} 35 ${SCREEN_WIDTH} 0 L${SCREEN_WIDTH} 35 Z`} fill="#ffffff" />
          </Svg>
        </View>

        {/* Form */}
        <Animated.View style={[styles.formSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          {/* Info Banner */}
          <View style={styles.infoBanner}>
            <Text style={styles.infoText}>
              Your mental well-being is as vital as your physical health. Please provide honest details to help us tailor your medical profile accurately. This data is encrypted and handled with the highest clinical confidentiality.
            </Text>
          </View>

          {/* Q1: Therapy before */}
          <View style={styles.questionBlock}>
            <Text style={styles.questionTitle}>
              Have you attended therapy before? <Text style={styles.reqStar}>*</Text>
            </Text>
            {THERAPY_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.radioCard, therapyAnswer === option && styles.radioCardSelected]}
                onPress={() => setTherapyAnswer(option)}
              >
                <View style={[styles.radioCircle, therapyAnswer === option && styles.radioCircleSelected]}>
                  {therapyAnswer === option && <View style={styles.radioDot} />}
                </View>
                <Text style={[styles.radioLabel, therapyAnswer === option && styles.radioLabelSelected]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.divider} />

          {/* Q2: Past diagnosis */}
          <View style={styles.questionBlock}>
            <Text style={styles.questionTitle}>Any past mental health diagnosis?</Text>
            <Text style={styles.questionSubtitle}>Please list any conditions you have been diagnosed with by a professional.</Text>
            <TextInput
              style={styles.textarea}
              placeholder="E.g. Generalized Anxiety Disorder, Depression..."
              placeholderTextColor="#94a3b8"
              value={diagnosis}
              onChangeText={setDiagnosis}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.divider} />

          {/* Q3: Trauma */}
          <View style={styles.questionBlock}>
            <Text style={styles.questionTitle}>Any history of trauma or significant life events?</Text>
            <Text style={styles.questionSubtitle}>Sharing this helps us understand potential triggers or underlying factors.</Text>
            <TextInput
              style={styles.textarea}
              placeholder="Describe briefly if comfortable..."
              placeholderTextColor="#94a3b8"
              value={trauma}
              onChangeText={setTrauma}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.divider} />

          {/* Q4: Hospitalisation */}
          <View style={styles.questionBlock}>
            <Text style={styles.questionTitle}>
              Any past psychiatric hospitalisation? <Text style={styles.reqStar}>*</Text>
            </Text>
            <View style={styles.inlineRadioGroup}>
              {HOSPITAL_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[styles.simpleRadio, hospitalAnswer === option && styles.simpleRadioSelected]}
                  onPress={() => setHospitalAnswer(option)}
                >
                  <View style={[styles.radioCircle, hospitalAnswer === option && styles.radioCircleSelected]}>
                    {hospitalAnswer === option && <View style={styles.radioDot} />}
                  </View>
                  <Text style={[styles.radioLabel, hospitalAnswer === option && styles.radioLabelSelected]}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Conditional details - shown when Yes selected */}
            {hospitalAnswer === 'Yes' && (
              <View style={styles.conditionalDetails}>
                <View style={styles.conditionalField}>
                  <Text style={styles.lineLabel}>Reason (Optional)</Text>
                  <TextInput
                    style={[styles.textarea, { minHeight: 80, padding: 12 }]}
                    placeholder="Briefly describe the reason..."
                    placeholderTextColor="#94a3b8"
                    value={hospitalReason}
                    onChangeText={setHospitalReason}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                  />
                </View>
                <View style={styles.conditionalField}>
                  <Text style={styles.lineLabel}>Date (Optional)</Text>
                  <TextInput
                    style={styles.lineInput}
                    placeholder="DD / MM / YYYY"
                    placeholderTextColor="#cbd5e1"
                    value={hospitalDate}
                    onChangeText={setHospitalDate}
                  />
                </View>
              </View>
            )}
          </View>

          {/* Save Button */}
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
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  topSection: {
    paddingTop: 18,
    paddingBottom: 30,
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    width: 40,
    alignItems: 'flex-start',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },
  mascot: {
    width: 40,
    alignItems: 'flex-end',
  },
  mascotImg: {
    width: 32,
    height: 32,
  },
  stepper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
  },
  step: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    maxWidth: 60,
  },
  stepActive: {
    backgroundColor: '#ffffff',
  },
  curveSvg: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
  },
  formSection: {
    flex: 1,
    padding: 20,
    paddingBottom: 40,
  },
  infoBanner: {
    backgroundColor: '#f4f8fd',
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    borderRadius: 8,
    padding: 14,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
    fontWeight: '400',
  },
  questionBlock: {
    marginBottom: 20,
  },
  questionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 14,
  },
  questionSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: -10,
    marginBottom: 14,
    lineHeight: 19,
  },
  reqStar: {
    color: '#ef4444',
    fontSize: 18,
  },
  radioCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  radioCardSelected: {
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59,130,246,0.06)',
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: '#3b82f6',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3b82f6',
  },
  radioLabel: {
    fontSize: 15,
    fontWeight: '400',
    color: '#334155',
  },
  radioLabelSelected: {
    color: '#0f172a',
    fontWeight: '600',
  },
  textarea: {
    width: '100%',
    minHeight: 100,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    fontSize: 15,
    color: '#1a293b',
    backgroundColor: '#ffffff',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginBottom: 16,
  },
  inlineRadioGroup: {
    flexDirection: 'row',
    gap: 32,
    marginBottom: 12,
  },
  simpleRadio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  simpleRadioSelected: {},
  conditionalDetails: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginTop: 4,
  },
  conditionalField: {
    marginBottom: 16,
  },
  lineLabel: {
    fontSize: 13,
    color: '#94a3b8',
    marginBottom: 8,
  },
  lineInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingVertical: 8,
    fontSize: 15,
    color: '#1a293b',
    backgroundColor: 'transparent',
  },
  btnPrimary: {
    width: '100%',
    backgroundColor: '#387bd5',
    borderRadius: 25,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 16,
    marginBottom: 24,
    shadowColor: '#387bd5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 4,
  },
  btnPrimaryText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});
