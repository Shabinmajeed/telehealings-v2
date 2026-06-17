import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  Dimensions,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Polyline, Line, Circle, Rect } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Icon = ({ d, size = 24, color = '#000', strokeWidth = 2 }: { d: string; size?: number; color?: string; strokeWidth?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d={d} />
  </Svg>
);

const ICONS = {
  back: 'M19 12H5M12 19l-7-7 7-7',
  star: 'M12 2l3.09 6.26L22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2',
  calendar: 'M3 4h18v18H3z M16 2v4 M8 2v4 M3 10h18',
  clock: 'M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2',
  video: 'M23 7l-7 5 7 5V7z M1 5h14a2 2 0 012 2v10a2 2 0 01-2 2H1a2 2 0 01-2-2V7a2 2 0 012-2z',
  phone: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z',
  chat: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
  check: 'M20 6L9 17l-4-4',
  card: 'M1 4h22v16H1z M1 10h23',
  lock: 'M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4',
  chevronRight: 'M9 18l6-6-6-6',
  info: 'M12 2a10 10 0 100 20 10 10 0 000-20zM12 16v-4M12 8h.01',
};

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card', icon: ICONS.card, desc: 'Visa, Mastercard, Amex' },
  { id: 'upi', label: 'UPI', icon: ICONS.phone, desc: 'Google Pay, PhonePe, Paytm' },
  { id: 'wallet', label: 'Wallet', icon: ICONS.lock, desc: 'TeleHealings Wallet' },
];

export default function SessionConfirmScreen() {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState('card');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(15)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start();
  }, []);

  const handleConfirmPay = () => {
    router.push('/booking-confirmed' as any);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.topSection}>
          <LinearGradient colors={['#e7f2ff', '#2366bd']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={StyleSheet.absoluteFillObject} />
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
              <Icon d={ICONS.back} size={24} color="#ffffff" strokeWidth={2.5} />
              <Text style={styles.backBtnText}>Confirm Session</Text>
            </TouchableOpacity>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80' }}
              style={styles.avatarSm}
            />
          </View>
          <Svg height={35} width="100%" viewBox={`0 0 ${SCREEN_WIDTH} 35`} preserveAspectRatio="none" style={styles.curveSvg}>
            <Path d={`M0 35 L0 0 Q${SCREEN_WIDTH / 2} 35 ${SCREEN_WIDTH} 0 L${SCREEN_WIDTH} 35 Z`} fill="#ffffff" />
          </Svg>
        </View>

        {/* Content */}
        <Animated.View style={[styles.contentWrapper, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          {/* Therapist Info Card */}
          <View style={styles.therapistCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80' }}
              style={styles.therapistAvatar}
            />
            <View style={styles.therapistInfo}>
              <Text style={styles.therapistName}>Dr. Smitha.S</Text>
              <Text style={styles.therapistSpec}>Clinical Psychologist</Text>
              <View style={styles.ratingRow}>
                <Icon d={ICONS.star} size={16} color="#f59e0b" strokeWidth={0} />
                <Text style={styles.ratingText}>4.9</Text>
                <Text style={styles.ratingCount}>(128 reviews)</Text>
              </View>
            </View>
            <View style={styles.verifiedBadge}>
              <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth={2.5}>
                <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <Polyline points="9 12 11 14 15 10" />
              </Svg>
            </View>
          </View>

          {/* Session Details Card */}
          <View style={styles.detailsCard}>
            <Text style={styles.cardTitle}>Session Details</Text>

            <View style={styles.detailRow}>
              <View style={styles.iconBox}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2}>
                  <Path d={ICONS.calendar} />
                </Svg>
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Date</Text>
                <Text style={styles.detailValue}>Thu, Oct 24, 2025</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.iconBox}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2}>
                  <Path d={ICONS.clock} />
                </Svg>
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Time</Text>
                <Text style={styles.detailValue}>10:30 AM</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.iconBox}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2}>
                  <Path d={ICONS.video} />
                </Svg>
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Session Type</Text>
                <Text style={styles.detailValue}>Video Consultation</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.iconBox}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth={2}>
                  <Circle cx="12" cy="12" r="10" />
                  <Polyline points="12 6 12 12 16 14" />
                </Svg>
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Duration</Text>
                <Text style={styles.detailValue}>50 minutes</Text>
              </View>
            </View>
          </View>

          {/* Price Breakdown */}
          <View style={styles.priceCard}>
            <Text style={styles.cardTitle}>Price Details</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Session Fee</Text>
              <Text style={styles.priceValue}>₹ 1,800</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Platform Fee</Text>
              <Text style={styles.priceValue}>₹ 50</Text>
            </View>
            <View style={styles.priceDivider} />
            <View style={styles.priceRow}>
              <Text style={styles.priceTotalLabel}>Total Amount</Text>
              <Text style={styles.priceTotalValue}>₹ 1,850</Text>
            </View>
          </View>

          {/* Payment Method Selector */}
          <View style={styles.paymentCard}>
            <Text style={styles.cardTitle}>Payment Method</Text>
            {PAYMENT_METHODS.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[styles.paymentOption, selectedPayment === method.id && styles.paymentOptionActive]}
                onPress={() => setSelectedPayment(method.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.paymentIconBox, selectedPayment === method.id && styles.paymentIconBoxActive]}>
                  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={selectedPayment === method.id ? '#3b82f6' : '#64748b'} strokeWidth={2}>
                    <Path d={method.icon} />
                  </Svg>
                </View>
                <View style={styles.paymentTextWrap}>
                  <Text style={[styles.paymentLabel, selectedPayment === method.id && styles.paymentLabelActive]}>{method.label}</Text>
                  <Text style={styles.paymentDesc}>{method.desc}</Text>
                </View>
                <View style={[styles.radioOuter, selectedPayment === method.id && styles.radioOuterActive]}>
                  {selectedPayment === method.id && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Security Note */}
          <View style={styles.securityNote}>
            <Icon d={ICONS.lock} size={16} color="#10b981" strokeWidth={2} />
            <Text style={styles.securityText}>Your payment is secured with 256-bit SSL encryption</Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom Confirm Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPrice}>
          <Text style={styles.bottomPriceLabel}>Total</Text>
          <Text style={styles.bottomPriceValue}>₹ 1,850</Text>
        </View>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmPay} activeOpacity={0.8}>
          <Icon d={ICONS.lock} size={18} color="#ffffff" strokeWidth={2.5} />
          <Text style={styles.confirmBtnText}>Confirm & Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  scrollContent: { flexGrow: 1, paddingBottom: 100 },

  // Header
  topSection: {
    paddingTop: 18, paddingBottom: 30, paddingHorizontal: 20,
    position: 'relative', overflow: 'hidden',
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtnText: { color: '#ffffff', fontSize: 20, fontWeight: '800' },
  avatarSm: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, borderColor: '#ffffff' },
  curveSvg: { position: 'absolute', bottom: -1, left: 0, right: 0 },

  // Content
  contentWrapper: { flex: 1, padding: 16, paddingHorizontal: 24 },

  // Therapist Card
  therapistCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff',
    borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 16, padding: 16,
    marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02, shadowRadius: 20, elevation: 2,
  },
  therapistAvatar: { width: 64, height: 64, borderRadius: 32, marginRight: 14 },
  therapistInfo: { flex: 1, gap: 2 },
  therapistName: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  therapistSpec: { fontSize: 13, color: '#64748b', marginBottom: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 13, fontWeight: '700', color: '#0f172a' },
  ratingCount: { fontSize: 12, color: '#94a3b8' },
  verifiedBadge: { marginLeft: 8 },

  // Session Details Card
  detailsCard: {
    backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 16,
    padding: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02, shadowRadius: 20, elevation: 2,
  },
  cardTitle: { fontSize: 13, fontWeight: '700', color: '#64748b', marginBottom: 16 },
  detailRow: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f1f5f9',
  },
  iconBox: {
    width: 44, height: 44, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0',
    alignItems: 'center', justifyContent: 'center',
  },
  detailContent: { gap: 2 },
  detailLabel: { fontSize: 11, fontWeight: '600', color: '#94a3b8' },
  detailValue: { fontSize: 15, fontWeight: '700', color: '#0f172a' },

  // Price Card
  priceCard: {
    backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 16,
    padding: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02, shadowRadius: 20, elevation: 2,
  },
  priceRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 8,
  },
  priceLabel: { fontSize: 14, color: '#64748b' },
  priceValue: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
  priceDivider: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 8 },
  priceTotalLabel: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  priceTotalValue: { fontSize: 18, fontWeight: '800', color: '#3b82f6' },

  // Payment Method
  paymentCard: {
    backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 16,
    padding: 20, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02, shadowRadius: 20, elevation: 2,
  },
  paymentOption: {
    flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14,
    borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 10,
  },
  paymentOptionActive: { borderColor: '#3b82f6', backgroundColor: '#eff6ff' },
  paymentIconBox: {
    width: 44, height: 44, borderRadius: 12, backgroundColor: '#f8fafc',
    alignItems: 'center', justifyContent: 'center',
  },
  paymentIconBoxActive: { backgroundColor: '#dbeafe' },
  paymentTextWrap: { flex: 1, gap: 2 },
  paymentLabel: { fontSize: 15, fontWeight: '600', color: '#0f172a' },
  paymentLabelActive: { color: '#3b82f6' },
  paymentDesc: { fontSize: 12, color: '#94a3b8' },
  radioOuter: {
    width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#cbd5e1',
    alignItems: 'center', justifyContent: 'center',
  },
  radioOuterActive: { borderColor: '#3b82f6' },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#3b82f6' },

  // Security Note
  securityNote: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    padding: 12, backgroundColor: '#f0fdf4', borderRadius: 12,
    borderWidth: 1, borderColor: '#bbf7d0', marginBottom: 16,
  },
  securityText: { fontSize: 12, color: '#166534', flex: 1 },

  // Bottom Bar
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#ffffff', borderTopWidth: 1, borderColor: '#e2e8f0',
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24,
    paddingTop: 16, paddingBottom: 32, gap: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05, shadowRadius: 12, elevation: 8,
  },
  bottomPrice: { gap: 2 },
  bottomPriceLabel: { fontSize: 11, color: '#94a3b8', fontWeight: '600' },
  bottomPriceValue: { fontSize: 20, fontWeight: '800', color: '#0f172a' },
  confirmBtn: {
    flex: 1, backgroundColor: '#3b82f6', borderRadius: 16, padding: 16,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10,
    shadowColor: '#3b82f6', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3, shadowRadius: 20, elevation: 4,
  },
  confirmBtnText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
});
