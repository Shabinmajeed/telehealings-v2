import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Animated, Image, Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { navigate } from '../navigation';

const OPTIONS = [
  { id: 'stress', title: 'Stress', subtitle: 'Managing daily pressure', icon: '⚡' },
  { id: 'anxiety', title: 'Anxiety', subtitle: 'Calming your mind', icon: '🧘' },
  { id: 'sleep', title: 'Sleep', subtitle: 'Better rest', icon: '🌙' },
  { id: 'relationships', title: 'Relationships', subtitle: 'Building connections', icon: '💬' },
  { id: 'self-esteem', title: 'Self-esteem', subtitle: 'Building confidence', icon: '💪' },
  { id: 'focus', title: 'Focus', subtitle: 'Improving concentration', icon: '🎯' },
];

const MAX_SELECTIONS = 3;

export default function PersonalisationScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState(new Set());
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

  const slideFade = (anim) => ({
    opacity: anim,
    transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [15, 0] }) }],
  });

  const toggleOption = (id) => {
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
    // Save selections
    navigate('/home');
  };

  const hasSelection = selected.size > 0;

  return (
    <View style={styles.container}>
      {/* Top Curved Section */}
      <Animated.View style={[styles.topCurve, slideFade(headerAnim)]}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>What brings you here?</Text>
          <View style={styles.mascotContainer}>
            <Image source={require('../../assets/Heali.png')} style={styles.mascotImg} resizeMode="contain" />
          </View>
        </View>
        <Text style={styles.subtitle}>Choose what you'd like to focus on first. We'll personalize your journey based on your needs.</Text>
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
                <Text style={styles.optionIcon}>{option.icon}</Text>
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  topCurve: {
    backgroundColor: '#e2effa',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingTop: 25,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  backBtn: { width: 40, justifyContent: 'center' },
  backArrow: { fontSize: 24, color: '#384e68' },
  title: { flex: 1, textAlign: 'center', color: '#1e5ab8', fontSize: 22, fontWeight: '700', letterSpacing: -0.5 },
  mascotContainer: { width: 40, alignItems: 'center' },
  mascotImg: { width: 34, height: 34 },
  subtitle: { color: '#4f6885', fontSize: 13, fontWeight: '500', textAlign: 'center', lineHeight: 18, paddingHorizontal: 10 },
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
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.03)',
  },
  optionCardSelected: {
    backgroundColor: 'rgba(59, 130, 246, 0.06)',
    borderColor: '#387bd5',
    elevation: 3,
  },
  optionIcon: { fontSize: 28, marginBottom: 12 },
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
  btnDisabled: { backgroundColor: '#c8d9ed', elevation: 0 },
  btnPrimaryText: { color: '#ffffff', fontSize: 17, fontWeight: '600' },
});
