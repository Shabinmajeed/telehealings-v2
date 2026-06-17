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
  Image as RNImage,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Icon = ({ d, size = 24, color = '#000', strokeWidth = 2 }: { d: string; size?: number; color?: string; strokeWidth?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d={d} />
  </Svg>
);

const ICONS = {
  back: 'M19 12H5M12 19l-7-7 7-7',
  phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z',
  email: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
  arrowRight: 'M5 12h14M12 5l7 7-7 7',
};

export default function VerifyScreen() {
  const router = useRouter();
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(0);
  const otpRefs = useRef<(TextInput | null)[]>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(15)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start();
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  const formatPhone = (text: string) => {
    const digits = text.replace(/\D/g, '');
    const match = digits.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    if (!match) return '';
    return !match[2] ? match[1] : `${match[1]} ${match[2]}${match[3] ? ' ' + match[3] : ''}`;
  };

  const handlePhoneChange = (text: string) => {
    setPhone(formatPhone(text));
  };

  const handleSendCode = () => {
    const val = method === 'phone' ? phone.trim() : email.trim();
    if (!val) return;
    setShowOtp(true);
    setResendTimer(30);
    setTimeout(() => otpRefs.current[0]?.focus(), 400);
  };

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text.length === 1 && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && otp[index] === '' && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < 6) {
      otpRefs.current[0]?.focus();
      return;
    }
    router.push('/profile-completion' as any);
  };

  const handleResend = () => {
    setResendTimer(30);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Header with gradient + curve */}
        <View style={styles.topSection}>
          <LinearGradient colors={['#e7f2ff', '#2366bd']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={StyleSheet.absoluteFillObject} />
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Icon d={ICONS.back} size={24} color="#ffffff" strokeWidth={2.5} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Verification</Text>
            <View style={styles.headerHeali}>
              <RNImage source={require('../assets/Heali.png')} style={styles.healiImg} resizeMode="contain" />
            </View>
          </View>
          <Text style={styles.headerSubtitle}>We will send you a one-time password to verify your account.</Text>
          {/* Bottom curve */}
          <Svg height={35} width="100%" viewBox={`0 0 ${SCREEN_WIDTH} 35`} preserveAspectRatio="none" style={styles.curveSvg}>
            <Path d={`M0 35 L0 0 Q${SCREEN_WIDTH / 2} 35 ${SCREEN_WIDTH} 0 L${SCREEN_WIDTH} 35 Z`} fill="#ffffff" />
          </Svg>
        </View>

        {/* Form */}
        <Animated.View style={[styles.formSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          {/* Method Toggle */}
          <Text style={styles.inputLabel}>Select Verification Method</Text>
          <View style={styles.methodToggle}>
            <TouchableOpacity
              style={[styles.methodBtn, method === 'phone' && styles.methodBtnActive]}
              onPress={() => setMethod('phone')}
            >
              <Icon d={ICONS.phone} size={18} color={method === 'phone' ? '#3b82f6' : '#64748b'} strokeWidth={2} />
              <Text style={[styles.methodBtnText, method === 'phone' && styles.methodBtnTextActive]}>Phone</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.methodBtn, method === 'email' && styles.methodBtnActive]}
              onPress={() => setMethod('email')}
            >
              <Icon d={ICONS.email} size={18} color={method === 'email' ? '#3b82f6' : '#64748b'} strokeWidth={2} />
              <Text style={[styles.methodBtnText, method === 'email' && styles.methodBtnTextActive]}>Email</Text>
            </TouchableOpacity>
          </View>

          {/* Phone Input */}
          {method === 'phone' && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={styles.phoneInputGroup}>
                <View style={styles.countrySelect}>
                  <Text style={styles.countryCode}>🇮🇳 +91</Text>
                  <Icon d="M6 9l6 6 6-6" size={16} color="#64748b" strokeWidth={2.5} />
                </View>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="000 000 0000"
                  placeholderTextColor="#637b96"
                  value={phone}
                  onChangeText={handlePhoneChange}
                  keyboardType="phone-pad"
                  maxLength={12}
                />
              </View>
            </View>
          )}

          {/* Email Input */}
          {method === 'email' && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.emailInput}
                placeholder="Enter your email address"
                placeholderTextColor="#637b96"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          )}

          {/* OTP Section */}
          {showOtp && (
            <View style={styles.otpSection}>
              <Text style={styles.inputLabel}>Enter 6-Digit Code</Text>
              <View style={styles.otpInputs}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => { otpRefs.current[index] = ref; }}
                    style={styles.otpBox}
                    value={digit}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    onKeyPress={({ nativeEvent }) => handleOtpKeyPress(nativeEvent.key, index)}
                    keyboardType="numeric"
                    maxLength={1}
                    textAlign="center"
                  />
                ))}
              </View>
              <View style={styles.otpResend}>
                {resendTimer > 0 ? (
                  <Text style={styles.otpResendText}>Didn't receive the code? Resend in {resendTimer}s</Text>
                ) : (
                  <Text style={styles.otpResendText}>
                    Didn't receive the code? <Text style={styles.otpResendLink} onPress={handleResend}>Resend</Text>
                  </Text>
                )}
              </View>
            </View>
          )}

          {/* Action Button */}
          <TouchableOpacity style={styles.btnPrimary} onPress={showOtp ? handleVerify : handleSendCode} activeOpacity={0.8}>
            <Text style={styles.btnPrimaryText}>{showOtp ? 'Verify' : 'Send Code'}</Text>
            <Icon d={ICONS.arrowRight} size={20} color="#ffffff" strokeWidth={2.5} />
          </TouchableOpacity>

          {/* Support */}
          <Text style={styles.supportText}>
            Having trouble? <Text style={styles.supportLink}>Contact Support</Text>
          </Text>
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
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  curveSvg: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
  },
  healiImg: {
    width: 36,
    height: 36,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    zIndex: 1,
  },
  backBtn: {
    width: 40,
    alignItems: 'flex-start',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  headerHeali: {
    width: 40,
    alignItems: 'flex-end',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
    paddingBottom: 20,
    zIndex: 1,
  },
  formSection: {
    flex: 1,
    padding: 24,
    paddingBottom: 32,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
  },
  methodToggle: {
    flexDirection: 'row',
    gap: 10,
  },
  methodBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
    borderRadius: 16,
    backgroundColor: '#f8fafc',
  },
  methodBtnActive: {
    backgroundColor: '#ffffff',
    borderColor: '#3b82f6',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  methodBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  methodBtnTextActive: {
    color: '#3b82f6',
  },
  inputGroup: {
    marginTop: 20,
    marginBottom: 32,
  },
  phoneInputGroup: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  countrySelect: {
    width: 96,
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#f8fafc',
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a293b',
  },
  emailInput: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '500',
    color: '#1a293b',
    backgroundColor: '#f8fafc',
  },
  phoneInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: '500',
    color: '#1a293b',
    backgroundColor: '#f8fafc',
  },
  otpSection: {
    marginBottom: 24,
  },
  otpInputs: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  otpBox: {
    flex: 1,
    minWidth: 0,
    height: 52,
    backgroundColor: 'rgba(59,130,246,0.05)',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    color: '#1a293b',
  },
  otpResend: {
    marginTop: 12,
    alignItems: 'center',
  },
  otpResendText: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
  },
  otpResendLink: {
    color: '#387bd5',
    fontWeight: '600',
  },
  btnPrimary: {
    width: '100%',
    backgroundColor: '#387bd5',
    borderRadius: 25,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
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
  supportText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
    paddingBottom: 24,
  },
  supportLink: {
    color: '#000000',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
