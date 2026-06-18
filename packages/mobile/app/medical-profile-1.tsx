import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import MedicalProfileLayout from '../components/MedicalProfileLayout';

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

  return (
    <MedicalProfileLayout
      step={1}
      title="Mental Health Background"
      description="Your mental well-being is as vital as your physical health. Please provide honest details to help us tailor your medical profile accurately."
      onSaveAndNext={() => router.push('/medical-profile-2' as any)}
    >
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
    </MedicalProfileLayout>
  );
}

const styles = StyleSheet.create({
  infoBanner: {
    backgroundColor: '#f4f8fd', borderLeftWidth: 4, borderLeftColor: '#3b82f6',
    borderRadius: 8, padding: 14, marginBottom: 20,
  },
  infoText: { fontSize: 12, color: '#475569', lineHeight: 18, fontWeight: '400' },
  questionBlock: { marginBottom: 20 },
  questionTitle: { fontSize: 17, fontWeight: '700', color: '#000000', marginBottom: 14 },
  questionSubtitle: { fontSize: 13, color: '#64748b', marginTop: -10, marginBottom: 14, lineHeight: 19 },
  reqStar: { color: '#ef4444', fontSize: 18 },
  radioCard: {
    flexDirection: 'row', alignItems: 'center', padding: 16,
    borderWidth: 1.5, borderColor: '#e2e8f0', borderRadius: 12, marginBottom: 10, backgroundColor: '#ffffff',
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
  textarea: {
    width: '100%', minHeight: 100, padding: 16,
    borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12,
    fontSize: 15, color: '#1a293b', backgroundColor: '#ffffff',
  },
  divider: { height: 1, backgroundColor: '#e2e8f0', marginBottom: 16 },
  inlineRadioGroup: { flexDirection: 'row', gap: 32, marginBottom: 12 },
  simpleRadio: { flexDirection: 'row', alignItems: 'center' },
  simpleRadioSelected: {},
  conditionalDetails: { backgroundColor: '#f8fafc', borderRadius: 12, padding: 16, marginTop: 4 },
  conditionalField: { marginBottom: 16 },
  lineLabel: { fontSize: 13, color: '#94a3b8', marginBottom: 8 },
  lineInput: {
    borderBottomWidth: 1, borderBottomColor: '#e2e8f0',
    paddingVertical: 8, fontSize: 15, color: '#1a293b', backgroundColor: 'transparent',
  },
});
