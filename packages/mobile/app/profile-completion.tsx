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
  check: 'M20 6L9 17l-4-4',
  calendar: 'M3 4h18v18H3z M16 2v4 M8 2v4 M3 10h18',
  camera: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  chevronDown: 'M6 9l6 6 6-6',
};

const OCCUPATIONS = ['Student', 'Employed', 'Unemployed'];
const MARITAL_STATUSES = ['Single', 'Married', 'Divorced', 'Widowed'];

export default function ProfileCompletionScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('male');
  const [occupation, setOccupation] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(15)).current;

  // Inline date picker state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDay, setTempDay] = useState(1);
  const [tempMonth, setTempMonth] = useState(0);
  const [tempYear, setTempYear] = useState(2000);
  const [confirmedDay, setConfirmedDay] = useState(1);
  const [confirmedMonth, setConfirmedMonth] = useState(0);
  const [confirmedYear, setConfirmedYear] = useState(0); // 0 = not set yet

  const [showOccupationPicker, setShowOccupationPicker] = useState(false);
  const [showMaritalPicker, setShowMaritalPicker] = useState(false);

  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const YEARS = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start();
  }, []);

  const validateField = (field: string, value: string) => {
    let isValid = false;
    switch (field) {
      case 'fullName': isValid = value.trim().length >= 2; break;
      case 'email': isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); break;
      case 'dob': isValid = !!value; break;
      case 'occupation': isValid = !!value; break;
      case 'marital': isValid = !!value; break;
    }
    return isValid;
  };

  const handleBlur = (field: string, value: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const isValid = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: !isValid }));
  };

  const handleSave = async () => {
    const guestId = localStorage.getItem('guestId');
    if (guestId) {
      try {
        const fullNameParts = fullName.trim().split(' ');
        await fetch(`${API_BASE}/guest/${guestId}/profile`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: fullNameParts[0] || '',
            lastName: fullNameParts.slice(1).join(' ') || '',
            email,
            dob: confirmedDay && confirmedMonth !== null && confirmedYear
              ? `${confirmedDay.toString().padStart(2, '0')}/${(confirmedMonth + 1).toString().padStart(2, '0')}/${confirmedYear}`
              : '',
            gender,
            occupation,
            maritalStatus,
          }),
        });
      } catch (e) {
        // Continue even if API fails
      }
    }
    router.push('/contact-details' as any);
  };

  const showError = (_field: string) => false;

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
            <View style={styles.headerTitles}>
              <Text style={styles.headerTitle}>Setup Profile</Text>
              <Text style={styles.headerSubtitle}>Tell us a bit more about yourself.</Text>
            </View>
            <View style={styles.mascot}>
              <Image source={require('../assets/Heali.png')} style={styles.mascotImg} resizeMode="contain" />
            </View>
          </View>
          {/* Stepper */}
          <View style={styles.stepper}>
            <View style={[styles.step, styles.stepActive]} />
            <View style={styles.step} />
          </View>
          {/* Bottom curve */}
          <Svg height={35} width="100%" viewBox={`0 0 ${SCREEN_WIDTH} 35`} preserveAspectRatio="none" style={styles.curveSvg}>
            <Path d={`M0 35 L0 0 Q${SCREEN_WIDTH / 2} 35 ${SCREEN_WIDTH} 0 L${SCREEN_WIDTH} 35 Z`} fill="#ffffff" />
          </Svg>
        </View>

        {/* Form */}
        <Animated.View style={[styles.formSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          {/* Avatar Upload */}
          <View style={styles.avatarUpload}>
            <View style={styles.avatarCircle}>
              <Icon d={ICONS.user} size={48} color="#cbd5e1" strokeWidth={1.5} />
            </View>
            <View style={styles.cameraBtn}>
              <Icon d={ICONS.camera} size={16} color="#ffffff" strokeWidth={2.5} />
            </View>
          </View>

          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name *</Text>
            <TextInput
              style={[styles.customInput, showError('fullName') && styles.inputInvalid]}
              placeholder="Enter your full name"
              placeholderTextColor="#94a3b8"
              value={fullName}
              onChangeText={setFullName}
              onBlur={() => handleBlur('fullName', fullName)}
            />
            {touched['fullName'] && !errors['fullName'] && fullName.length >= 2 && (
              <View style={styles.fieldStatus}>
                <Icon d={ICONS.check} size={18} color="#10b981" strokeWidth={2.5} />
              </View>
            )}
            {showError('fullName') && <Text style={styles.fieldError}>Please enter your full name</Text>}
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address *</Text>
            <TextInput
              style={[styles.customInput, showError('email') && styles.inputInvalid]}
              placeholder="Enter your email address"
              placeholderTextColor="#94a3b8"
              value={email}
              onChangeText={setEmail}
              onBlur={() => handleBlur('email', email)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched['email'] && !errors['email'] && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
              <View style={styles.fieldStatus}>
                <Icon d={ICONS.check} size={18} color="#10b981" strokeWidth={2.5} />
              </View>
            )}
            {showError('email') && <Text style={styles.fieldError}>Please enter a valid email address</Text>}
          </View>

          {/* Date of Birth - Inline Picker */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Date Of Birth *</Text>
            <View style={styles.nativeSelectWrapper}>
              <TouchableOpacity
                style={[styles.customInput, styles.selectInput, showError('dob') && styles.inputInvalid]}
                onPress={() => {
                  if (showDatePicker) {
                    // Confirm selection on close
                    const day = String(tempDay).padStart(2, '0');
                    const month = String(tempMonth + 1).padStart(2, '0');
                    setDob(`${day} / ${month} / ${tempYear}`);
                    setConfirmedDay(tempDay);
                    setConfirmedMonth(tempMonth);
                    setConfirmedYear(tempYear);
                    handleBlur('dob', `${day} / ${month} / ${tempYear}`);
                  } else {
                    // Open: init temp from confirmed values if set
                    if (confirmedYear !== 0) {
                      setTempDay(confirmedDay);
                      setTempMonth(confirmedMonth);
                      setTempYear(confirmedYear);
                    } else {
                      setTempDay(1);
                      setTempMonth(0);
                      setTempYear(2000);
                    }
                  }
                  setShowDatePicker(!showDatePicker);
                  setShowOccupationPicker(false);
                  setShowMaritalPicker(false);
                }}
              >
                <Text style={[styles.selectText, !dob && styles.selectPlaceholder]}>
                  {dob || 'DD / MM / YYYY'}
                </Text>
                <View style={[styles.selectArrow, showDatePicker && styles.selectArrowUp]}>
                  <Icon d={ICONS.chevronDown} size={18} color="#94a3b8" strokeWidth={2.5} />
                </View>
              </TouchableOpacity>
            </View>
            {/* Inline picker dropdown */}
            {showDatePicker && (
              <View style={styles.inlineDatePicker}>
                <View style={styles.pickerRow}>
                  {/* Day */}
                  <View style={styles.pickerCol}>
                    <Text style={styles.pickerLabel}>Day</Text>
                    <ScrollView style={styles.pickerScroll} showsVerticalScrollIndicator={false}>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                        <TouchableOpacity
                          key={d}
                          style={[styles.pickerItem, tempDay === d && styles.pickerItemActive]}
                          onPress={() => setTempDay(d)}
                        >
                          <Text style={[styles.pickerItemText, tempDay === d && styles.pickerItemTextActive]}>{d}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                  {/* Month */}
                  <View style={styles.pickerCol}>
                    <Text style={styles.pickerLabel}>Month</Text>
                    <ScrollView style={styles.pickerScroll} showsVerticalScrollIndicator={false}>
                      {MONTHS.map((m, i) => (
                        <TouchableOpacity
                          key={m}
                          style={[styles.pickerItem, tempMonth === i && styles.pickerItemActive]}
                          onPress={() => setTempMonth(i)}
                        >
                          <Text style={[styles.pickerItemText, tempMonth === i && styles.pickerItemTextActive]}>{m}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                  {/* Year */}
                  <View style={styles.pickerCol}>
                    <Text style={styles.pickerLabel}>Year</Text>
                    <ScrollView style={styles.pickerScroll} showsVerticalScrollIndicator={false}>
                      {YEARS.map((y) => (
                        <TouchableOpacity
                          key={y}
                          style={[styles.pickerItem, tempYear === y && styles.pickerItemActive]}
                          onPress={() => setTempYear(y)}
                        >
                          <Text style={[styles.pickerItemText, tempYear === y && styles.pickerItemTextActive]}>{y}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </View>
              </View>
            )}
            {showError('dob') && <Text style={styles.fieldError}>Please select your date of birth</Text>}
          </View>

          {/* Gender */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Gender *</Text>
            <View style={styles.segmentedControl}>
              {(['male', 'female', 'other'] as const).map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[styles.segmentBtn, gender === g && styles.segmentBtnActive]}
                  onPress={() => setGender(g)}
                >
                  <Text style={styles.segmentIcon}>
                    {g === 'male' ? '♂' : g === 'female' ? '♀' : '⚧'}
                  </Text>
                  <Text style={[styles.segmentBtnText, gender === g && styles.segmentBtnTextActive]}>
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Occupation */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Occupation *</Text>
            <TouchableOpacity
              style={[styles.customInput, styles.selectInput, showError('occupation') && styles.inputInvalid]}
              onPress={() => {
                setShowOccupationPicker(!showOccupationPicker);
                setShowMaritalPicker(false);
                setShowDatePicker(false);
              }}
            >
              <Text style={[styles.selectText, !occupation && styles.selectPlaceholder]}>
                {occupation || 'Select'}
              </Text>
              <View style={[styles.selectArrow, showOccupationPicker && styles.selectArrowUp]}>
                <Icon d={ICONS.chevronDown} size={18} color="#94a3b8" strokeWidth={2.5} />
              </View>
            </TouchableOpacity>
            {touched['occupation'] && !errors['occupation'] && occupation ? (
              <View style={styles.fieldStatus}>
                <Icon d={ICONS.check} size={18} color="#10b981" strokeWidth={2.5} />
              </View>
            ) : null}
            {showError('occupation') && <Text style={styles.fieldError}>Please select your occupation</Text>}
            {showOccupationPicker && (
              <View style={styles.dropdownMenu}>
                {OCCUPATIONS.map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={[styles.dropdownItem, occupation === item && styles.dropdownItemActive]}
                    onPress={() => {
                      setOccupation(item);
                      setShowOccupationPicker(false);
                      setTouched(prev => ({ ...prev, occupation: true }));
                      setErrors(prev => ({ ...prev, occupation: false }));
                    }}
                  >
                    <Text style={[styles.dropdownItemText, occupation === item && styles.dropdownItemTextActive]}>{item}</Text>
                    {occupation === item && <Icon d={ICONS.check} size={16} color="#3b82f6" strokeWidth={2.5} />}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Marital Status */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Marital Status *</Text>
            <TouchableOpacity
              style={[styles.customInput, styles.selectInput, showError('marital') && styles.inputInvalid]}
              onPress={() => {
                setShowMaritalPicker(!showMaritalPicker);
                setShowOccupationPicker(false);
                setShowDatePicker(false);
              }}
            >
              <Text style={[styles.selectText, !maritalStatus && styles.selectPlaceholder]}>
                {maritalStatus || 'Select'}
              </Text>
              <View style={[styles.selectArrow, showMaritalPicker && styles.selectArrowUp]}>
                <Icon d={ICONS.chevronDown} size={18} color="#94a3b8" strokeWidth={2.5} />
              </View>
            </TouchableOpacity>
            {touched['marital'] && !errors['marital'] && maritalStatus ? (
              <View style={styles.fieldStatus}>
                <Icon d={ICONS.check} size={18} color="#10b981" strokeWidth={2.5} />
              </View>
            ) : null}
            {showError('marital') && <Text style={styles.fieldError}>Please select your marital status</Text>}
            {showMaritalPicker && (
              <View style={styles.dropdownMenu}>
                {MARITAL_STATUSES.map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={[styles.dropdownItem, maritalStatus === item && styles.dropdownItemActive]}
                    onPress={() => {
                      setMaritalStatus(item);
                      setShowMaritalPicker(false);
                      setTouched(prev => ({ ...prev, marital: true }));
                      setErrors(prev => ({ ...prev, marital: false }));
                    }}
                  >
                    <Text style={[styles.dropdownItemText, maritalStatus === item && styles.dropdownItemTextActive]}>{item}</Text>
                    {maritalStatus === item && <Icon d={ICONS.check} size={16} color="#3b82f6" strokeWidth={2.5} />}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.btnPrimary} onPress={handleSave} activeOpacity={0.8}>
            <Text style={styles.btnPrimaryText}>Save & Next</Text>
            <Icon d={ICONS.arrowRight} size={20} color="#ffffff" strokeWidth={2.5} />
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
  headerTitles: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '600',
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
  avatarUpload: {
    alignSelf: 'center',
    position: 'relative',
    marginTop: 5,
    marginBottom: 20,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f8fafc',
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: '#cbd5e1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  inputGroup: {
    position: 'relative',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: '#64748b',
    marginBottom: 6,
  },
  customInput: {
    width: '100%',
    height: 56,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingRight: 44,
    fontSize: 16,
    fontWeight: '500',
    color: '#1a293b',
  },
  inputInvalid: {
    borderColor: '#ef4444',
  },
  fieldStatus: {
    position: 'absolute',
    right: 16,
    top: 36,
  },
  fieldError: {
    fontSize: 11,
    color: '#ef4444',
    marginTop: 4,
    marginLeft: 4,
  },
  dateInput: {
    justifyContent: 'center',
    paddingRight: 44,
  },
  calendarIcon: {
    position: 'absolute',
    right: 16,
    top: 40,
    pointerEvents: 'none',
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#f4f8fd',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    height: 56,
    padding: 4,
  },
  segmentBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 6,
  },
  segmentBtnActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  segmentIcon: {
    fontSize: 16,
  },
  segmentBtnText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#475569',
  },
  segmentBtnTextActive: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  selectWrapper: {
    position: 'relative',
  },
  selectInput: {
    justifyContent: 'center',
  },
  selectText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a293b',
  },
  selectPlaceholder: {
    color: '#94a3b8',
    fontWeight: '400',
  },
  selectArrow: {
    position: 'absolute',
    right: 16,
    top: 19,
    pointerEvents: 'none',
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
    marginTop: 32,
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
  // Date Picker Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a293b',
    textAlign: 'center',
    marginBottom: 20,
  },
  pickerRow: {
    flexDirection: 'row',
    gap: 12,
  },
  pickerCol: {
    flex: 1,
  },
  pickerLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 8,
  },
  pickerScroll: {
    height: 200,
  },
  pickerItem: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    borderRadius: 8,
  },
  pickerItemActive: {
    backgroundColor: '#eff6ff',
  },
  pickerItemText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1a293b',
  },
  pickerItemTextActive: {
    color: '#3b82f6',
    fontWeight: '700',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  modalCancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#475569',
  },
  modalConfirmBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 25,
    backgroundColor: '#387bd5',
    alignItems: 'center',
    shadowColor: '#387bd5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  modalConfirmText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  pickerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 4,
  },
  pickerOptionActive: {
    backgroundColor: '#eff6ff',
  },
  pickerOptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a293b',
  },
  pickerOptionTextActive: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  // Dropdown styles
  dropdownGroup: {
    zIndex: 10,
  },
  dropdownMenu: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  dropdownItemActive: {
    backgroundColor: '#eff6ff',
  },
  dropdownItemText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1a293b',
  },
  dropdownItemTextActive: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  selectArrowUp: {
    transform: [{ rotate: '180deg' }],
  },
  nativeSelectWrapper: {
    position: 'relative',
  },
  inlineDatePicker: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginTop: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
});
