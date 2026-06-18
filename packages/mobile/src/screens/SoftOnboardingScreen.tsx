import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Animated,
  Image, Modal, ScrollView, Dimensions, KeyboardAvoidingView, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { navigate } from '../navigation';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const SOFT_ONBOARDING_STYLES = {
  colors: {
    primary: '#387bd5',
    primaryDark: '#1e5ab8',
    textMain: '#1a293b',
    textMuted: '#64748b',
    textSoft: '#94a3b8',
    border: '#e2e8f0',
    borderLight: 'rgba(56, 123, 213, 0.15)',
  },
  spacing: {
    topPadding: SCREEN_HEIGHT * 0.06,
    bottomPadding: SCREEN_HEIGHT * 0.04,
    subtitleMargin: SCREEN_HEIGHT * 0.03,
    healiHeight: Math.min(SCREEN_HEIGHT * 0.26, 280),
    bottomSectionTop: SCREEN_HEIGHT * 0.06,
  },
};

export default function SoftOnboardingScreen() {
  const [name, setName] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [errorText, setErrorText] = useState('');

  const titleAnim = useRef(new Animated.Value(0)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const healiAnim = useRef(new Animated.Value(0)).current;
  const bottomAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(100, [
      Animated.timing(titleAnim, { toValue: 1, duration: 600, useNativeDriver: false }),
      Animated.timing(subtitleAnim, { toValue: 1, duration: 600, useNativeDriver: false }),
      Animated.timing(healiAnim, { toValue: 1, duration: 600, useNativeDriver: false }),
      Animated.timing(bottomAnim, { toValue: 1, duration: 600, useNativeDriver: false }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -8, duration: 2000, useNativeDriver: false }),
        Animated.timing(floatAnim, { toValue: 0, duration: 2000, useNativeDriver: false }),
      ]),
    ).start();
  }, []);

  const slideFade = (anim: any) => ({
    opacity: anim,
    transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [15, 0] }) }],
  });

  const handleNameChange = (text: any) => {
    if (text.length <= 20) {
      setName(text);
      setErrorText('');
    }
  };

  const handleContinue = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setErrorText('Please enter your name');
      return;
    }
    if (trimmed.length < 3) {
      setErrorText('Name must be at least 3 characters');
      return;
    }
    if (trimmed.length > 20) {
      setErrorText('Name must be 20 characters or less');
      return;
    }
    if (!consentChecked) {
      setErrorText('Please accept the terms and conditions');
      return;
    }
    navigate('/personalisation');
  };

  const handleConsentPress = () => { setShowTermsModal(true); };
  const acceptTerms = () => { setConsentChecked(true); setShowTermsModal(false); setErrorText(''); };
  const rejectTerms = () => { setConsentChecked(false); setShowTermsModal(false); };

  const isNameValid = name.trim().length >= 3 && name.trim().length <= 20;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        {...{ keyboardShouldPersistTaps: 'handled' } as any}
      >
        {/* Top Gradient Section */}
        <View style={styles.topSection}>
          <LinearGradient
            colors={['#ffffff', '#e2effb', '#8db8f1']}
            locations={[0, 0.4, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />

          <Animated.Text style={[styles.title, slideFade(titleAnim)]}>Hi, I'm Heali</Animated.Text>
          <Animated.Text style={[styles.subtitle, slideFade(subtitleAnim)]}>AI-Powered Healing Partner</Animated.Text>

          <Animated.View style={[{ alignItems: 'center', marginBottom: 35 }, { opacity: healiAnim, transform: [{ translateY: slideFade(healiAnim).transform[0].translateY }, { translateY: floatAnim }] }]}>
            <Image source={require('../../assets/Heali.png')} style={styles.healiImg} resizeMode="contain" />
          </Animated.View>

          {/* Curved bottom edge */}
          <Svg
            height={35}
            width="100%"
            viewBox={`0 0 ${SCREEN_WIDTH} 35`}
            preserveAspectRatio="none"
            style={styles.curveSvg}
          >
            <Path
              d={`M0 35 L0 0 Q${SCREEN_WIDTH / 2} 35 ${SCREEN_WIDTH} 0 L${SCREEN_WIDTH} 35 Z`}
              fill="#ffffff"
            />
          </Svg>
        </View>

        {/* Bottom Section */}
        <Animated.View style={[styles.bottomSection, slideFade(bottomAnim)]}>
          <Text style={styles.questionText}>What should we call you?</Text>

          <TextInput
            style={[styles.inputField, errorText && name.trim().length < 3 && name.length > 0 && styles.inputError]}
            placeholder="Your name"
            placeholderTextColor={SOFT_ONBOARDING_STYLES.colors.textSoft}
            value={name}
            onChangeText={handleNameChange}
            autoCapitalize="words"
            maxLength={20}
          />

          <TouchableOpacity style={styles.consentRow} onPress={handleConsentPress} activeOpacity={0.7}>
            <View style={[styles.checkbox, consentChecked && styles.checkboxChecked]}>
              {consentChecked && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.consentText}>
              I confirm that I am 18 or older and agree to the{' '}
              <Text style={styles.consentLink} onPress={() => setShowTermsModal(true)}>Terms</Text>
              {' '}and{' '}
              <Text style={styles.consentLink} onPress={() => setShowTermsModal(true)}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}

          <TouchableOpacity
            style={[styles.btnPrimary, (!isNameValid || !consentChecked) && styles.btnDisabled]}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.btnPrimaryText}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginLink} onPress={() => navigate('/login')}>
            <Text style={styles.loginLinkText}>Already a member? <Text style={styles.loginLinkBold}>Login</Text></Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      {/* T&C Modal */}
      <Modal visible={showTermsModal} transparent animationType="slide" onRequestClose={() => setShowTermsModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Terms & Conditions</Text>
              <TouchableOpacity onPress={() => setShowTermsModal(false)} style={styles.modalCloseBtn}>
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              <Text style={styles.modalBodyText}>
                <Text style={styles.modalHeading}>1. Acceptance of Terms{'\n'}</Text>
                By accessing and using the TeleHealings platform, you accept and agree to be bound by the terms and provision of this agreement. By using TeleHealings, you confirm that you are at least 18 years of age.{'\n\n'}
                <Text style={styles.modalHeading}>2. Privacy Policy{'\n'}</Text>
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, protect, and share personal information.{'\n\n'}
                <Text style={styles.modalHeading}>3. User Conduct{'\n'}</Text>
                You agree to use our services only for lawful purposes.{'\n\n'}
                <Text style={styles.modalHeading}>4. Medical Disclaimer{'\n'}</Text>
                The content provided through TeleHealings is for informational purposes only and is not intended as a substitute for professional medical advice.
              </Text>
            </ScrollView>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.btnReject} onPress={rejectTerms}>
                <Text style={styles.btnRejectText}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnAccept} onPress={acceptTerms}>
                <Text style={styles.btnAcceptText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  scrollContent: { flexGrow: 1 },
  topSection: {
    paddingTop: SOFT_ONBOARDING_STYLES.spacing.topPadding,
    paddingBottom: 0,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  curveSvg: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
  },
  title: { fontSize: 26, fontWeight: '800', color: SOFT_ONBOARDING_STYLES.colors.primaryDark, marginBottom: 6, letterSpacing: -0.3 },
  subtitle: { fontSize: 14, fontWeight: '600', color: SOFT_ONBOARDING_STYLES.colors.primaryDark, marginBottom: SOFT_ONBOARDING_STYLES.spacing.subtitleMargin, letterSpacing: -0.1 },
  healiImg: { height: SOFT_ONBOARDING_STYLES.spacing.healiHeight, width: SOFT_ONBOARDING_STYLES.spacing.healiHeight },
  bottomSection: { flex: 1, paddingHorizontal: 30, paddingTop: SOFT_ONBOARDING_STYLES.spacing.bottomSectionTop, paddingBottom: 20 },
  questionText: { fontSize: 18, fontWeight: '600', color: '#334155', textAlign: 'center', marginBottom: 16 },
  inputField: {
    width: '100%', height: 56, paddingHorizontal: 24, borderWidth: 1,
    borderColor: SOFT_ONBOARDING_STYLES.colors.borderLight, borderRadius: 30,
    fontSize: 16, fontWeight: '500', color: SOFT_ONBOARDING_STYLES.colors.textMain,
    marginBottom: 24, backgroundColor: '#ffffff',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.02)', elevation: 2,
  },
  inputError: { borderColor: '#d93838' },
  consentRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 32 },
  checkbox: {
    width: 18, height: 18, borderWidth: 1.5, borderColor: '#cbd5e1', borderRadius: 6,
    alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', flexShrink: 0,
  },
  checkboxChecked: { backgroundColor: SOFT_ONBOARDING_STYLES.colors.primary, borderColor: SOFT_ONBOARDING_STYLES.colors.primary },
  checkmark: { fontSize: 12, color: '#ffffff', fontWeight: '700' },
  consentText: { fontSize: 12, fontWeight: '500', color: SOFT_ONBOARDING_STYLES.colors.textMuted, lineHeight: 17, flex: 1 },
  consentLink: { color: SOFT_ONBOARDING_STYLES.colors.primary, fontWeight: '600' },
  errorText: { textAlign: 'center', fontSize: 13, color: '#d93838', marginBottom: 16, fontStyle: 'italic' },
  btnPrimary: {
    backgroundColor: SOFT_ONBOARDING_STYLES.colors.primary, height: 56, borderRadius: 30,
    alignItems: 'center', justifyContent: 'center', marginBottom: 15,
  },
  btnDisabled: { opacity: 0.5 },
  btnPrimaryText: { color: '#ffffff', fontSize: 17, fontWeight: '600' },
  loginLink: { alignItems: 'center', marginTop: 10, marginBottom: 30 },
  loginLinkText: { fontSize: 14, fontWeight: '500', color: SOFT_ONBOARDING_STYLES.colors.textMuted },
  loginLinkBold: { color: SOFT_ONBOARDING_STYLES.colors.primary, fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#ffffff', height: '80%', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: SOFT_ONBOARDING_STYLES.colors.textMain },
  modalCloseBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#f1f5f9', alignItems: 'center', justifyContent: 'center' },
  modalCloseText: { fontSize: 16, color: SOFT_ONBOARDING_STYLES.colors.textMuted },
  modalBody: { flex: 1, marginBottom: 20 },
  modalBodyText: { fontSize: 14, lineHeight: 22, color: '#475569' },
  modalHeading: { fontWeight: '700', color: SOFT_ONBOARDING_STYLES.colors.textMain },
  modalActions: { flexDirection: 'row', gap: 12 },
  btnReject: { flex: 1, height: 50, borderRadius: 25, backgroundColor: '#f1f5f9', alignItems: 'center', justifyContent: 'center' },
  btnRejectText: { fontSize: 15, fontWeight: '600', color: '#475569' },
  btnAccept: { flex: 1, height: 50, borderRadius: 25, backgroundColor: SOFT_ONBOARDING_STYLES.colors.primary, alignItems: 'center', justifyContent: 'center' },
  btnAcceptText: { fontSize: 15, fontWeight: '600', color: '#ffffff' },
});
