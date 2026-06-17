import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Image,
  ScrollView, Dimensions, StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Line, Rect, Polygon } from 'react-native-svg';
import { navigate } from '../navigation';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ===== SVG Icon Components (from design) =====
const Icon = ({ d, size = 24, color = '#1e5ab8', fill = 'none', strokeWidth = 2, stroke }: { d: string; size?: number; color?: string; fill?: string; strokeWidth?: number; stroke?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke || color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {typeof d === 'string' ? <Path d={d} /> : d}
  </Svg>
);

const ICONS = {
  home: 'M3 10.5V20a2 2 0 0 0 2 2h4v-6h6v6h4a2 2 0 0 0 2-2v-9.5M2 12l10-9 10 9',
  care: 'M12 20.5l-8.5-8.5a5.5 5.5 0 0 1 7.78-7.78L12 5.28l.72-1.06a5.5 5.5 0 0 1 7.78 7.78L12 20.5zM12 8.5v5m-2.5-2.5h5',
  discover: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.6 9h16.8M3.6 15h16.8M12 3c-2.5 3.5-4 7-4 9s1.5 5.5 4 9c2.5-3.5 4-7 4-9s-1.5-5.5-4-9z',
  messages: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  more: 'M4 6h16M4 12h16M4 18h10',
  notification: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4',
  calendar: 'M3 4h18v18H3zM16 2v4M8 2v4M3 10h18',
  video: 'M23 7l-7 5 7 5V7zM1 5h14v12H1z',
  play: 'M5 3l14 9-14 9V3z',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z',
  support: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01',
  profile: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',
  chevronDown: 'M6 9l6 6 6-6',
  chevronRight: 'M9 18l6-6-6-6',
  close: 'M18 6L6 18M6 6l12 12',
  send: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
};

const MOODS = [
  { id: 'energized', label: 'Energized', color: '#10b981' },
  { id: 'calm', label: 'Calm', color: '#3b82f6' },
  { id: 'okay', label: 'Okay', color: '#f59e0b' },
  { id: 'sad', label: 'Sad', color: '#8b5cf6' },
  { id: 'stressed', label: 'Stressed', color: '#ef4444' },
];

const RECOMMENDED = [
  { id: 1, title: 'Yoga for Desk Workers', meta: 'Video • 12 min', type: 'video' },
  { id: 2, title: 'Understanding Your Anxiety Triggers', meta: 'Article • 5 min read', type: 'article' },
  { id: 3, title: '5-Minute Morning Meditation', meta: 'Audio • 5 min', type: 'audio' },
];

export default function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showJournal, setShowJournal] = useState(false);
  const [journalText, setJournalText] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showHealiChat, setShowHealiChat] = useState(false);
  const [userName, setUserName] = useState('Ajesh Anand');

  const headerAnim = useRef(new Animated.Value(0)).current;
  const contentAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(100, [
      Animated.timing(headerAnim, { toValue: 1, duration: 500, useNativeDriver: false }),
      Animated.timing(contentAnim, { toValue: 1, duration: 500, useNativeDriver: false }),
    ]).start();

    // Load user name
    const storedName = '';
    if (storedName) setUserName(storedName);
  }, []);

  const slideFade = (anim: Animated.Value) => ({
    opacity: anim,
    transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [15, 0] }) }],
  });

  const handleMoodSelect = (moodId: string) => {
    if (selectedMood === moodId) {
      setSelectedMood(null);
      setShowJournal(false);
    } else {
      setSelectedMood(moodId);
      setShowJournal(true);
    }
  };

  const curvePath = `M0 35 L0 0 Q${SCREEN_WIDTH / 2} 35 ${SCREEN_WIDTH} 0 L${SCREEN_WIDTH} 35 Z`;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#e7f2ff" />

      {/* ===== HEADER WITH BLUE WAVE ===== */}
      <Animated.View style={[styles.topSection, slideFade(headerAnim)]}>
        <LinearGradient
          colors={['#e7f2ff', '#2366bd']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Header Row */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.userProfile} onPress={() => setShowUserDropdown(!showUserDropdown)}>
            <View style={styles.avatar}>
              <Icon d={ICONS.profile} size={24} color="#d1b894" fill="#d1b894" strokeWidth={0} />
            </View>
            <View style={styles.userNameBox}>
              <Text style={styles.userName}>{userName}</Text>
              <Icon d={ICONS.chevronDown} size={18} color="#1a293b" strokeWidth={2.5} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.notificationBtn} onPress={() => setShowNotifications(!showNotifications)}>
            <Icon d={ICONS.notification} size={24} color="#1e5ab8" strokeWidth={2} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* User Dropdown */}
        {showUserDropdown && (
          <View style={styles.userDropdown}>
            <TouchableOpacity style={styles.dropdownItem} onPress={() => { setShowUserDropdown(false); navigate('/profile'); }}>
              <Icon d={ICONS.profile} size={18} color="#1a293b" strokeWidth={2.2} />
              <Text style={styles.dropdownText}>My Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.dropdownItem, styles.dropdownLogout]} onPress={() => { setShowUserDropdown(false); navigate('/'); }}>
              <Icon d={ICONS.logout} size={18} color="#ef4444" strokeWidth={2.2} />
              <Text style={[styles.dropdownText, { color: '#ef4444' }]}>Log out</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Curved bottom edge */}
        <Svg height={35} width="100%" viewBox={`0 0 ${SCREEN_WIDTH} 35`} preserveAspectRatio="none" style={styles.curveSvg}>
          <Path d={curvePath} fill="#fbfcfd" />
        </Svg>
      </Animated.View>

      {/* ===== MAIN SCROLLABLE CONTENT ===== */}
      <ScrollView style={styles.contentWrapper} showsVerticalScrollIndicator={false}>
        <Animated.View style={slideFade(contentAnim)}>
          {/* Verify Banner */}
          <View style={styles.verifyBanner}>
            <View style={styles.verifyLeft}>
              <Icon d={ICONS.shield} size={24} color="#1e5ab8" strokeWidth={2} />
              <Text style={styles.verifyText}>Please verify your account to{'\n'}book Therapists.</Text>
            </View>
            <TouchableOpacity style={styles.verifyBtn}>
              <Text style={styles.verifyBtnText}>Verify</Text>
              <Icon d={ICONS.chevronRight} size={18} color="#387bd5" strokeWidth={3} />
            </TouchableOpacity>
          </View>

          {/* Greeting Section */}
          <View style={styles.greetingSection}>
            <View style={styles.greetingContent}>
              <Text style={styles.greetingTitle}>Good morning, {userName}</Text>
              <Text style={styles.greetingSubtitle}>We're here to help you manage your stress today. Take a moment for yourself.</Text>
            </View>
            <Image source={require('../../assets/Heali.png')} style={styles.greetingHeali} resizeMode="contain" />
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: '#1e5ab8' }]}>0</Text>
              <Text style={styles.statLabel}>Sessions</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: '#16a34a' }]}>0%</Text>
              <Text style={styles.statLabel}>Progress</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: '#7c3aed' }]}>0</Text>
              <Text style={styles.statLabel}>Days Streak</Text>
            </View>
          </View>

          {/* Heali Insight */}
          <View style={styles.healiInsight}>
            <Image source={require('../../assets/Heali.png')} style={styles.insightHeali} resizeMode="contain" />
            <Text style={styles.insightText}><Text style={{ fontWeight: '700' }}>Heali suggests:</Text> Try a 5-minute breathing exercise today to start your morning right.</Text>
          </View>

          {/* Mood Card */}
          <View style={styles.card}>
            <View style={styles.moodHeader}>
              <Text style={styles.moodTitle}>How Are You Feeling today?</Text>
              <TouchableOpacity onPress={() => { setSelectedMood(null); setShowJournal(false); }}>
                <Icon d={ICONS.close} size={14} color="#64748b" strokeWidth={2.5} />
              </TouchableOpacity>
            </View>
            <View style={styles.moodFaces}>
              {MOODS.map((mood) => (
                <TouchableOpacity
                  key={mood.id}
                  style={[styles.moodItem, selectedMood === mood.id && styles.moodItemSelected]}
                  onPress={() => handleMoodSelect(mood.id)}
                >
                  <View style={[styles.moodIconWrapper, selectedMood === mood.id && { backgroundColor: '#e2effb' }]}>
                    <Svg width={24} height={24} viewBox="0 0 36 36">
                      <Circle cx="18" cy="18" r="18" fill={selectedMood === mood.id ? '#387bd5' : '#94a3b8'} />
                      {mood.id === 'energized' && (
                        <>
                          <Path d="M10 14 Q12 11 14 14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                          <Path d="M22 14 Q24 11 26 14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                          <Path d="M10 20 Q18 28 26 20 Z" fill="#fff" />
                        </>
                      )}
                      {mood.id === 'calm' && (
                        <>
                          <Circle cx="12" cy="14" r="2.5" fill="#fff" />
                          <Circle cx="24" cy="14" r="2.5" fill="#fff" />
                          <Path d="M12 22 Q18 26 24 22" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                        </>
                      )}
                      {mood.id === 'okay' && (
                        <>
                          <Circle cx="12" cy="14" r="2" fill="#fff" />
                          <Circle cx="24" cy="14" r="2" fill="#fff" />
                          <Line x1="13" y1="22" x2="23" y2="22" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                        </>
                      )}
                      {mood.id === 'sad' && (
                        <>
                          <Circle cx="12" cy="14" r="2" fill="#fff" />
                          <Circle cx="24" cy="14" r="2" fill="#fff" />
                          <Path d="M12 24 Q18 20 24 24" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                        </>
                      )}
                      {mood.id === 'stressed' && (
                        <>
                          <Path d="M10 12 L14 14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                          <Path d="M26 12 L22 14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                          <Circle cx="12" cy="16" r="2" fill="#fff" />
                          <Circle cx="24" cy="16" r="2" fill="#fff" />
                          <Path d="M12 25 Q18 21 24 25" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                        </>
                      )}
                    </Svg>
                  </View>
                  <Text style={[styles.moodLabel, selectedMood === mood.id && styles.moodLabelSelected]}>{mood.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Journal Section */}
            {showJournal && (
              <View style={styles.journalSection}>
                <Text style={styles.journalPrompt}>Would you like to add a note about how you're feeling? (Optional)</Text>
                <TextInput
                  style={styles.journalTextarea}
                  placeholder="Type your thoughts here..."
                  placeholderTextColor="#94a3b8"
                  value={journalText}
                  onChangeText={setJournalText}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
                <TouchableOpacity style={styles.journalSaveBtn}>
                  <Text style={styles.journalSaveText}>Save Entry</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Appointment Card */}
          <View style={styles.apptCard}>
            <View style={styles.apptHeader}>
              <View style={styles.apptStatusBadge}>
                <Text style={styles.apptStatusText}>Upcoming</Text>
              </View>
              <Text style={styles.apptId}>#TH-9482</Text>
            </View>
            <View style={styles.therapistInfo}>
              <View style={styles.therapistAvatar}>
                <Icon d={ICONS.profile} size={28} color="#94a3b8" fill="#f1f5f9" strokeWidth={0} />
              </View>
              <View style={styles.therapistDetails}>
                <Text style={styles.therapistName}>John .D</Text>
                <Text style={styles.therapistRole}>Clinical Psychologist</Text>
              </View>
            </View>
            <View style={styles.apptTimeInfo}>
              <View style={styles.timeBlock}>
                <Text style={styles.timeLabel}>Date</Text>
                <Text style={styles.timeValue}>Tomorrow, Oct 24</Text>
              </View>
              <View style={styles.timeDivider} />
              <View style={styles.timeBlock}>
                <Text style={styles.timeLabel}>Time</Text>
                <Text style={styles.timeValue}>04:00 PM</Text>
                <Text style={styles.timeCountdown}>Starts in 14h 32m</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.joinBtn}>
              <Icon d={ICONS.video} size={22} color="#ffffff" strokeWidth={2.5} />
              <Text style={styles.joinBtnText}>Join Session</Text>
            </TouchableOpacity>
          </View>

          {/* Recommended Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended for you</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.contentRow}>
            {RECOMMENDED.map((item) => (
              <TouchableOpacity key={item.id} style={styles.contentCard}>
                <View style={styles.contentImgBox}>
                  <View style={[styles.contentImgPlaceholder, { backgroundColor: item.type === 'video' ? '#dbeafe' : item.type === 'article' ? '#fef3c7' : '#e0e7ff' }]}>
                    <Icon d={item.type === 'video' ? ICONS.video : item.type === 'article' ? ICONS.discover : ICONS.play} size={28} color={item.type === 'video' ? '#3b82f6' : item.type === 'article' ? '#f59e0b' : '#8b5cf6'} strokeWidth={1.5} />
                  </View>
                  {item.type === 'video' && (
                    <View style={styles.playOverlay}>
                      <Icon d={ICONS.play} size={24} color="#ffffff" fill="#ffffff" strokeWidth={0} />
                    </View>
                  )}
                </View>
                <Text style={styles.contentCardTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.contentCardMeta}>{item.meta}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Bottom spacer for nav */}
          <View style={{ height: 100 }} />
        </Animated.View>
      </ScrollView>

      {/* ===== BOTTOM NAV ===== */}
      <View style={[styles.bottomNav, showMoreMenu && styles.bottomNavExpanded]}>
        {/* Expanded top row */}
        {showMoreMenu && (
          <View style={styles.navTopRow}>
            <TouchableOpacity style={styles.navItem} onPress={() => setShowMoreMenu(false)}>
              <Icon d={ICONS.support} size={24} color="#8E9AA0" strokeWidth={2.2} />
              <Text style={styles.navLabel}>Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => { setShowMoreMenu(false); navigate('/settings'); }}>
              <Icon d={ICONS.settings} size={24} color="#8E9AA0" strokeWidth={2.2} />
              <Text style={styles.navLabel}>Settings</Text>
            </TouchableOpacity>
            <View style={styles.navSpacer} />
            <TouchableOpacity style={styles.navItem} onPress={() => { setShowMoreMenu(false); navigate('/messages'); }}>
              <Icon d={ICONS.messages} size={24} color="#8E9AA0" strokeWidth={2.2} />
              <Text style={styles.navLabel}>Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => { setShowMoreMenu(false); navigate('/profile'); }}>
              <Icon d={ICONS.profile} size={24} color="#8E9AA0" strokeWidth={2.2} />
              <Text style={styles.navLabel}>Profile</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Bottom row */}
        <View style={styles.navBottomRow}>
          <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
            <Icon d={ICONS.home} size={24} color="#387bd5" strokeWidth={2.2} />
            <Text style={[styles.navLabel, { color: '#387bd5', fontWeight: '600' }]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigate('/care')}>
            <Icon d={ICONS.care} size={24} color="#8E9AA0" strokeWidth={2.2} />
            <Text style={styles.navLabel}>Care</Text>
          </TouchableOpacity>
          <View style={styles.navSpacer} />
          <TouchableOpacity style={styles.navItem} onPress={() => navigate('/discover')}>
            <Icon d={ICONS.discover} size={24} color="#8E9AA0" strokeWidth={2.2} />
            <Text style={styles.navLabel}>Discover</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => setShowMoreMenu(!showMoreMenu)}>
            <Icon d={ICONS.more} size={24} color={showMoreMenu ? '#387bd5' : '#8E9AA0'} strokeWidth={2.2} />
            <Text style={[styles.navLabel, showMoreMenu && { color: '#387bd5', fontWeight: '600' }]}>More</Text>
          </TouchableOpacity>
        </View>

        {/* Center Heali Button */}
        <View style={styles.navCenterAbsolute}>
          <TouchableOpacity style={styles.navCenterBtn} onPress={() => setShowHealiChat(true)}>
            <Image source={require('../../assets/Heali.png')} style={styles.navCenterImg} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ===== NOTIFICATION PANEL ===== */}
      {showNotifications && (
        <TouchableOpacity style={styles.notificationOverlay} activeOpacity={1} onPress={() => setShowNotifications(false)}>
          <View style={styles.notificationPanel}>
            <View style={styles.notifHeader}>
              <Text style={styles.notifTitle}>Notifications</Text>
              <TouchableOpacity>
                <Text style={styles.notifClear}>Clear</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.notifList}>
              <View style={[styles.notifItem, styles.notifUnread]}>
                <View style={styles.notifIcon}>
                  <Icon d={ICONS.calendar} size={20} color="#387bd5" strokeWidth={2} />
                </View>
                <View style={styles.notifContent}>
                  <Text style={styles.notifText}><Text style={{ fontWeight: '700' }}>Reminder:</Text> Your appointment with John is tomorrow at 04:00 PM.</Text>
                  <Text style={styles.notifTime}>2 hours ago</Text>
                </View>
              </View>
              <View style={[styles.notifItem, styles.notifUnread]}>
                <View style={styles.notifIcon}>
                  <Icon d={ICONS.shield} size={20} color="#387bd5" strokeWidth={2} />
                </View>
                <View style={styles.notifContent}>
                  <Text style={styles.notifText}><Text style={{ fontWeight: '700' }}>Security:</Text> Your phone number was successfully verified.</Text>
                  <Text style={styles.notifTime}>5 hours ago</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}

      {/* ===== HEALI CHAT MODAL ===== */}
      {showHealiChat && (
        <View style={styles.healiChatOverlay}>
          <View style={styles.healiChatContainer}>
            <View style={styles.healiChatHeader}>
              <View style={styles.healiChatAvatar}>
                <Image source={require('../../assets/Heali.png')} style={{ width: 28, height: 28 }} resizeMode="contain" />
              </View>
              <View style={styles.healiChatTitleBlock}>
                <Text style={styles.healiChatTitle}>Heali</Text>
                <Text style={styles.healiChatStatus}>● Online</Text>
              </View>
              <TouchableOpacity style={styles.healiChatClose} onPress={() => setShowHealiChat(false)}>
                <Icon d={ICONS.close} size={18} color="#64748b" strokeWidth={2} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.healiChatMessages}>
              <View style={styles.chatBubbleAI}>
                <Text style={styles.chatBubbleText}>Hi there! I'm Heali, your AI wellness companion. How are you feeling today?</Text>
                <Text style={styles.chatTime}>Just now</Text>
              </View>
            </ScrollView>
            <View style={styles.healiChatInputArea}>
              <TextInput
                style={styles.healiChatInput}
                placeholder="Type your message..."
                placeholderTextColor="#94a3b8"
              />
              <TouchableOpacity style={styles.healiChatSend}>
                <Icon d={ICONS.send} size={20} color="#ffffff" fill="#ffffff" strokeWidth={0} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fbfcfd' },

  // ===== HEADER =====
  topSection: {
    paddingTop: 20,
    paddingBottom: 35,
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
    zIndex: 10,
  },
  curveSvg: { position: 'absolute', bottom: -1, left: 0, right: 0 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 },
  userProfile: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 44, height: 44, borderRadius: 50, backgroundColor: '#d1b894',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)',
  },
  userNameBox: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  userName: { fontSize: 18, fontWeight: '700', color: '#1a293b' },
  notificationBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  notificationDot: {
    position: 'absolute', top: 8, right: 8, width: 10, height: 10,
    backgroundColor: '#ef4444', borderWidth: 2, borderColor: '#ffffff', borderRadius: 50,
  },

  // User Dropdown
  userDropdown: {
    position: 'absolute', top: 60, left: 20, backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16, padding: 4, width: 160, zIndex: 100,
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 24, elevation: 8,
    borderWidth: 1, borderColor: 'rgba(59,130,246,0.2)',
  },
  dropdownItem: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: 14 },
  dropdownText: { fontSize: 14, fontWeight: '600', color: '#1a293b' },
  dropdownLogout: {},

  // ===== CONTENT =====
  contentWrapper: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },

  // Verify Banner
  verifyBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 12, paddingHorizontal: 16, borderRadius: 12, marginBottom: 8,
    borderWidth: 1, borderColor: 'rgba(56,123,213,0.15)',
  },
  verifyLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  verifyText: { fontSize: 13, lineHeight: 18, fontWeight: '500', color: '#64748b' },
  verifyBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  verifyBtnText: { fontSize: 14, fontWeight: '700', color: '#387bd5' },

  // Greeting
  greetingSection: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingVertical: 16 },
  greetingContent: { flex: 1 },
  greetingTitle: { fontSize: 24, fontWeight: '700', color: '#1a293b', marginBottom: 6 },
  greetingSubtitle: { fontSize: 13, color: '#64748b', lineHeight: 18 },
  greetingHeali: { width: 56, height: 56 },

  // Stats
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 8 },
  statCard: {
    flex: 1, backgroundColor: '#ffffff', borderRadius: 16, padding: 16, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 15, elevation: 1,
  },
  statValue: { fontSize: 24, fontWeight: '700' },
  statLabel: { fontSize: 11, fontWeight: '600', color: '#64748b', marginTop: 4 },

  // Heali Insight
  healiInsight: {
    flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, paddingHorizontal: 16,
    borderRadius: 12, marginBottom: 8,
    backgroundColor: '#eff6ff',
    borderWidth: 1, borderColor: '#bfdbfe',
  },
  insightHeali: { width: 28, height: 28 },
  insightText: { fontSize: 12, color: '#1e40af', lineHeight: 16, flex: 1 },

  // Cards
  card: {
    backgroundColor: '#ffffff', borderRadius: 20, padding: 24, marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.03, shadowRadius: 35, elevation: 1,
  },

  // Mood
  moodHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  moodTitle: { fontSize: 18, fontWeight: '700', color: '#1a293b' },
  moodFaces: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 },
  moodItem: { alignItems: 'center', gap: 8 },
  moodItemSelected: {},
  moodIconWrapper: {
    width: 40, height: 40, borderRadius: 50, alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#f8fafc',
  },
  moodLabel: { fontSize: 11, fontWeight: '600', color: '#64748b' },
  moodLabelSelected: { color: '#1a293b' },

  // Journal
  journalSection: { marginTop: 20, paddingTop: 20, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  journalPrompt: { fontSize: 13, color: '#64748b', marginBottom: 12, fontWeight: '500' },
  journalTextarea: {
    width: '100%', height: 80, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12,
    padding: 12, fontSize: 14, color: '#1a293b', backgroundColor: '#f8fafc', marginBottom: 12,
  },
  journalSaveBtn: {
    alignSelf: 'flex-end', backgroundColor: '#387bd5', borderRadius: 20,
    paddingVertical: 8, paddingHorizontal: 20,
  },
  journalSaveText: { color: '#ffffff', fontSize: 13, fontWeight: '600' },

  // Appointment
  apptCard: {
    backgroundColor: '#ffffff', borderRadius: 20, padding: 20, marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.04, shadowRadius: 30, elevation: 1,
    borderWidth: 1, borderColor: '#f1f5f9',
  },
  apptHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  apptStatusBadge: { backgroundColor: '#e2effb', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20 },
  apptStatusText: { fontSize: 11, fontWeight: '700', color: '#1e5ab8', textTransform: 'uppercase' },
  apptId: { fontSize: 12, fontWeight: '600', color: '#94a3b8' },
  therapistInfo: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 20 },
  therapistAvatar: {
    width: 54, height: 54, borderRadius: 50, backgroundColor: '#f1f5f9',
    alignItems: 'center', justifyContent: 'center',
  },
  therapistDetails: { flex: 1 },
  therapistName: { fontSize: 18, fontWeight: '700', color: '#1a293b', marginBottom: 4 },
  therapistRole: { fontSize: 13, color: '#64748b', fontWeight: '500' },
  apptTimeInfo: {
    flexDirection: 'row', backgroundColor: '#f8fafc', borderRadius: 16,
    padding: 16, gap: 12, marginBottom: 24,
  },
  timeBlock: { flex: 1, gap: 6 },
  timeDivider: { width: 1.5, backgroundColor: '#e2e8f0', marginHorizontal: 8 },
  timeLabel: { fontSize: 11, fontWeight: '700', color: '#64748b', textTransform: 'uppercase' },
  timeValue: { fontSize: 14, fontWeight: '700', color: '#1a293b' },
  timeCountdown: { fontSize: 10, color: '#387bd5', fontWeight: '600', marginTop: 2 },
  joinBtn: {
    width: '100%', backgroundColor: '#3b82f6', borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    shadowColor: '#3b82f6', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 4,
  },
  joinBtnText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },

  // Recommended
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 10, marginBottom: 4, paddingHorizontal: 4 },
  sectionTitle: { fontSize: 19, fontWeight: '700', color: '#1a293b' },
  sectionLink: { fontSize: 13, fontWeight: '600', color: '#387bd5' },
  contentRow: { marginHorizontal: -20, paddingHorizontal: 20, marginBottom: 30 },
  contentCard: { width: 160, marginRight: 16 },
  contentImgBox: { width: '100%', height: 110, borderRadius: 16, overflow: 'hidden', marginBottom: 10, position: 'relative' },
  contentImgPlaceholder: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
  playOverlay: {
    position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  contentCardTitle: { fontSize: 14, fontWeight: '600', color: '#1a293b', lineHeight: 18, marginBottom: 4 },
  contentCardMeta: { fontSize: 11, fontWeight: '500', color: '#64748b' },

  // ===== BOTTOM NAV =====
  bottomNav: {
    position: 'absolute', bottom: 25, left: 16, right: 16,
    backgroundColor: 'rgba(248, 251, 255, 0.85)',
    borderRadius: 20, paddingVertical: 12,
    borderWidth: 1, borderColor: 'rgba(56, 123, 213, 0.3)',
    shadowColor: '#000', shadowOffset: { width: 0, height: -8 }, shadowOpacity: 0.05, shadowRadius: 24, elevation: 8,
    zIndex: 10,
  },
  bottomNavExpanded: {
    paddingTop: 16, paddingBottom: 16,
    backgroundColor: 'rgba(248, 251, 255, 0.95)',
  },
  navTopRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, marginBottom: 16,
  },
  navBottomRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20,
  },
  navItem: { alignItems: 'center', gap: 4, flex: 1 },
  navItemActive: {},
  navSpacer: { flex: 0, width: 70 },
  navLabel: { fontSize: 11, color: '#8E9AA0', letterSpacing: 0.3 },
  navCenterAbsolute: {
    position: 'absolute', left: '50%', top: -20, transform: [{ translateX: -30 }],
    zIndex: 15,
  },
  navCenterBtn: {
    width: 60, height: 60, borderRadius: 50, backgroundColor: '#ffffff',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(56, 123, 213, 0.3)',
    shadowColor: '#3b82f6', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 20, elevation: 4,
  },
  navCenterImg: { width: 32, height: 32 },

  // ===== NOTIFICATIONS =====
  notificationOverlay: {
    position: 'absolute', inset: 0, backgroundColor: 'rgba(15,23,42,0.2)',
    zIndex: 1000, justifyContent: 'flex-start', alignItems: 'flex-end',
    paddingTop: 75, paddingRight: 20,
  },
  notificationPanel: {
    width: 300, maxHeight: 400, backgroundColor: '#ffffff', borderRadius: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 40, elevation: 10,
    borderWidth: 1, borderColor: '#f1f5f9', overflow: 'hidden',
  },
  notifHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#f1f5f9',
  },
  notifTitle: { fontSize: 18, fontWeight: '700', color: '#1a293b' },
  notifClear: { fontSize: 13, fontWeight: '600', color: '#94a3b8' },
  notifList: {},
  notifItem: {
    flexDirection: 'row', padding: 16, paddingHorizontal: 20, gap: 12,
    borderBottomWidth: 1, borderBottomColor: '#f8fafc',
  },
  notifUnread: { backgroundColor: '#f4f8fd' },
  notifIcon: {
    width: 40, height: 40, borderRadius: 50, backgroundColor: '#e2effb',
    alignItems: 'center', justifyContent: 'center',
  },
  notifContent: { flex: 1 },
  notifText: { fontSize: 13, color: '#1a293b', marginBottom: 6, lineHeight: 18 },
  notifTime: { fontSize: 11, color: '#94a3b8', fontWeight: '500' },

  // ===== HEALI CHAT =====
  healiChatOverlay: {
    position: 'absolute', inset: 0, backgroundColor: 'rgba(15,23,42,0.4)',
    zIndex: 9999, justifyContent: 'flex-end', paddingHorizontal: 16, paddingBottom: 95,
  },
  healiChatContainer: {
    backgroundColor: '#ffffff', width: '100%', height: SCREEN_HEIGHT * 0.7,
    borderRadius: 28, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 40, elevation: 10,
  },
  healiChatHeader: {
    flexDirection: 'row', alignItems: 'center', padding: 20, paddingHorizontal: 24,
    borderBottomWidth: 1, borderBottomColor: '#f1f5f9',
  },
  healiChatAvatar: {
    width: 44, height: 44, borderRadius: 50, backgroundColor: '#f0f8ff',
    alignItems: 'center', justifyContent: 'center', marginRight: 14,
    borderWidth: 1.5, borderColor: '#cbe0f9',
  },
  healiChatTitleBlock: { flex: 1 },
  healiChatTitle: { fontSize: 18, fontWeight: '800', color: '#1a293b' },
  healiChatStatus: { fontSize: 12, color: '#10b981', fontWeight: '600', marginTop: 2 },
  healiChatClose: {
    width: 36, height: 36, borderRadius: 50, backgroundColor: '#f1f5f9',
    alignItems: 'center', justifyContent: 'center',
  },
  healiChatMessages: { flex: 1, padding: 24, backgroundColor: '#fbfcfd' },
  chatBubbleAI: { alignSelf: 'flex-start', maxWidth: '85%', marginBottom: 20 },
  chatBubbleText: {
    padding: 14, paddingHorizontal: 18, borderRadius: 20, borderBottomLeftRadius: 4,
    backgroundColor: '#ffffff', color: '#334155', fontSize: 15, lineHeight: 22,
    borderWidth: 1, borderColor: '#e2e8f0',
  },
  chatTime: { fontSize: 11, color: '#94a3b8', marginTop: 6, paddingHorizontal: 4, fontWeight: '500' },
  healiChatInputArea: {
    flexDirection: 'row', padding: 16, paddingHorizontal: 24, gap: 12,
    backgroundColor: '#ffffff', borderTopWidth: 1, borderTopColor: '#f1f5f9',
    alignItems: 'flex-end',
  },
  healiChatInput: {
    flex: 1, backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0',
    borderRadius: 24, padding: 14, paddingHorizontal: 18, fontSize: 16, color: '#1a293b',
    maxHeight: 120, minHeight: 50,
  },
  healiChatSend: {
    width: 50, height: 50, borderRadius: 50, backgroundColor: '#387bd5',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#387bd5', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 4,
  },
});
