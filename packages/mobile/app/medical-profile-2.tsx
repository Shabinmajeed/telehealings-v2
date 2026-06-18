import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Polyline } from 'react-native-svg';
import MedicalProfileLayout from '../components/MedicalProfileLayout';

export default function MedicalProfile2Screen() {
  const router = useRouter();

  const [bringsYou, setBringsYou] = useState('');
  const [howLong, setHowLong] = useState('');
  const [affecting, setAffecting] = useState('');
  const [expectations, setExpectations] = useState('');

  const showCheck = (value: string) => value.trim().length >= 10;

  return (
    <MedicalProfileLayout
      step={2}
      title="Presenting Concerns"
      description="Please provide detailed information about your current situation to help us match you with the right therapist."
      onSaveAndNext={() => router.push('/medical-profile-3' as any)}
    >
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
    </MedicalProfileLayout>
  );
}

const styles = StyleSheet.create({
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
});
