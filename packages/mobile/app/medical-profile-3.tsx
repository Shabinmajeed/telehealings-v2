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
};

const CONDITIONS = ['Diabetes', 'Hypertension', 'Asthma', 'Heart Condition'];
const TOBACCO_OPTIONS = ['Never', 'Former', 'Current'];
const ALCOHOL_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Socially (1-2 times per week)', value: 'socially' },
  { label: 'Frequently (3+ times per week)', value: 'frequently' },
  { label: 'Daily', value: 'daily' },
];

export default function MedicalProfile3Screen() {
  const router = useRouter();

  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [otherConditions, setOtherConditions] = useState('');
  const [tobacco, setTobacco] = useState('');
  const [alcohol, setAlcohol] = useState('');
  const [otherSubstances, setOtherSubstances] = useState('');
  const [medications, setMedications] = useState('');
  const [showAlcoholPicker, setShowAlcoholPicker] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(15)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start();
  }, []);

  const toggleCondition = (condition: string) => {
    setSelectedConditions(prev =>
      prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]
    );
  };

  const handleSave = () => {
    router.push('/medical-profile-4' as any);
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
          <View style={styles.stepper}>
            <View style={styles.step} />
            <View style={styles.step} />
            <View style={[styles.step, styles.stepActive]} />
            <View style={styles.step} />
          </View>
          <Svg height={35} width="100%" viewBox={`0 0 ${SCREEN_WIDTH} 35`} preserveAspectRatio="none" style={styles.curveSvg}>
            <Path d={`M0 35 L0 0 Q${SCREEN_WIDTH / 2} 35 ${SCREEN_WIDTH} 0 L${SCREEN_WIDTH} 35 Z`} fill="#ffffff" />
          </Svg>
        </View>

        {/* Form */}
        <Animated.View style={[styles.formSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.pageTitle}>Medical & Medication</Text>
          <Text style={styles.pageDescription}>Please provide accurate information regarding your current health status and any substances used. This data is encrypted and strictly confidential.</Text>

          {/* Q1: Medical conditions */}
          <View style={styles.questionBlock}>
            <Text style={styles.questionTitle}>Any ongoing medical conditions</Text>
            {CONDITIONS.map((condition) => (
              <TouchableOpacity
                key={condition}
                style={[styles.radioCard, selectedConditions.includes(condition) && styles.radioCardSelected]}
                onPress={() => toggleCondition(condition)}
              >
                <View style={[styles.radioCircle, selectedConditions.includes(condition) && styles.radioCircleSelected]}>
                  {selectedConditions.includes(condition) && <View style={styles.radioDot} />}
                </View>
                <Text style={[styles.radioLabel, selectedConditions.includes(condition) && styles.radioLabelSelected]}>{condition}</Text>
              </TouchableOpacity>
            ))}
            <TextInput
              style={styles.customInput}
              placeholder="Other conditions (please specify)..."
              placeholderTextColor="#64748b"
              value={otherConditions}
              onChangeText={setOtherConditions}
            />
          </View>

          <View style={styles.divider} />

          {/* Q2: Substance use */}
          <View style={styles.questionBlock}>
            <Text style={styles.questionTitle}>Substance use (alcohol, smoking, drugs)</Text>

            {/* Tobacco */}
            <View style={styles.subQuestion}>
              <Text style={styles.subQuestionTitle}>Tobacco Use</Text>
              <View style={styles.inlineRadioGroup}>
                {TOBACCO_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[styles.simpleRadio, tobacco === option && styles.simpleRadioSelected]}
                    onPress={() => setTobacco(option)}
                  >
                    <View style={[styles.radioCircle, tobacco === option && styles.radioCircleSelected]}>
                      {tobacco === option && <View style={styles.radioDot} />}
                    </View>
                    <Text style={[styles.radioLabel, tobacco === option && styles.radioLabelSelected]}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Alcohol */}
            <View style={styles.subQuestion}>
              <Text style={[styles.subQuestionTitle, { color: '#64748b' }]}>Alcohol Consumption</Text>
              <TouchableOpacity
                style={styles.selectInput}
                onPress={() => setShowAlcoholPicker(!showAlcoholPicker)}
              >
                <Text style={[styles.selectText, !alcohol && styles.selectPlaceholder]}>
                  {alcohol ? ALCOHOL_OPTIONS.find(a => a.value === alcohol)?.label : 'Select frequency...'}
                </Text>
                <View style={[styles.selectArrow, showAlcoholPicker && styles.selectArrowUp]}>
                  <Icon d="M6 9l6 6 6-6" size={18} color="#94a3b8" strokeWidth={2.5} />
                </View>
              </TouchableOpacity>
              {showAlcoholPicker && (
                <View style={styles.dropdownMenu}>
                  {ALCOHOL_OPTIONS.map((item) => (
                    <TouchableOpacity
                      key={item.value}
                      style={[styles.dropdownItem, alcohol === item.value && styles.dropdownItemActive]}
                      onPress={() => {
                        setAlcohol(item.value);
                        setShowAlcoholPicker(false);
                      }}
                    >
                      <Text style={[styles.dropdownItemText, alcohol === item.value && styles.dropdownItemTextActive]}>{item.label}</Text>
                      {alcohol === item.value && <Icon d="M20 6L9 17l-4-4" size={16} color="#3b82f6" strokeWidth={2.5} />}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Other substances */}
            <View style={{ marginBottom: 8 }}>
              <Text style={[styles.subQuestionTitle, { color: '#64748b' }]}>Other Substances</Text>
              <TextInput
                style={styles.customInput}
                placeholder="Any recreational drug use? (Optional)"
                placeholderTextColor="#64748b"
                value={otherSubstances}
                onChangeText={setOtherSubstances}
              />
            </View>
          </View>

          {/* Q3: Medications */}
          <View style={styles.questionBlock}>
            <Text style={styles.questionTitle}>Current Medications</Text>
            <Text style={styles.questionSubtitle}>Please list any medications you are currently taking. This helps your therapist provide the best care.</Text>
            <TextInput
              style={styles.customInput}
              placeholder="e.g., Sertraline 50mg, Clonazepam 0.5mg"
              placeholderTextColor="#64748b"
              value={medications}
              onChangeText={setMedications}
            />
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
  questionTitle: { fontSize: 17, fontWeight: '700', color: '#000000', marginBottom: 16 },
  questionSubtitle: { fontSize: 13, color: '#64748b', marginTop: -10, marginBottom: 14, lineHeight: 19 },
  subQuestion: { marginTop: 16, marginBottom: 24 },
  subQuestionTitle: { fontSize: 14, fontWeight: '700', color: '#000000', marginBottom: 14 },
  radioCard: {
    flexDirection: 'row', alignItems: 'center', padding: 16,
    borderWidth: 1.5, borderColor: '#e2e8f0', borderRadius: 12, marginBottom: 12, backgroundColor: '#ffffff',
  },
  radioCardSelected: { borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.06)' },
  radioCircle: {
    width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#cbd5e1',
    marginRight: 14, alignItems: 'center', justifyContent: 'center',
  },
  radioCircleSelected: { borderColor: '#3b82f6' },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#3b82f6' },
  radioLabel: { fontSize: 15, fontWeight: '400', color: '#334155' },
  radioLabelSelected: { color: '#0f172a', fontWeight: '600' },
  customInput: {
    width: '100%', height: 52, backgroundColor: '#ffffff',
    borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12,
    paddingHorizontal: 16, fontSize: 15, color: '#1a293b', marginBottom: 12,
  },
  divider: { height: 1, backgroundColor: '#e2e8f0', marginTop: 12, marginBottom: 24 },
  inlineRadioGroup: { flexDirection: 'row', gap: 32 },
  simpleRadio: { flexDirection: 'row', alignItems: 'center' },
  simpleRadioSelected: {},
  selectInput: {
    width: '100%', height: 52, backgroundColor: '#ffffff',
    borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12,
    paddingHorizontal: 16, paddingRight: 40,
    justifyContent: 'center', position: 'relative',
  },
  selectText: { fontSize: 15, color: '#1a293b' },
  selectPlaceholder: { color: '#94a3b8' },
  selectArrow: { position: 'absolute', right: 16, top: 17 },
  selectArrowUp: { transform: [{ rotate: '180deg' }] },
  dropdownMenu: {
    backgroundColor: '#ffffff', borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0',
    marginTop: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, shadowRadius: 12, elevation: 8, overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#f1f5f9',
  },
  dropdownItemActive: { backgroundColor: '#eff6ff' },
  dropdownItemText: { fontSize: 15, fontWeight: '500', color: '#1a293b' },
  dropdownItemTextActive: { color: '#3b82f6', fontWeight: '600' },
  btnPrimary: {
    width: '100%', backgroundColor: '#387bd5', borderRadius: 25, paddingVertical: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    marginTop: 16, marginBottom: 24,
    shadowColor: '#387bd5', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25, shadowRadius: 20, elevation: 4,
  },
  btnPrimaryText: { color: '#ffffff', fontSize: 15, fontWeight: '600' },
});
