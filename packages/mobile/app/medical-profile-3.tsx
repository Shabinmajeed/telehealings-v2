import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import MedicalProfileLayout from '../components/MedicalProfileLayout';

const Icon = ({ d, size = 24, color = '#000', strokeWidth = 2 }: { d: string; size?: number; color?: string; strokeWidth?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d={d} />
  </Svg>
);

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

  const toggleCondition = (condition: string) => {
    setSelectedConditions(prev =>
      prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]
    );
  };

  return (
    <MedicalProfileLayout
      step={3}
      title="Medical & Medication"
      description="Please provide accurate information regarding your current health status and any substances used. This data is encrypted and strictly confidential."
      onSaveAndNext={() => router.push('/medical-profile-4' as any)}
    >
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
                  onPress={() => { setAlcohol(item.value); setShowAlcoholPicker(false); }}
                >
                  <Text style={[styles.dropdownItemText, alcohol === item.value && styles.dropdownItemTextActive]}>{item.label}</Text>
                  {alcohol === item.value && <Icon d="M20 6L9 17l-4-4" size={16} color="#3b82f6" strokeWidth={2.5} />}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

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
    </MedicalProfileLayout>
  );
}

const styles = StyleSheet.create({
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
});
