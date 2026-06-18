import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path, Polyline, Line, Circle } from 'react-native-svg';
import MedicalProfileLayout from '../components/MedicalProfileLayout';

interface QuestionBlockProps {
  title: string;
  selection: string;
  onSelect: (value: string) => void;
}

function QuestionBlock({ title, selection, onSelect }: QuestionBlockProps) {
  return (
    <View style={styles.questionBlock}>
      <Text style={styles.questionTitle}>{title}</Text>
      <View style={styles.binaryGroup}>
        <TouchableOpacity
          style={[styles.binaryBtn, selection === 'yes' && styles.binaryBtnSelected]}
          onPress={() => onSelect('yes')}
        >
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={selection === 'yes' ? '#2563eb' : '#334155'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <Circle cx="12" cy="12" r="10" />
            <Polyline points="8 12 11 15 16 9" />
          </Svg>
          <Text style={[styles.binaryBtnText, selection === 'yes' && styles.binaryBtnTextSelected]}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.binaryBtn, selection === 'no' && styles.binaryBtnSelected]}
          onPress={() => onSelect('no')}
        >
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={selection === 'no' ? '#2563eb' : '#334155'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <Circle cx="12" cy="12" r="10" />
            <Line x1="15" y1="9" x2="9" y2="15" />
            <Line x1="9" y1="9" x2="15" y2="15" />
          </Svg>
          <Text style={[styles.binaryBtnText, selection === 'no' && styles.binaryBtnTextSelected]}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function MedicalProfile4Screen() {
  const router = useRouter();

  const [selfHarmThoughts, setSelfHarmThoughts] = useState('');
  const [selfHarmHistory, setSelfHarmHistory] = useState('');
  const [harmOthers, setHarmOthers] = useState('');
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const hasRisk = selfHarmThoughts === 'yes' || selfHarmHistory === 'yes' || harmOthers === 'yes';

  const handleSave = () => {
    if (hasRisk) {
      setShowCrisisModal(true);
    } else {
      setShowSuccessModal(true);
      setTimeout(() => { setShowSuccessModal(false); router.push('/home' as any); }, 2000);
    }
  };

  const handleCrisisContinue = () => {
    setShowCrisisModal(false);
    setShowSuccessModal(true);
    setTimeout(() => { setShowSuccessModal(false); router.push('/home' as any); }, 2000);
  };

  return (
    <>
    <MedicalProfileLayout
      step={4}
      title="Risk & Safety"
      description="To provide you with the best care, we need to ask some sensitive questions about your safety. This information is kept confidential between you and your healthcare team."
      onSaveAndNext={handleSave}
    >
      {/* Info box */}
      <View style={styles.infoBox}>
        <View style={styles.infoBoxIcon}>
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="#2563eb" stroke="#2563eb" strokeWidth={2}>
            <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <Polyline points="9 12 11 14 15 10" stroke="#ffffff" fill="none" strokeWidth={2} />
          </Svg>
        </View>
        <View style={styles.infoBoxContent}>
          <Text style={styles.infoBoxTitle}>Confidentiality Commitment</Text>
          <Text style={styles.infoBoxText}>Your responses are encrypted and only accessible to your medical provider to ensure a safe treatment plan.</Text>
        </View>
      </View>

      <QuestionBlock title="Have you had thoughts of harming yourself?" selection={selfHarmThoughts} onSelect={setSelfHarmThoughts} />
      <QuestionBlock title="Any history of self-harm?" selection={selfHarmHistory} onSelect={setSelfHarmHistory} />
      <QuestionBlock title="Thoughts of harming others?" selection={harmOthers} onSelect={setHarmOthers} />
    </MedicalProfileLayout>

    {/* Crisis Modal */}
    <Modal visible={showCrisisModal} transparent animationType="fade" onRequestClose={() => {}}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={[styles.modalIcon, { backgroundColor: '#ef4444' }]}>
            <Svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2.5}>
              <Path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <Line x1="12" y1="9" x2="12" y2="13" />
              <Line x1="12" y1="17" x2="12.01" y2="17" />
            </Svg>
          </View>
          <Text style={styles.modalTitle}>We're Here to Help</Text>
          <Text style={styles.modalText}>Your responses indicate you may be going through a difficult time. Please know that help is available.</Text>
          <View style={styles.crisisBox}>
            <Text style={styles.crisisTitle}>Crisis Resources:</Text>
            <Text style={styles.crisisItem}>📞 iCall: 9152987821</Text>
            <Text style={styles.crisisItem}>📞 Vandrevala Foundation: 1860-2662-345</Text>
            <Text style={styles.crisisItem}>📞 AASRA: 91-9820466726</Text>
          </View>
          <Text style={styles.modalNote}>Your therapist will be notified and will reach out to you. Your safety is our priority.</Text>
          <TouchableOpacity style={styles.modalBtnPrimary} onPress={handleCrisisContinue}>
            <Text style={styles.modalBtnText}>I Understand</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

    {/* Success Modal */}
    <Modal visible={showSuccessModal} transparent animationType="fade" onRequestClose={() => {}}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={[styles.modalIcon, { backgroundColor: '#10b981' }]}>
            <Svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={3}>
              <Polyline points="20 6 9 17 4 12" />
            </Svg>
          </View>
          <Text style={styles.modalTitle}>Profile Saved!</Text>
          <Text style={styles.modalText}>Your medical profile has been successfully updated.</Text>
        </View>
      </View>
    </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  infoBox: {
    backgroundColor: '#e0e7ff', borderWidth: 1, borderColor: '#3b82f6', borderRadius: 12,
    padding: 16, flexDirection: 'row', gap: 12, marginBottom: 24, alignItems: 'flex-start',
  },
  infoBoxIcon: { marginTop: 2 },
  infoBoxContent: { flex: 1 },
  infoBoxTitle: { fontSize: 15, fontWeight: '700', color: '#000000', marginBottom: 6 },
  infoBoxText: { fontSize: 14, color: '#475569', lineHeight: 21 },
  questionBlock: { marginBottom: 20 },
  questionTitle: { fontSize: 16, fontWeight: '700', color: '#000000', marginBottom: 16 },
  binaryGroup: { flexDirection: 'row', gap: 12 },
  binaryBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1',
    backgroundColor: '#ffffff', color: '#334155',
  },
  binaryBtnSelected: {
    borderWidth: 2, borderColor: '#2563eb', backgroundColor: 'rgba(37,99,235,0.04)',
    padding: 11,
  },
  binaryBtnText: { fontSize: 15, fontWeight: '600', color: '#334155' },
  binaryBtnTextSelected: { color: '#2563eb' },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(15,23,42,0.6)',
    justifyContent: 'center', alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff', borderRadius: 20, padding: 32, alignItems: 'center',
    width: '85%', maxWidth: 340,
    shadowColor: '#000', shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1, shadowRadius: 25, elevation: 10,
  },
  modalIcon: {
    width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 4,
  },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#0f172a', marginBottom: 8 },
  modalText: { fontSize: 14, color: '#64748b', lineHeight: 21, textAlign: 'center', marginBottom: 16 },
  crisisBox: {
    backgroundColor: '#fef2f2', borderWidth: 1, borderColor: '#fecaca', borderRadius: 12,
    padding: 16, marginBottom: 20, alignSelf: 'stretch',
  },
  crisisTitle: { fontSize: 13, fontWeight: '700', color: '#991b1b', marginBottom: 8 },
  crisisItem: { fontSize: 13, color: '#7f1d1d', marginBottom: 4 },
  modalNote: { fontSize: 12, color: '#94a3b8', textAlign: 'center', marginBottom: 16 },
  modalBtnPrimary: {
    width: '100%', backgroundColor: '#387bd5', borderRadius: 25, paddingVertical: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
  },
  modalBtnText: { color: '#ffffff', fontSize: 15, fontWeight: '600' },
});
