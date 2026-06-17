import { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path, Polyline, Line, Rect } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Icon = ({ d, size = 24, color = '#000', strokeWidth = 2 }: { d: string; size?: number; color?: string; strokeWidth?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d={d} />
  </Svg>
);

const CONFETTI_COLORS = ['#387bd5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

// Generate confetti pieces once
const CONFETTI = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 0.5,
  duration: 1.5 + Math.random() * 1,
  size: 6 + Math.random() * 8,
  color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
}));

export default function ProfileSuccessScreen() {
  const router = useRouter();

  const popAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const badgeAnim = useRef(new Animated.Value(0)).current;
  const actionsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pop-in for check icon
    Animated.spring(popAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // Staggered fade-up for text elements
    Animated.stagger(100, [
      Animated.timing(titleAnim, { toValue: 1, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(subtitleAnim, { toValue: 1, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(badgeAnim, { toValue: 1, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(actionsAnim, { toValue: 1, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start();
  }, []);

  const slideUp = (anim: Animated.Value) => ({
    opacity: anim,
    transform: [{
      translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [15, 0] }),
    }],
  });

  return (
    <View style={styles.container}>
      {/* Content */}
      <View style={styles.contentSection}>
        {/* Confetti */}
        <View style={styles.confettiContainer} pointerEvents="none">
          {CONFETTI.map((c) => (
            <ConfettiPiece key={c.id} {...c} />
          ))}
        </View>

        {/* Check Icon */}
        <Animated.View style={[styles.iconWrapper, { transform: [{ scale: popAnim }] }]}>
          <Svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <Polyline points="9 12 11 14 15 10" />
          </Svg>
        </Animated.View>

        {/* Title */}
        <Animated.Text style={[styles.title, slideUp(titleAnim)]}>
          Profile Updated Successfully!
        </Animated.Text>

        {/* Subtitle */}
        <Animated.Text style={[styles.subtitle, slideUp(subtitleAnim)]}>
          Your personal details have been saved securely. We value your privacy and guarantee that your information will never be shared with third parties.
        </Animated.Text>

        {/* Secure Badge */}
        <Animated.View style={[styles.secureBadge, slideUp(badgeAnim)]}>
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </Svg>
          <Text style={styles.secureBadgeText}>End-to-End Encrypted</Text>
        </Animated.View>
      </View>

      {/* Bottom Actions */}
      <Animated.View style={[styles.bottomActions, slideUp(actionsAnim)]}>
        <TouchableOpacity
          style={styles.btnPrimary}
          activeOpacity={0.8}
          onPress={() => router.push('/medical-profile-1' as any)}
        >
          <Text style={styles.btnPrimaryText}>Complete Medical Profile</Text>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <Line x1="5" y1="12" x2="19" y2="12" />
            <Polyline points="12 5 19 12 12 19" />
          </Svg>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnSecondary}
          activeOpacity={0.8}
          onPress={() => router.push('/home' as any)}
        >
          <Text style={styles.btnSecondaryText}>Go to Home</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

function ConfettiPiece({ left, delay, duration, size, color }: {
  left: number; delay: number; duration: number; size: number; color: string;
}) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(anim, {
        toValue: 1,
        duration: duration * 1000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: `${left}%`,
        top: -20,
        width: size,
        height: size,
        borderRadius: 2,
        backgroundColor: color,
        opacity: anim.interpolate({ inputRange: [0, 0.3, 1], outputRange: [1, 1, 0] }),
        transform: [
          {
            translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, 120] }),
          },
          {
            rotate: anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '720deg'] }),
          },
        ],
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
    position: 'relative',
  },
  confettiContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    zIndex: 1,
  },
  iconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0fdfa',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowColor: '#0d9488',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 35,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#335075',
    marginBottom: 16,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#637b96',
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f8fafc',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginTop: 24,
  },
  secureBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  bottomActions: {
    padding: 24,
    gap: 16,
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
  btnSecondary: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  btnSecondaryText: {
    color: '#475569',
    fontSize: 17,
    fontWeight: '600',
  },
});
