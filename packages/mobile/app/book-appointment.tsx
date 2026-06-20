import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import api from '../api/client';

interface TimeSlot {
  time: string;
  available: boolean;
}

const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
];

const DURATIONS = [
  { label: '30 min', value: 30 },
  { label: '45 min', value: 45 },
  { label: '60 min', value: 60 },
  { label: '90 min', value: 90 },
];

const SESSION_TYPES = [
  { label: 'Video Call', value: 'VIDEO', icon: '📹' },
  { label: 'Audio Call', value: 'AUDIO', icon: '📞' },
  { label: 'Chat', value: 'CHAT', icon: '💬' },
];

export default function BookAppointmentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const therapistId = params.therapistId as string;
  const therapistName = params.therapistName as string || 'Therapist';

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [selectedType, setSelectedType] = useState('VIDEO');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState<TimeSlot[]>([]);

  // Generate next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      date: d.toISOString().split('T')[0],
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNum: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
    };
  });

  useEffect(() => {
    // Fetch therapist availability
    if (therapistId) {
      api.get(`/api/booking/therapists/${therapistId}/availability`)
        .then(res => {
          const avail = res.data || [];
          // Map availability to time slots
          const slots = TIME_SLOTS.map(time => ({
            time,
            available: true, // Default to available
          }));
          setAvailability(slots);
        })
        .catch(() => {
          // Default all slots available
          setAvailability(TIME_SLOTS.map(time => ({ time, available: true })));
        });
    }
  }, [therapistId]);

  const handleBook = async () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Missing Info', 'Please select a date and time slot.');
      return;
    }

    // Parse date + time into ISO string
    const timeParts = selectedTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!timeParts) return;
    let hours = parseInt(timeParts[1]);
    const minutes = parseInt(timeParts[2]);
    const ampm = timeParts[3].toUpperCase();
    if (ampm === 'PM' && hours !== 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;

    const scheduledAt = new Date(`${selectedDate}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`);

    setLoading(true);
    try {
      const res = await api.post('/api/booking/appointments', {
        therapistId,
        scheduledAt: scheduledAt.toISOString(),
        duration: selectedDuration,
        type: selectedType,
        notes: notes.trim() || undefined,
      });

      const appointment = res.data;
      router.replace({
        pathname: '/booking-confirmed',
        params: {
          appointmentId: appointment.id,
          therapistName,
          date: selectedDate,
          time: selectedTime,
          duration: String(selectedDuration),
          type: selectedType,
        },
      });
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to book appointment. Please try again.';
      Alert.alert('Booking Failed', Array.isArray(msg) ? msg.join(', ') : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={s.container}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backText}>←</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Book Session</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={s.content} showsVerticalScrollIndicator={false}>
        {/* Therapist Info */}
        <View style={s.therapistCard}>
          <View style={s.therapistAvatar}>
            <Text style={s.therapistInitials}>{therapistName.split(' ').map(n => n[0]).join('').substring(0, 2)}</Text>
          </View>
          <View>
            <Text style={s.therapistName}>{therapistName}</Text>
            <Text style={s.therapistDetail}>Select your preferred session</Text>
          </View>
        </View>

        {/* Date Selection */}
        <Text style={s.sectionTitle}>Select Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.dateRow}>
          {dates.map((d) => (
            <TouchableOpacity
              key={d.date}
              style={[s.dateChip, selectedDate === d.date && s.dateChipActive]}
              onPress={() => setSelectedDate(d.date)}
            >
              <Text style={[s.dateDay, selectedDate === d.date && s.dateChipTextActive]}>{d.day}</Text>
              <Text style={[s.dateNum, selectedDate === d.date && s.dateChipTextActive]}>{d.dayNum}</Text>
              <Text style={[s.dateMonth, selectedDate === d.date && s.dateChipTextActive]}>{d.month}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Time Selection */}
        <Text style={s.sectionTitle}>Select Time</Text>
        <View style={s.timeGrid}>
          {TIME_SLOTS.map((slot) => {
            const isAvailable = availability.find(a => a.time === slot)?.available !== false;
            return (
              <TouchableOpacity
                key={slot}
                style={[s.timeChip, selectedTime === slot && s.timeChipActive, !isAvailable && s.timeChipDisabled]}
                onPress={() => isAvailable && setSelectedTime(slot)}
                disabled={!isAvailable}
              >
                <Text style={[s.timeText, selectedTime === slot && s.timeTextActive, !isAvailable && s.timeTextDisabled]}>{slot}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Duration */}
        <Text style={s.sectionTitle}>Duration</Text>
        <View style={s.durationRow}>
          {DURATIONS.map((d) => (
            <TouchableOpacity
              key={d.value}
              style={[s.durationChip, selectedDuration === d.value && s.durationChipActive]}
              onPress={() => setSelectedDuration(d.value)}
            >
              <Text style={[s.durationText, selectedDuration === d.value && s.durationTextActive]}>{d.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Session Type */}
        <Text style={s.sectionTitle}>Session Type</Text>
        <View style={s.typeRow}>
          {SESSION_TYPES.map((t) => (
            <TouchableOpacity
              key={t.value}
              style={[s.typeChip, selectedType === t.value && s.typeChipActive]}
              onPress={() => setSelectedType(t.value)}
            >
              <Text style={s.typeIcon}>{t.icon}</Text>
              <Text style={[s.typeText, selectedType === t.value && s.typeTextActive]}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Notes */}
        <Text style={s.sectionTitle}>Notes (optional)</Text>
        <View style={s.notesContainer}>
          <TextInput
            style={s.notesInput}
            placeholder="Anything your therapist should know..."
            placeholderTextColor="#94a3b8"
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Book Button */}
      <View style={s.footer}>
        <TouchableOpacity
          style={[s.bookBtn, (!selectedDate || !selectedTime || loading) && s.bookBtnDisabled]}
          onPress={handleBook}
          disabled={!selectedDate || !selectedTime || loading}
        >
          <Text style={s.bookBtnText}>
            {loading ? 'Booking...' : 'Confirm Booking'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  backBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  backText: { fontSize: 24, color: '#1a293b' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1a293b' },
  content: { flex: 1, padding: 16 },
  therapistCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 20 },
  therapistAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#387bd5', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  therapistInitials: { color: '#fff', fontSize: 16, fontWeight: '700' },
  therapistName: { fontSize: 16, fontWeight: '700', color: '#1a293b' },
  therapistDetail: { fontSize: 13, color: '#64748b', marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1a293b', marginBottom: 12, marginTop: 8 },
  dateRow: { marginBottom: 8 },
  dateChip: { width: 64, alignItems: 'center', paddingVertical: 10, borderRadius: 12, backgroundColor: '#fff', marginRight: 8, borderWidth: 1.5, borderColor: '#e2e8f0' },
  dateChipActive: { backgroundColor: '#387bd5', borderColor: '#387bd5' },
  dateDay: { fontSize: 11, color: '#64748b', fontWeight: '500' },
  dateNum: { fontSize: 18, fontWeight: '700', color: '#1a293b', marginTop: 2 },
  dateMonth: { fontSize: 11, color: '#64748b', marginTop: 1 },
  dateChipTextActive: { color: '#fff' },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  timeChip: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#e2e8f0' },
  timeChipActive: { backgroundColor: '#387bd5', borderColor: '#387bd5' },
  timeChipDisabled: { backgroundColor: '#f1f5f9', borderColor: '#e2e8f0' },
  timeText: { fontSize: 13, fontWeight: '600', color: '#1a293b' },
  timeTextActive: { color: '#fff' },
  timeTextDisabled: { color: '#94a3b8' },
  durationRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  durationChip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#e2e8f0' },
  durationChipActive: { backgroundColor: '#387bd5', borderColor: '#387bd5' },
  durationText: { fontSize: 13, fontWeight: '600', color: '#1a293b' },
  durationTextActive: { color: '#fff' },
  typeRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  typeChip: { flex: 1, alignItems: 'center', paddingVertical: 12, borderRadius: 12, backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#e2e8f0' },
  typeChipActive: { backgroundColor: '#387bd5', borderColor: '#387bd5' },
  typeIcon: { fontSize: 20, marginBottom: 4 },
  typeText: { fontSize: 12, fontWeight: '600', color: '#1a293b' },
  typeTextActive: { color: '#fff' },
  notesContainer: { backgroundColor: '#fff', borderRadius: 12, borderWidth: 1.5, borderColor: '#e2e8f0', padding: 12 },
  notesInput: { fontSize: 14, color: '#1a293b', minHeight: 60, textAlignVertical: 'top' },
  footer: { padding: 16, paddingBottom: 32, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e2e8f0' },
  bookBtn: { backgroundColor: '#387bd5', borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  bookBtnDisabled: { backgroundColor: '#94a3b8' },
  bookBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
