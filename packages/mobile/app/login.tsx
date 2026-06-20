import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Image, ScrollView, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const COLORS = {
  primary: '#387bd5', primaryDark: '#1e5ab8', accent: '#2dd4bf',
  textMain: '#1a293b', textMuted: '#64748b', textSoft: '#94a3b8',
  border: '#e2e8f0', borderLight: 'rgba(56, 123, 213, 0.15)',
  white: '#ffffff', error: '#ef4444', success: '#22c55e',
  gradientStart: '#387bd5', gradientEnd: '#2dd4bf',
};

import api from '../api/client';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    if (!email.trim()) { setError('Please enter your email'); return; }
    if (!password.trim()) { setError('Please enter your password'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return; }

    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', { email: email.trim(), password });
      const { access_token, user } = res.data;
      localStorage.setItem('auth_token', access_token);
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userRole', user.role);
      router.replace('/home');
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Login failed. Please try again.';
      setError(Array.isArray(msg) ? msg.join(', ') : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={s.container}>
      <LinearGradient colors={[COLORS.gradientStart, COLORS.gradientEnd]} style={s.header}>
        <Animated.View style={[s.headerContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={s.headerTitle}>Welcome Back</Text>
          <Text style={s.headerSubtitle}>Sign in to continue your wellness journey</Text>
        </Animated.View>
        <Svg height="60" width={SCREEN_WIDTH} style={s.curve}>
          <Path d={`M0,60 L0,30 Q${SCREEN_WIDTH / 2},0 ${SCREEN_WIDTH},30 L${SCREEN_WIDTH},60 Z`} fill={COLORS.white} />
        </Svg>
      </LinearGradient>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.body}>
        <ScrollView contentContainerStyle={s.form} keyboardShouldPersistTaps="handled">
          {error ? (
            <View style={s.errorBanner}>
              <Text style={s.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={s.field}>
            <Text style={s.label}>Email</Text>
            <TextInput
              style={s.input}
              placeholder="Enter your email"
              placeholderTextColor={COLORS.textSoft}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={s.field}>
            <Text style={s.label}>Password</Text>
            <TextInput
              style={s.input}
              placeholder="Enter your password"
              placeholderTextColor={COLORS.textSoft}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity style={[s.btn, loading && s.btnDisabled]} onPress={handleLogin} disabled={loading}>
            <Text style={s.btnText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
          </TouchableOpacity>

          <View style={s.divider}>
            <View style={s.dividerLine} />
            <Text style={s.dividerText}>or</Text>
            <View style={s.dividerLine} />
          </View>

          <View style={s.linkRow}>
            <Text style={s.linkLabel}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/soft-onboarding')}>
              <Text style={s.link}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View style={s.linkRow}>
            <Text style={s.linkLabel}>Are you a therapist? </Text>
            <TouchableOpacity onPress={() => router.push('/therapist-register')}>
              <Text style={s.link}>Register here</Text>
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
  field: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.textMain, marginBottom: 8 },
  input: { borderWidth: 1.5, borderColor: COLORS.border, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: COLORS.textMain, backgroundColor: COLORS.white },
  btn: { backgroundColor: COLORS.primary, borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 8, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  dividerText: { marginHorizontal: 16, color: COLORS.textSoft, fontSize: 14 },
  linkRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 12 },
  linkLabel: { color: COLORS.textMuted, fontSize: 14 },
  link: { color: COLORS.primary, fontSize: 14, fontWeight: '600' },
});
