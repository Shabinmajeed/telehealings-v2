import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, ScrollView, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const COLORS = {
  primary: '#387bd5', primaryDark: '#1e5ab8', accent: '#2dd4bf',
  textMain: '#1a293b', textMuted: '#64748b', textSoft: '#94a3b8',
  border: '#e2e8f0', white: '#ffffff', error: '#ef4444',
  gradientStart: '#387bd5', gradientEnd: '#2dd4bf',
};

import api from '../api/client';

const SPECIALIZATIONS = ['Anxiety', 'Depression', 'Trauma', 'Relationships', 'Addiction', 'Eating Disorders', 'Stress Management', 'Grief'];

export default function TherapistRegisterScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [experience, setExperience] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleRegister = async () => {
    if (!firstName.trim()) { setError('Please enter your first name'); return; }
    if (!lastName.trim()) { setError('Please enter your last name'); return; }
    if (!email.trim()) { setError('Please enter your email'); return; }
    if (!password.trim() || password.length < 8) { setError('Password must be at least 8 characters'); return; }
    if (!selectedSpec) { setError('Please select a specialization'); return; }

    setLoading(true);
    setError('');

    try {
      await api.post('/therapist/register', {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,
        specialization: selectedSpec,
        bio: bio.trim(),
        experience: parseInt(experience, 10) || 0,
      });
      setSuccess(true);
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(Array.isArray(msg) ? msg.join(', ') : msg);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <View style={s.container}>
        <LinearGradient colors={[COLORS.gradientStart, COLORS.gradientEnd]} style={s.successHeader}>
          <Animated.View style={[s.successContent, { opacity: fadeAnim }]}>
            <Text style={s.successIcon}>✓</Text>
            <Text style={s.successTitle}>Registration Submitted!</Text>
            <Text style={s.successText}>Your therapist account is pending admin approval. You'll receive an email once approved.</Text>
            <TouchableOpacity style={s.successBtn} onPress={() => router.replace('/login')}>
              <Text style={s.successBtnText}>Go to Login</Text>
            </TouchableOpacity>
          </Animated.View>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <LinearGradient colors={[COLORS.gradientStart, COLORS.gradientEnd]} style={s.header}>
        <Animated.View style={[s.headerContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={s.headerTitle}>Join as Therapist</Text>
          <Text style={s.headerSubtitle}>Help people on their wellness journey</Text>
        </Animated.View>
        <Svg height="60" width={SCREEN_WIDTH} style={s.curve}>
          <Path d={`M0,60 L0,30 Q${SCREEN_WIDTH / 2},0 ${SCREEN_WIDTH},30 L${SCREEN_WIDTH},60 Z`} fill={COLORS.white} />
        </Svg>
      </LinearGradient>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.body}>
        <ScrollView contentContainerStyle={s.form} keyboardShouldPersistTaps="handled">
          {error ? (
            <View style={s.errorBanner}><Text style={s.errorText}>{error}</Text></View>
          ) : null}

          <View style={s.row}>
            <View style={[s.field, { flex: 1, marginRight: 8 }]}>
              <Text style={s.label}>First Name</Text>
              <TextInput style={s.input} placeholder="Jane" placeholderTextColor={COLORS.textSoft} value={firstName} onChangeText={setFirstName} />
            </View>
            <View style={[s.field, { flex: 1, marginLeft: 8 }]}>
              <Text style={s.label}>Last Name</Text>
              <TextInput style={s.input} placeholder="Smith" placeholderTextColor={COLORS.textSoft} value={lastName} onChangeText={setLastName} />
            </View>
          </View>

          <View style={s.field}>
            <Text style={s.label}>Email</Text>
            <TextInput style={s.input} placeholder="dr.smith@example.com" placeholderTextColor={COLORS.textSoft} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          </View>

          <View style={s.field}>
            <Text style={s.label}>Password</Text>
            <TextInput style={s.input} placeholder="Min 8 characters" placeholderTextColor={COLORS.textSoft} value={password} onChangeText={setPassword} secureTextEntry />
          </View>

          <View style={s.field}>
            <Text style={s.label}>Specialization</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.specScroll}>
              {SPECIALIZATIONS.map((spec) => (
                <TouchableOpacity key={spec} style={[s.specChip, selectedSpec === spec && s.specChipActive]} onPress={() => setSelectedSpec(spec)}>
                  <Text style={[s.specChipText, selectedSpec === spec && s.specChipTextActive]}>{spec}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={s.field}>
            <Text style={s.label}>Years of Experience</Text>
            <TextInput style={s.input} placeholder="10" placeholderTextColor={COLORS.textSoft} value={experience} onChangeText={setExperience} keyboardType="numeric" />
          </View>

          <View style={s.field}>
            <Text style={s.label}>Bio (optional)</Text>
            <TextInput style={[s.input, s.textArea]} placeholder="Tell us about your approach..." placeholderTextColor={COLORS.textSoft} value={bio} onChangeText={setBio} multiline numberOfLines={3} />
          </View>

          <TouchableOpacity style={[s.btn, loading && s.btnDisabled]} onPress={handleRegister} disabled={loading}>
            <Text style={s.btnText}>{loading ? 'Submitting...' : 'Register'}</Text>
          </TouchableOpacity>

          <View style={s.linkRow}>
            <Text style={s.linkLabel}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={s.link}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { paddingTop: SCREEN_HEIGHT * 0.06, paddingBottom: 70, alignItems: 'center', justifyContent: 'center' },
  headerContent: { alignItems: 'center', paddingHorizontal: 24 },
  headerTitle: { fontSize: 28, fontWeight: '700', color: COLORS.white, marginBottom: 8 },
  headerSubtitle: { fontSize: 15, color: 'rgba(255,255,255,0.85)', textAlign: 'center' },
  curve: { position: 'absolute', bottom: 0, left: 0 },
  body: { flex: 1 },
  form: { padding: 24, paddingTop: 32 },
  errorBanner: { backgroundColor: '#fef2f2', borderColor: '#fecaca', borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 20 },
  errorText: { color: COLORS.error, fontSize: 14, textAlign: 'center' },
  row: { flexDirection: 'row' },
  field: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.textMain, marginBottom: 8 },
  input: { borderWidth: 1.5, borderColor: COLORS.border, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: COLORS.textMain, backgroundColor: COLORS.white },
  textArea: { height: 80, textAlignVertical: 'top' },
  specScroll: { flexDirection: 'row' },
  specChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1.5, borderColor: COLORS.border, marginRight: 8, marginBottom: 8 },
  specChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  specChipText: { fontSize: 13, color: COLORS.textMuted, fontWeight: '500' },
  specChipTextActive: { color: COLORS.white },
  btn: { backgroundColor: COLORS.primary, borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 8, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  linkRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  linkLabel: { color: COLORS.textMuted, fontSize: 14 },
  link: { color: COLORS.primary, fontSize: 14, fontWeight: '600' },
  successHeader: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  successContent: { alignItems: 'center' },
  successIcon: { fontSize: 64, color: COLORS.white, marginBottom: 16 },
  successTitle: { fontSize: 24, fontWeight: '700', color: COLORS.white, marginBottom: 12 },
  successText: { fontSize: 15, color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginBottom: 24, lineHeight: 22 },
  successBtn: { backgroundColor: COLORS.white, borderRadius: 14, paddingVertical: 14, paddingHorizontal: 32 },
  successBtnText: { color: COLORS.primary, fontSize: 16, fontWeight: '700' },
});
