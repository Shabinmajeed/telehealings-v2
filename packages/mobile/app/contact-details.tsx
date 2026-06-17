import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Animated,
  ScrollView, KeyboardAvoidingView, Platform, Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Icon = ({ d, size = 24, color = '#000', strokeWidth = 2, fill = 'none' }: { d: string; size?: number; color?: string; strokeWidth?: number; fill?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d={d} />
  </Svg>
);

const ICONS = {
  back: 'M19 12H5M12 19l-7-7 7-7',
  check: 'M20 6L9 17 4 12',
  info: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01',
  mapPin: 'M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z',
  arrowRight: 'M5 12h14M12 5l7 7-7 7',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z',
  email: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
  verified: 'M12 2l3.09 2.26L19 5l-.54 3.76L21 12l-2.54 3.24L19 19l-3.91.74L12 22l-3.09-2.26L5 19l.54-3.76L3 12l2.54-3.24L5 5l3.91-.74L12 2z',
};

const API_BASE = 'https://submit-avoiding-contributing-guards.trycloudflare.com';

export default function ContactDetailsScreen() {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [ecName, setEcName] = useState('');
  const [ecPhone, setEcPhone] = useState('');
  const [ecRelation, setEcRelation] = useState('');
  const [showRelationDropdown, setShowRelationDropdown] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(15)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const RELATIONSHIPS = ['Parent', 'Spouse', 'Sibling', 'Friend'];

  const validateField = (field: string, value: string) => {
    let isValid = false;
    switch (field) {
      case 'address': isValid = value.trim().length >= 3; break;
      case 'ecName': isValid = value.trim().length >= 2; break;
      case 'ecPhone': isValid = value.trim().length >= 7; break;
      case 'ecRelation': isValid = value !== ''; break;
    }
    return isValid;
  };

  const handleBlur = (field: string, value: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({ ...prev, [field]: !validateField(field, value) }));
  };

  const handleSave = async () => {
    const fields = { address, ecName, ecPhone, ecRelation };
    const newTouched: Record<string, boolean> = {};
    const newErrors: Record<string, boolean> = {};
    let allValid = true;

    Object.entries(fields).forEach(([key, value]) => {
      newTouched[key] = true;
      const isValid = validateField(key, value);
      newErrors[key] = !isValid;
      if (!isValid) allValid = false;
    });

    setTouched(newTouched);
    setErrors(newErrors);

    if (!allValid) return;

    try {
      const guestId = localStorage.getItem('guestId');
      if (guestId) {
        // Save contact details
        await fetch(`${API_BASE}/guest/${guestId}/profile`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            address,
            emergencyName: ecName,
            emergencyPhone: ecPhone,
            emergencyRelation: ecRelation,
          }),
        });
        // Convert guest to full user
        await fetch(`${API_BASE}/guest/${guestId}/convert`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        });
      }
    } catch (e) {
      // Continue even if API fails
    }

    // Clear stored guest ID
    try { localStorage.removeItem('guestId'); } catch (e) {}

    router.push('/profile-success');
  };

  const getInputStyle = (field: string) => [
    styles.customInput,
    touched[field] && !errors[field] && styles.inputValid,
    touched[field] && errors[field] && styles.inputInvalid,
  ];

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
              <Text style={styles.headerTitle}>Contact Information</Text>
              <Text style={styles.headerSubtitle}>Please provide your contact info.</Text>
            </View>
            <View style={styles.mascot} />
          </View>
          {/* Stepper */}
          <View style={styles.stepper}>
            <View style={[styles.step, styles.stepInactive]} />
            <View style={[styles.step, styles.stepActive]} />
          </View>
          {/* Curve */}
          <Svg height={35} width="100%" viewBox={`0 0 ${SCREEN_WIDTH} 35`} preserveAspectRatio="none" style={styles.curveSvg}>
            <Path d={`M0 35 L0 0 Q${SCREEN_WIDTH / 2} 35 ${SCREEN_WIDTH} 0 L${SCREEN_WIDTH} 35 Z`} fill="#ffffff" />
          </Svg>
        </View>

        {/* Form */}
        <Animated.View style={[styles.formSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          {/* Phone Number (read-only, verified) */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number *</Text>
            <View style={styles.verifiedField}>
              <TextInput
                style={[styles.customInput, styles.inputWithIcon, styles.readOnlyInput]}
                value=""
                placeholder="Verified"
                placeholderTextColor="#64748b"
                editable={false}
              />
              <View style={styles.verifyBadge}>
                <Icon d={ICONS.verified} size={20} color="#1d4ed8" strokeWidth={0} fill="#1d4ed8" />
              </View>
            </View>
          </View>

          {/* Email (read-only, verified) */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address *</Text>
            <View style={styles.verifiedField}>
              <TextInput
                style={[styles.customInput, styles.inputWithIcon, styles.readOnlyInput]}
                value=""
                placeholder="Verified"
                placeholderTextColor="#64748b"
                editable={false}
              />
              <View style={styles.verifyBadge}>
                <Icon d={ICONS.verified} size={20} color="#1d4ed8" strokeWidth={0} fill="#1d4ed8" />
              </View>
            </View>
          </View>

          {/* Physical Address */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Physical Address *</Text>
            <TextInput
              style={getInputStyle('address')}
              placeholder="Enter physical address"
              placeholderTextColor="#94a3b8"
              value={address}
              onChangeText={(text) => {
                setAddress(text);
                if (touched.address) setErrors(prev => ({ ...prev, address: !validateField('address', text) }));
              }}
              onBlur={() => handleBlur('address', address)}
            />
            {touched.address && !errors.address && address.length >= 3 && (
              <View style={styles.fieldStatus}>
                <Icon d={ICONS.check} size={18} color="#10b981" strokeWidth={2.5} />
              </View>
            )}
            {touched.address && errors.address && (
              <Text style={styles.fieldError}>Please enter your address</Text>
            )}
          </View>

          {/* Info Banner */}
          <View style={styles.infoBanner}>
            <View style={styles.infoIcon}>
              <Icon d={ICONS.info} size={14} color="#ffffff" strokeWidth={2} />
            </View>
            <Text style={styles.infoText}>
              Your emergency contact will only be notified during critical security or medical emergencies. All data is securely encrypted and protected.
            </Text>
          </View>

          {/* Emergency Contact Section */}
          <View style={styles.sectionHeader}>
            <Icon d={ICONS.mapPin} size={20} color="#f59e0b" strokeWidth={2.2} />
            <Text style={styles.sectionHeaderText}>Emergency Contact</Text>
          </View>

          {/* EC Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name *</Text>
            <TextInput
              style={getInputStyle('ecName')}
              placeholder="Enter emergency contact name"
              placeholderTextColor="#94a3b8"
              value={ecName}
              onChangeText={(text) => {
                setEcName(text);
                if (touched.ecName) setErrors(prev => ({ ...prev, ecName: !validateField('ecName', text) }));
              }}
              onBlur={() => handleBlur('ecName', ecName)}
            />
            {touched.ecName && !errors.ecName && ecName.trim().length >= 2 && (
              <View style={styles.fieldStatus}>
                <Icon d={ICONS.check} size={18} color="#10b981" strokeWidth={2.5} />
              </View>
            )}
            {touched.ecName && errors.ecName && (
              <Text style={styles.fieldError}>Please enter a name</Text>
            )}
          </View>

          {/* EC Phone */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number *</Text>
            <TextInput
              style={getInputStyle('ecPhone')}
              placeholder="Enter phone number"
              placeholderTextColor="#94a3b8"
              value={ecPhone}
              onChangeText={(text) => {
                setEcPhone(text);
                if (touched.ecPhone) setErrors(prev => ({ ...prev, ecPhone: !validateField('ecPhone', text) }));
              }}
              onBlur={() => handleBlur('ecPhone', ecPhone)}
              keyboardType="phone-pad"
            />
            {touched.ecPhone && !errors.ecPhone && ecPhone.trim().length >= 7 && (
              <View style={styles.fieldStatus}>
                <Icon d={ICONS.check} size={18} color="#10b981" strokeWidth={2.5} />
              </View>
            )}
            {touched.ecPhone && errors.ecPhone && (
              <Text style={styles.fieldError}>Please enter a phone number</Text>
            )}
          </View>

          {/* EC Relationship */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Relationship *</Text>
            <TouchableOpacity
              style={[styles.customInput, styles.selectInput, touched.ecRelation && errors.ecRelation && styles.inputInvalid]}
              onPress={() => setShowRelationDropdown(!showRelationDropdown)}
              activeOpacity={0.7}
            >
              <Text style={[styles.selectText, !ecRelation && styles.selectPlaceholder]}>
                {ecRelation || 'Select'}
              </Text>
              <Icon d="M6 9l6 6 6-6" size={18} color="#94a3b8" strokeWidth={2.5} />
            </TouchableOpacity>
            {showRelationDropdown && (
              <View style={styles.dropdownMenu}>
                {RELATIONSHIPS.map((rel) => (
                  <TouchableOpacity
                    key={rel}
                    style={[styles.dropdownItem, ecRelation === rel && styles.dropdownItemSelected]}
                    onPress={() => {
                      setEcRelation(rel);
                      setShowRelationDropdown(false);
                      setTouched(prev => ({ ...prev, ecRelation: true }));
                      setErrors(prev => ({ ...prev, ecRelation: false }));
                    }}
                  >
                    <Text style={[styles.dropdownItemText, ecRelation === rel && styles.dropdownItemTextSelected]}>
                      {rel}
                    </Text>
                    {ecRelation === rel && (
                      <Icon d={ICONS.check} size={16} color="#3b82f6" strokeWidth={2.5} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {touched.ecRelation && errors.ecRelation && (
              <Text style={styles.fieldError}>Please select a relationship</Text>
            )}
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.btnPrimary} onPress={handleSave} activeOpacity={0.8}>
            <Text style={styles.btnPrimaryText}>Save & Complete</Text>
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
    paddingTop: 48,
    paddingBottom: 0,
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
  },
  stepper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
    marginBottom: 12,
    zIndex: 1,
  },
  step: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    maxWidth: 60,
  },
  stepActive: {
    backgroundColor: '#ffffff',
  },
  stepInactive: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  formSection: {
    flex: 1,
    padding: 20,
    paddingBottom: 40,
  },
  inputGroup: {
    position: 'relative',
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: '#64748b',
    marginBottom: 8,
  },
  customInput: {
    width: '100%',
    height: 56,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '500',
    color: '#1a293b',
  },
  inputWithIcon: {
    paddingRight: 48,
  },
  readOnlyInput: {
    backgroundColor: '#f8fafc',
    color: '#64748b',
  },
  inputValid: {
    borderColor: '#10b981',
  },
  inputInvalid: {
    borderColor: '#ef4444',
  },
  verifiedField: {
    position: 'relative',
  },
  verifyBadge: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  fieldStatus: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  fieldError: {
    fontSize: 11,
    color: '#ef4444',
    marginTop: 4,
    marginLeft: 4,
  },
  infoBanner: {
    backgroundColor: '#f0fdfa',
    borderWidth: 1,
    borderColor: '#ccfbf1',
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 24,
  },
  infoIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#10b981',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    flexShrink: 0,
  },
  infoText: {
    fontSize: 13,
    color: '#0f172a',
    lineHeight: 1.5,
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a293b',
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 16,
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
  dropdownMenu: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    marginTop: 4,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  dropdownItemSelected: {
    backgroundColor: '#eff6ff',
  },
  dropdownItemText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1a293b',
  },
  dropdownItemTextSelected: {
    color: '#3b82f6',
  },
  btnPrimary: {
    width: '100%',
    backgroundColor: '#387bd5',
    borderRadius: 25,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 16,
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
});
