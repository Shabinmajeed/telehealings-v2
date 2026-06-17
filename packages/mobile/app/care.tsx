import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Image,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Polyline, Line, Circle, Rect, Polygon } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = 320;

const Icon = ({ d, size = 24, color = '#000', strokeWidth = 2 }: { d: string; size?: number; color?: string; strokeWidth?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d={d} />
  </Svg>
);

const ICONS = {
  back: 'M19 12H5M12 19l-7-7 7-7',
  star: 'M12 2l3.09 6.26L22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2',
  calendar: 'M3 4h18v18H3z M16 2v4 M8 2v4 M3 10h18',
  video: 'M23 7l-7 5 7 5V7z M1 5h14a2 2 0 012 2v10a2 2 0 01-2 2H1a2 2 0 01-2-2V7a2 2 0 012-2z',
  phone: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z',
  check: 'M20 6L9 17l-4-4',
  verified: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4',
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35',
  home: 'M3 10.5V20a2 2 0 002 2h4v-6h6v6h4a2 2 0 002-2v-9.5M2 12l10-9 10 9',
  care: 'M12 20.5l-8.5-8.5a5.5 5.5 0 017.78-7.78L12 5.28l.72-1.06a5.5 5.5 0 017.78 7.78L12 20.5z M12 8.5v5 M9.5 11h5',
  discover: 'M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3c-2.5 3.5-4 7-4 9s1.5 5.5 4 9c2.5-3.5 4-7 4-9s-1.5-5.5-4-9z',
  messages: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
  profile: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 3a4 4 0 100 8 4 4 0 000-8z',
  settings: 'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 01 0-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 01 0-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z',
  more: 'M4 6h16M4 12h16M4 18h10',
  send: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
  close: 'M18 6L6 18M6 6l12 12',
  heali: 'M12 2a2 2 0 012 2c0 1.1-.9 2-2 2a2 2 0 01-2-2c0-1.1.9-2 2-2zM16 8h-8a2 2 0 00-2 2v4a2 2 0 002 2h8a2 2 0 002-2v-4a2 2 0 00-2-2zM9 16v4a2 2 0 002 2h2a2 2 0 002-2v-4',
};

interface Therapist {
  id: number;
  name: string;
  quote: string;
  tags: string[];
  image: string;
  nextAvailability: string;
  fee: number;
}

const THERAPISTS: Therapist[] = [
  {
    id: 1,
    name: 'John .D',
    quote: '"Healing takes time, and asking for help is a courageous first step."',
    tags: ['Stress', 'Anxiety', '8 Year'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80',
    nextAvailability: 'Today At 04:00 Pm',
    fee: 1500,
  },
  {
    id: 2,
    name: 'Smitha .S',
    quote: '"You don\'t have to have everything figured out right now—just showing up for yourself today is more than enough."',
    tags: ['Anxiety', 'Depression', '10 Year'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    nextAvailability: 'Tomorrow At 10:00 Am',
    fee: 1800,
  },
  {
    id: 3,
    name: 'Sarah .M',
    quote: '"Every journey is unique. We\'ll navigate yours together to find clarity."',
    tags: ['Trauma', 'Couples', '5 Year'],
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80',
    nextAvailability: 'Friday At 01:00 Pm',
    fee: 1200,
  },
];

const TABS = ['Find Support', 'My Appointments', 'My Care'];
const DATES = [
  { day: 'Mon', num: '16' },
  { day: 'Tue', num: '17' },
  { day: 'Wed', num: '18' },
  { day: 'Thu', num: '19' },
  { day: 'Fri', num: '20' },
];
const TIME_SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];
const SESSION_TYPES = [
  { label: 'Video', icon: ICONS.video },
  { label: 'Audio', icon: ICONS.phone },
];

const INITIAL_CHAT = [
  { id: '1', text: "Hi there! I'm Heali. How can I support your wellness journey today?", isUser: false, time: 'Just now' },
];

export default function CareScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Booking modal
  const [showBooking, setShowBooking] = useState(false);
  const [bookingTherapist, setBookingTherapist] = useState<Therapist | null>(null);
  const [selectedDate, setSelectedDate] = useState(1);
  const [selectedTime, setSelectedTime] = useState(0);
  const [selectedSessionType, setSelectedSessionType] = useState(0);

  // Chat modal
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT);
  const [chatInput, setChatInput] = useState('');

  const scrollX = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }).start();
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const openBooking = (therapist: Therapist) => {
    setBookingTherapist(therapist);
    setSelectedDate(1);
    setSelectedTime(0);
    setSelectedSessionType(0);
    setShowBooking(true);
  };

  const handleBookingConfirm = () => {
    setShowBooking(false);
    router.push('/session-confirm' as any);
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = { id: Date.now().toString(), text: chatInput, isUser: true, time: 'Just now' };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      const lower = chatInput.toLowerCase();
      let resp = "Thank you for sharing that with me. I'm here to support you. Is there anything specific you'd like to explore today?";
      if (lower.includes('book') || lower.includes('appointment')) resp = "I can help with that! Browse therapists in the Care tab and tap Book an Appointment.";
      else if (lower.includes('sad') || lower.includes('stress') || lower.includes('anx')) resp = "I hear you. Would you like to try a quick 3-minute guided breathing exercise to help center yourself?";
      else if (lower.includes('hi') || lower.includes('hello')) resp = "Hello! How are you feeling today?";
      else if (lower.includes('thank')) resp = "You're very welcome! I'm always here if you need to talk.";
      setChatMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: resp, isUser: false, time: 'Just now' }]);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.topSection}>
          <LinearGradient colors={['#e7f2ff', '#2366bd']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={StyleSheet.absoluteFillObject} />
          <View style={styles.headerTop}>
            <View style={styles.headerTitles}>
              <Text style={styles.headerTitle}>Care</Text>
              <Text style={styles.headerSubtitle}>Which area would you like to focus on today, Ajesh?</Text>
            </View>
            <Image source={require('../assets/Heali.png')} style={styles.healiSubtle} resizeMode="contain" />
          </View>
          <Svg height={35} width="100%" viewBox={`0 0 ${SCREEN_WIDTH} 35`} preserveAspectRatio="none" style={styles.curveSvg}>
            <Path d={`M0 35 L0 0 Q${SCREEN_WIDTH / 2} 35 ${SCREEN_WIDTH} 0 L${SCREEN_WIDTH} 35 Z`} fill="#fbfcfd" />
          </Svg>
        </View>

        {/* Tabs */}
        <View style={styles.tabsRow}>
          {TABS.map((tab, i) => (
            <TouchableOpacity key={tab} style={styles.tab} onPress={() => setActiveTab(i)}>
              <Text style={[styles.tabText, activeTab === i && styles.tabTextActive]}>{tab}</Text>
              {activeTab === i && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Swipe hint */}
        <View style={styles.swipeHint}>
          <Icon d="M5 12h14M12 5l7 7-7 7" size={14} color="#94a3b8" strokeWidth={2} />
          <Text style={styles.swipeHintText}>Swipe to explore therapists</Text>
        </View>

        {/* Carousel */}
        <Animated.View style={[styles.carouselContainer, { opacity: fadeAnim }]}>
          <Animated.ScrollView
            horizontal
            pagingEnabled={false}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH}
            decelerationRate="fast"
            contentContainerStyle={styles.carouselContent}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
              useNativeDriver: false,
              listener: (e: any) => {
                const idx = Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH);
                setActiveCard(idx);
              },
            })}
            scrollEventThrottle={16}
          >
            {THERAPISTS.map((t, i) => (
              <TherapistCard
                key={t.id}
                therapist={t}
                isActive={activeCard === i}
                isFavorite={favorites.includes(t.id)}
                onToggleFavorite={() => toggleFavorite(t.id)}
                onBook={() => openBooking(t)}
              />
            ))}
            {/* Explore More card */}
            <TouchableOpacity style={styles.exploreCard} onPress={() => router.push('/therapist-list' as any)}>
              <LinearGradient colors={['#e7f2ff', '#2366bd']} style={styles.exploreGradient}>
                <View style={styles.exploreIcon}>
                  <Icon d={ICONS.search} size={32} color="#ffffff" strokeWidth={2} />
                </View>
                <Text style={styles.exploreTitle}>Explore More Therapists</Text>
                <Text style={styles.exploreText}>Browse our full directory with filters for specialty, language, and availability.</Text>
                <View style={styles.exploreBtn}>
                  <Text style={styles.exploreBtnText}>View All Therapists →</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.ScrollView>
        </Animated.View>

        {/* Dots */}
        <View style={styles.dotsRow}>
          {[0, 1, 2, 3].map(i => (
            <View key={i} style={[styles.dot, activeCard === i && styles.dotActive]} />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <BottomNav router={router} activeTab="care" onHealiPress={() => setShowChat(true)} />

      {/* Booking Modal */}
      <Modal visible={showBooking} transparent animationType="slide" onRequestClose={() => setShowBooking(false)}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalOverlayTouch} onPress={() => setShowBooking(false)} />
          <View style={styles.bookingContent}>
            <TouchableOpacity style={styles.bookingHeader} onPress={() => setShowBooking(false)}>
              <Icon d={ICONS.back} size={24} color="#ffffff" strokeWidth={2.5} />
              <Text style={styles.bookingHeaderText}>Back</Text>
            </TouchableOpacity>

            <View style={styles.bookingCard}>
              <Text style={styles.bookingCardTitle}>Session Details</Text>
              <Text style={styles.bookingCardMain}>{bookingTherapist?.name}</Text>
              <Text style={styles.bookingCardSub}>50 minutes • ₹ {bookingTherapist?.fee}</Text>
            </View>

            <Text style={styles.bookingSectionTitle}>Select Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
              {DATES.map((d, i) => (
                <TouchableOpacity
                  key={d.num}
                  style={[styles.dateBox, selectedDate === i && styles.dateBoxActive]}
                  onPress={() => setSelectedDate(i)}
                >
                  <Text style={[styles.dateDay, selectedDate === i && styles.dateDayActive]}>{d.day}</Text>
                  <Text style={[styles.dateNum, selectedDate === i && styles.dateNumActive]}>{d.num}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.bookingSectionTitle}>Time Slot</Text>
            <View style={styles.optionsGrid}>
              {TIME_SLOTS.map((t, i) => (
                <TouchableOpacity
                  key={t}
                  style={[styles.optionBtn, selectedTime === i && styles.optionBtnActive]}
                  onPress={() => setSelectedTime(i)}
                >
                  <Text style={[styles.optionBtnText, selectedTime === i && styles.optionBtnTextActive]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.bookingSectionTitle}>Session Type</Text>
            <View style={styles.optionsGrid}>
              {SESSION_TYPES.map((s, i) => (
                <TouchableOpacity
                  key={s.label}
                  style={[styles.optionBtn, selectedSessionType === i && styles.optionBtnActive]}
                  onPress={() => setSelectedSessionType(i)}
                >
                  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={selectedSessionType === i ? '#ffffff' : '#64748b'} strokeWidth={2}>
                    <Path d={s.icon} />
                  </Svg>
                  <Text style={[styles.optionBtnText, selectedSessionType === i && styles.optionBtnTextActive]}>{s.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.confirmBtn} onPress={handleBookingConfirm}>
              <Text style={styles.confirmBtnText}>Confirm Appointment</Text>
              <Icon d="M5 12h14M12 5l7 7-7 7" size={20} color="#ffffff" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Heali Chat Modal */}
      <Modal visible={showChat} transparent animationType="fade" onRequestClose={() => setShowChat(false)}>
        <View style={styles.chatOverlay}>
          <TouchableOpacity style={styles.chatOverlayTouch} onPress={() => setShowChat(false)} />
          <View style={styles.chatContainer}>
            <View style={styles.chatHeader}>
              <View style={styles.chatAvatar}>
                <Icon d={ICONS.heali} size={24} color="#387bd5" strokeWidth={2.2} />
              </View>
              <View style={styles.chatTitleBlock}>
                <Text style={styles.chatTitle}>Heali AI</Text>
                <View style={styles.chatStatus}>
                  <View style={styles.chatStatusDot} />
                  <Text style={styles.chatStatusText}>Online</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.chatClose} onPress={() => setShowChat(false)}>
                <Icon d={ICONS.close} size={20} color="#64748b" strokeWidth={2.5} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.chatMessages} contentContainerStyle={styles.chatMessagesContent}>
              {chatMessages.map(msg => (
                <View key={msg.id} style={[styles.chatBubbleWrapper, msg.isUser ? styles.chatBubbleUser : styles.chatBubbleAi]}>
                  <View style={[styles.chatBubble, msg.isUser ? styles.chatBubbleUserBg : styles.chatBubbleAiBg]}>
                    <Text style={[styles.chatBubbleText, msg.isUser && styles.chatBubbleTextUser]}>{msg.text}</Text>
                  </View>
                  <Text style={styles.chatTime}>{msg.time}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.chatInputArea}>
              <TextInput
                style={styles.chatInput}
                placeholder="Message Heali..."
                placeholderTextColor="#94a3b8"
                value={chatInput}
                onChangeText={setChatInput}
                multiline
                onSubmitEditing={sendMessage}
                blurOnSubmit={false}
              />
              <TouchableOpacity style={styles.chatSend} onPress={sendMessage}>
                <Icon d={ICONS.send} size={20} color="#ffffff" strokeWidth={2.5} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function TherapistCard({ therapist: t, isActive, isFavorite, onToggleFavorite, onBook }: {
  therapist: Therapist; isActive: boolean; isFavorite: boolean;
  onToggleFavorite: () => void; onBook: () => void;
}) {
  return (
    <View style={[styles.carouselCard, isActive && styles.carouselCardActive]}>
      <Image source={{ uri: t.image }} style={styles.cardImage} resizeMode="cover" />
      <TouchableOpacity style={[styles.starBtn, isFavorite && styles.starBtnFavorited]} onPress={onToggleFavorite}>
        <Svg width={20} height={20} viewBox="0 0 24 24" fill={isFavorite ? '#f59e0b' : 'none'} stroke={isFavorite ? '#f59e0b' : '#94a3b8'} strokeWidth={2}>
          <Polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </Svg>
      </TouchableOpacity>
      {isActive && (
        <View style={styles.cardContent}>
          <Text style={styles.cardQuote}>{t.quote}</Text>
          <View style={styles.cardTitleRow}>
            <Text style={styles.cardName}>{t.name}</Text>
            <View style={styles.verifiedBadge}>
              <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth={2.5}>
                <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <Polyline points="9 12 11 14 15 10" />
              </Svg>
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>
          <View style={styles.tagsRow}>
            {t.tags.map(tag => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.bookBtn} onPress={onBook}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2}>
              <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <Line x1="16" y1="2" x2="16" y2="6" />
              <Line x1="8" y1="2" x2="8" y2="6" />
              <Line x1="3" y1="10" x2="21" y2="10" />
            </Svg>
            <View style={styles.bookBtnTextWrap}>
              <Text style={styles.bookTitle}>Book an Appointment</Text>
              <Text style={styles.bookSub}>Next Availability {t.nextAvailability}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

function BottomNav({ router: navRouter, activeTab, onHealiPress }: {
  router: any; activeTab: string; onHealiPress: () => void;
}) {
  return (
    <View style={styles.bottomNav}>
      <View style={styles.navRow}>
        <TouchableOpacity style={styles.navItem} onPress={() => navRouter.push('/home' as any)}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'home' ? '#387bd5' : '#8E9AA0'} strokeWidth={2.2}>
            <Path d={ICONS.home} />
          </Svg>
          <Text style={[styles.navLabel, activeTab === 'home' && styles.navLabelActive]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navItem, activeTab === 'care' && styles.navItemActive]} onPress={() => {}}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'care' ? '#387bd5' : '#8E9AA0'} strokeWidth={2.2}>
            <Path d={ICONS.care} />
          </Svg>
          <Text style={[styles.navLabel, activeTab === 'care' && styles.navLabelActive]}>Care</Text>
        </TouchableOpacity>

        <View style={styles.navSpacer} />

        <TouchableOpacity style={styles.navItem} onPress={() => navRouter.push('/discover' as any)}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'discover' ? '#387bd5' : '#8E9AA0'} strokeWidth={2.2}>
            <Path d={ICONS.discover} />
          </Svg>
          <Text style={[styles.navLabel, activeTab === 'discover' && styles.navLabelActive]}>Discover</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navRouter.push('/messages' as any)}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'messages' ? '#387bd5' : '#8E9AA0'} strokeWidth={2.2}>
            <Path d={ICONS.messages} />
          </Svg>
          <Text style={[styles.navLabel, activeTab === 'messages' && styles.navLabelActive]}>Messages</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.navCenterBtn} onPress={onHealiPress}>
        <Image source={require('../assets/Heali.png')} style={styles.navCenterImg} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fbfcfd' },
  scrollContent: { flexGrow: 1, paddingBottom: 100 },
  topSection: {
    paddingTop: 18, paddingBottom: 30, paddingHorizontal: 20,
    position: 'relative', overflow: 'hidden',
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  headerTitles: { flex: 1, marginRight: 15 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#ffffff', letterSpacing: -0.5 },
  headerSubtitle: { fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.85)', lineHeight: 18 },
  healiSubtle: { width: 36, height: 36 },
  curveSvg: { position: 'absolute', bottom: -1, left: 0, right: 0 },

  // Tabs
  tabsRow: { flexDirection: 'row', gap: 24, paddingHorizontal: 24, marginBottom: 20 },
  tab: { paddingBottom: 8 },
  tabText: { fontSize: 15, fontWeight: '500', color: '#64748b' },
  tabTextActive: { fontWeight: '700', color: '#1e5ab8' },
  tabIndicator: { height: 2, backgroundColor: '#1e5ab8', marginTop: 4, borderRadius: 1 },

  // Swipe hint
  swipeHint: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 12 },
  swipeHintText: { fontSize: 11, color: '#94a3b8' },

  // Carousel
  carouselContainer: { paddingBottom: 10 },
  carouselContent: { paddingHorizontal: (SCREEN_WIDTH - CARD_WIDTH) / 2, alignItems: 'center' },
  carouselCard: {
    width: CARD_WIDTH, height: 480, borderRadius: 24, overflow: 'hidden',
    backgroundColor: '#ffffff', marginHorizontal: 0,
    shadowColor: '#000', shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12, shadowRadius: 30, elevation: 8,
    opacity: 0.6, transform: [{ scale: 0.85 }],
  },
  carouselCardActive: {
    opacity: 1, transform: [{ scale: 1 }],
    shadowOpacity: 0.15,
  },
  cardImage: { width: '100%', height: '100%' },
  starBtn: {
    position: 'absolute', top: 16, left: 16, width: 40, height: 40,
    borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, shadowRadius: 12, elevation: 4, zIndex: 10,
  },
  starBtnFavorited: { backgroundColor: 'rgba(245,158,11,0.15)' },
  cardContent: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(15,23,42,0.85)',
    paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20,
  },
  cardQuote: { fontSize: 13, fontStyle: 'italic', color: '#cbd5e1', lineHeight: 19, marginBottom: 12 },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  cardName: { fontSize: 25, fontWeight: '600', color: '#ffffff' },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  verifiedText: { fontSize: 10, fontWeight: '600', color: '#60a5fa' },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginBottom: 12 },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.15)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 4, paddingHorizontal: 12, borderRadius: 16,
  },
  tagText: { fontSize: 11, color: '#ffffff' },
  bookBtn: {
    width: '100%', backgroundColor: '#2563eb', borderRadius: 14, padding: 10,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12,
    shadowColor: '#2563eb', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3, shadowRadius: 16, elevation: 4,
  },
  bookBtnTextWrap: { flex: 1 },
  bookTitle: { fontSize: 13, fontWeight: '600', color: '#ffffff', marginBottom: 2 },
  bookSub: { fontSize: 9, fontWeight: '300', color: '#a4c2ee' },

  // Explore card
  exploreCard: { width: CARD_WIDTH, height: 480, borderRadius: 24, overflow: 'hidden', marginHorizontal: 0 },
  exploreGradient: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
  exploreIcon: {
    width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  exploreTitle: { color: '#ffffff', fontSize: 20, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  exploreText: { color: 'rgba(255,255,255,0.85)', fontSize: 13, lineHeight: 19, textAlign: 'center' },
  exploreBtn: { marginTop: 20, paddingVertical: 10, paddingHorizontal: 24, backgroundColor: '#ffffff', borderRadius: 20 },
  exploreBtnText: { color: '#1e5ab8', fontSize: 14, fontWeight: '600' },

  // Dots
  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 16, marginBottom: 16 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#cbd5e1' },
  dotActive: { backgroundColor: '#387bd5', width: 24, borderRadius: 4 },

  // Bottom Nav
  bottomNav: {
    position: 'absolute', bottom: 25, left: 16, right: 16,
    backgroundColor: 'rgba(248,251,255,0.85)', borderRadius: 20,
    paddingVertical: 12, paddingHorizontal: 20,
    borderWidth: 1, borderColor: 'rgba(56,123,213,0.3)',
    shadowColor: '#000', shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.05, shadowRadius: 24, elevation: 8,
  },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  navItem: { flex: 1, alignItems: 'center', gap: 4 },
  navItemActive: {},
  navLabel: { fontSize: 11, color: '#8E9AA0', letterSpacing: 0.3 },
  navLabelActive: { fontWeight: '600', color: '#387bd5' },
  navSpacer: { width: 70 },
  navCenterBtn: {
    position: 'absolute', top: -20, left: '50%', marginLeft: -30,
    width: 60, height: 60, borderRadius: 30, backgroundColor: '#ffffff',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(56,123,213,0.3)',
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12, shadowRadius: 20, elevation: 8,
  },
  navCenterImg: { width: 32, height: 32 },

  // Booking Modal
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(15,23,42,0.5)' },
  modalOverlayTouch: { flex: 1 },
  bookingContent: {
    backgroundColor: '#8291a4', borderTopLeftRadius: 32, borderTopRightRadius: 32,
    padding: 24, maxHeight: '90%',
  },
  bookingHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, gap: 12 },
  bookingHeaderText: { color: '#ffffff', fontSize: 18, fontWeight: '700' },
  bookingCard: {
    backgroundColor: '#ffffff', borderRadius: 20, padding: 20, marginBottom: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 2,
  },
  bookingCardTitle: { fontSize: 11, fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: 8 },
  bookingCardMain: { fontSize: 22, fontWeight: '800', color: '#0f172a', marginBottom: 8 },
  bookingCardSub: { fontSize: 14, color: '#475569' },
  bookingSectionTitle: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    color: '#ffffff', fontSize: 13, fontWeight: '700', marginBottom: 16,
    borderBottomWidth: 2, borderBottomColor: 'rgba(255,255,255,0.4)', paddingBottom: 5,
  },
  dateScroll: { marginBottom: 10 },
  dateBox: {
    backgroundColor: '#ffffff', minWidth: 65, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center', height: 60, marginRight: 12,
  },
  dateBoxActive: { backgroundColor: '#3b82f6' },
  dateDay: { fontSize: 11, fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: 8 },
  dateDayActive: { color: '#ffffff' },
  dateNum: { fontSize: 20, fontWeight: '800', color: '#0f172a' },
  dateNumActive: { color: '#ffffff' },
  optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 5 },
  optionBtn: {
    backgroundColor: '#ffffff', borderRadius: 12, padding: 14,
    alignItems: 'center', justifyContent: 'center', gap: 8,
    minWidth: '30%', flex: 1,
  },
  optionBtnActive: { backgroundColor: '#3b82f6' },
  optionBtnText: { fontSize: 14, fontWeight: '600', color: '#334155' },
  optionBtnTextActive: { color: '#ffffff' },
  confirmBtn: {
    backgroundColor: '#3b82f6', borderRadius: 16, padding: 18,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12,
    marginTop: 32, width: '100%',
    shadowColor: '#3b82f6', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3, shadowRadius: 20, elevation: 4,
  },
  confirmBtnText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },

  // Chat Modal
  chatOverlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.4)', justifyContent: 'flex-end', paddingHorizontal: 16, paddingBottom: 95 },
  chatOverlayTouch: { ...StyleSheet.absoluteFillObject },
  chatContainer: {
    backgroundColor: '#ffffff', borderRadius: 28, height: '70%', maxHeight: 700,
    shadowColor: '#000', shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2, shadowRadius: 40, elevation: 10,
  },
  chatHeader: {
    flexDirection: 'row', alignItems: 'center', padding: 20, paddingHorizontal: 24,
    borderBottomWidth: 1, borderBottomColor: '#f1f5f9',
  },
  chatAvatar: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: '#f0f8ff',
    alignItems: 'center', justifyContent: 'center', marginRight: 14,
    borderWidth: 1.5, borderColor: '#cbe0f9',
  },
  chatTitleBlock: { flex: 1 },
  chatTitle: { fontSize: 18, fontWeight: '800', color: '#1a293b' },
  chatStatus: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  chatStatusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10b981' },
  chatStatusText: { fontSize: 12, color: '#10b981', fontWeight: '600' },
  chatClose: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: '#f1f5f9',
    alignItems: 'center', justifyContent: 'center',
  },
  chatMessages: { flex: 1, padding: 24 },
  chatMessagesContent: { gap: 20 },
  chatBubbleWrapper: { maxWidth: '85%' },
  chatBubbleAi: { alignSelf: 'flex-start' },
  chatBubbleUser: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  chatBubble: { padding: 14, paddingHorizontal: 18, borderRadius: 20 },
  chatBubbleAiBg: { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e2e8f0', borderBottomLeftRadius: 4 },
  chatBubbleUserBg: { backgroundColor: '#3b82f6', borderBottomRightRadius: 4 },
  chatBubbleText: { fontSize: 15, lineHeight: 22, color: '#334155' },
  chatBubbleTextUser: { color: '#ffffff' },
  chatTime: { fontSize: 11, color: '#94a3b8', marginTop: 6, paddingHorizontal: 4 },
  chatInputArea: {
    padding: 16, paddingHorizontal: 24, backgroundColor: '#ffffff',
    borderTopWidth: 1, borderTopColor: '#f1f5f9',
    flexDirection: 'row', gap: 12, alignItems: 'flex-end',
  },
  chatInput: {
    flex: 1, backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0',
    borderRadius: 24, padding: 14, paddingHorizontal: 18, fontSize: 16,
    maxHeight: 120, minHeight: 50, color: '#1a293b',
  },
  chatSend: {
    width: 50, height: 50, borderRadius: 25, backgroundColor: '#387bd5',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#387bd5', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, shadowRadius: 12, elevation: 4,
  },
});
