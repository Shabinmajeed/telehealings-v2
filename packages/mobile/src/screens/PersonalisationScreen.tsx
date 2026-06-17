import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Animated, Image, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { navigate } from '../navigation';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const OPTIONS = [
  {
    id: 'stress',
    title: 'Stress',
    subtitle: 'Managing daily pressure',
    svgIcon: `<svg viewBox="0 0 24 24" fill="#1e5ab8"><path d="M17 18a4.5 4.5 0 0 0 .76-8.93 7 7 0 0 0-13.33-1.6A4.5 4.5 0 0 0 6 18h4v-3H8l4-6v4h2l-4 6h3z"/></svg>`,
  },
  {
    id: 'anxiety',
    title: 'Anxiety',
    subtitle: 'Calming your mind',
    svgIcon: `<svg viewBox="0 0 24 24" fill="#1e5ab8"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35zM9 13l2-4 1.5 3H16v-2h-2.5l-1.5-3-2 4-1.5-3H5v2h2.5L9 13z"/></svg>`,
  },
  {
    id: 'sleep',
    title: 'Sleep',
    subtitle: 'Better rest',
    svgIcon: `<svg viewBox="0 0 24 24" fill="#1e5ab8"><path d="M12.1 2.3a.7.7 0 0 0-1.1-.3C7 5 4.6 9 4.8 13.5A9.5 9.5 0 0 0 14.2 23c4.4.2 8.4-2.1 10.9-6 .2-.3 0-.8-.4-1-.8-.4-1.7-.5-2.6-.5-5.3 0-9.6-4.3-9.6-9.6 0-1.3.3-2.6.8-3.7.1-.4 0-.7-.2-.9z"/></svg>`,
  },
  {
    id: 'relationships',
    title: 'Relationships',
    subtitle: 'Building connections',
    svgIcon: `<svg viewBox="0 0 24 24" fill="#1e5ab8"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
  },
  {
    id: 'self-esteem',
    title: 'Self-esteem',
    subtitle: 'Building confidence',
    svgIcon: `<svg viewBox="0 0 24 24" fill="#1e5ab8"><path d="M22 3C22 3 19 3 15 6C11 9 11 14 11 14V21H13V15C13 15 14 13 16 13C20 13 22 9 22 3ZM2 7C2 7 5 7 9 10C13 13 13 18 13 18V21H11V19C11 19 10 17 8 17C4 17 2 13 2 7Z"/></svg>`,
  },
  {
    id: 'focus',
    title: 'Focus',
    subtitle: 'Improving concentration',
    svgIcon: `<svg viewBox="0 0 24 24" fill="#1e5ab8"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>`,
  },
];

// Simple SVG icon component that renders the SVG path directly
const IconSvg = ({ d, size = 38, color = '#1e5ab8' }: { d: string; size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d={d} />
  </Svg>
);

const ICON_PATHS: Record<string, string> = {
  stress: 'M17 18a4.5 4.5 0 0 0 .76-8.93 7 7 0 0 0-13.33-1.6A4.5 4.5 0 0 0 6 18h4v-3H8l4-6v4h2l-4 6h3z',
  anxiety: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  sleep: 'M12.1 2.3a.7.7 0 0 0-1.1-.3C7 5 4.6 9 4.8 13.5A9.5 9.5 0 0 0 14.2 23c4.4.2 8.4-2.1 10.9-6 .2-.3 0-.8-.4-1-.8-.4-1.7-.5-2.6-.5-5.3 0-9.6-4.3-9.6-9.6 0-1.3.3-2.6.8-3.7.1-.4 0-.7-.2-.9z',
  relationships: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  'self-esteem': 'M22 3C22 3 19 3 15 6C11 9 11 14 11 14V21H13V15C13 15 14 13 16 13C20 13 22 9 22 3ZM2 7C2 7 5 7 9 10C13 13 13 18 13 18V21H11V19C11 19 10 17 8 17C4 17 2 13 2 7Z',
  focus: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z',
};

const MAX_SELECTIONS = 3;

export default function PersonalisationScreen() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [errorText, setErrorText] = useState('');

  const headerAnim = useRef(new Animated.Value(0)).current;
  const gridAnim = useRef(new Animated.Value(0)).current;
  const bottomAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(150, [
      Animated.timing(headerAnim, { toValue: 1, duration: 500, useNativeDriver: false }),
      Animated.timing(gridAnim, { toValue: 1, duration: 500, useNativeDriver: false }),
      Animated.timing(bottomAnim, { toValue: 1, duration: 500, useNativeDriver: false }),
    ]).start();
  }, []);

  const slideFade = (anim: Animated.Value) => ({
    opacity: anim,
    transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [15, 0] }) }],
  });

  const toggleOption = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setErrorText('');
        return next;
      }
      if (next.size >= MAX_SELECTIONS) {
        setErrorText('You can only choose a maximum of 3 cards.');
        return prev;
      }
      next.add(id);
      setErrorText('');
      return next;
    });
  };

  const handleContinue = () => {
    if (selected.size === 0) {
      setErrorText('Select at least 1 option to continue');
      return;
    }
    navigate('/home');
  };

  const hasSelection = selected.size > 0;

  // Curve: border-radius 0 0 50% 50% / 0 0 25px 25px
  const curvePath = `M0 25 L0 0 Q${SCREEN_WIDTH / 2} 25 ${SCREEN_WIDTH} 0 L${SCREEN_WIDTH} 25 Z`;

  return (
    <View style={styles.container}>
      {/* Top Curved Section */}
      <Animated.View style={[styles.topCurve, slideFade(headerAnim)]}>
        <LinearGradient
          colors={['#cbe0f9', '#e2effa']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />

        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigate('/soft-onboarding')} style={styles.backBtn}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#384e68" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M19 12H5M12 19l-7-7 7-7" />
            </Svg>
          </TouchableOpacity>
          <Text style={styles.title}>What brings you here?</Text>
          <View style={styles.mascotContainer}>
            <Image source={require('../../assets/Heali.png')} style={styles.mascotImg} resizeMode="contain" />
          </View>
        </View>
        <Text style={styles.subtitle}>Choose what you'd like to focus on first. We'll personalize your journey based on your needs.</Text>

        {/* Curved bottom edge */}
        <Svg
          height={25}
          width="100%"
          viewBox={`0 0 ${SCREEN_WIDTH} 25`}
          preserveAspectRatio="none"
          style={styles.curveSvg}
        >
          <Path d={curvePath} fill="#ffffff" />
        </Svg>
      </Animated.View>

      {/* Options Grid */}
      <View style={styles.contentSection}>
        <Animated.View style={[styles.optionsGrid, slideFade(gridAnim)]}>
          {OPTIONS.map((option) => {
            const isSelected = selected.has(option.id);
            return (
              <TouchableOpacity
                key={option.id}
                style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                onPress={() => toggleOption(option.id)}
                activeOpacity={0.8}
              >
                <View style={styles.iconBox}>
                  <IconSvg d={ICON_PATHS[option.id]} size={38} color={isSelected ? '#387bd5' : '#1e5ab8'} />
                </View>
                <Text style={[styles.optionTitle, isSelected && styles.optionTitleSelected]}>{option.title}</Text>
                <Text style={[styles.optionSubtitle, isSelected && styles.optionSubtitleSelected]}>{option.subtitle}</Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </View>

      {/* Bottom Section */}
      <Animated.View style={[styles.bottomSection, slideFade(bottomAnim)]}>
        <Text style={[styles.selectionInfo, errorText && styles.selectionInfoError]}>
          {errorText || (hasSelection ? '\u00A0' : 'Select at least 1 option to continue')}
        </Text>
        <TouchableOpacity
          style={[styles.btnPrimary, !hasSelection && styles.btnDisabled]}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.btnPrimaryText}>Continue</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  topCurve: {
    paddingTop: 25,
    paddingBottom: 30,
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
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, zIndex: 1 },
  backBtn: { width: 40, justifyContent: 'center' },
  title: { flex: 1, textAlign: 'center', color: '#1e5ab8', fontSize: 22, fontWeight: '700', letterSpacing: -0.5 },
  mascotContainer: { width: 40, alignItems: 'center' },
  mascotImg: { width: 34, height: 34 },
  subtitle: { color: '#4f6885', fontSize: 13, fontWeight: '500', textAlign: 'center', lineHeight: 18, paddingHorizontal: 10, zIndex: 1 },
  contentSection: { flex: 1, paddingHorizontal: 20, paddingTop: 5, paddingBottom: 15, justifyContent: 'center' },
  optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  optionCard: {
    width: (SCREEN_WIDTH - 52) / 2,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: 'transparent',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.03)',
    elevation: 1,
  },
  optionCardSelected: {
    backgroundColor: 'rgba(59, 130, 246, 0.06)',
    borderColor: '#387bd5',
    elevation: 3,
  },
  iconBox: { width: 38, height: 38, marginBottom: 12 },
  optionTitle: { fontSize: 16, fontWeight: '700', color: '#1a293b', marginBottom: 4 },
  optionTitleSelected: { color: '#1e5ab8' },
  optionSubtitle: { fontSize: 11, color: '#64748b', lineHeight: 14, textAlign: 'center' },
  optionSubtitleSelected: { color: '#385b8a' },
  bottomSection: { paddingHorizontal: 20, paddingBottom: 25, paddingTop: 15 },
  selectionInfo: { textAlign: 'center', fontSize: 13, color: '#64748b', marginBottom: 16, fontStyle: 'italic', opacity: 0.8 },
  selectionInfoError: { color: '#d93838', fontStyle: 'normal' },
  btnPrimary: {
    backgroundColor: '#387bd5', height: 56, borderRadius: 30,
    alignItems: 'center', justifyContent: 'center',
    boxShadow: '0px 10px 25px rgba(59, 130, 246, 0.18)',
  },
  btnDisabled: { backgroundColor: '#c8d9ed', elevation: 0, shadowOpacity: 0 },
  btnPrimaryText: { color: '#ffffff', fontSize: 17, fontWeight: '600' },
});
