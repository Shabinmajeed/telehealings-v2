import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, RefreshControl, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../api/client';

interface Appointment {
  id: string;
  scheduledAt: string;
  duration: number;
  type: 'VIDEO' | 'AUDIO' | 'CHAT';
  status: 'SCHEDULED' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  notes?: string | null;
  TherapistProfile?: {
    User?: {
      id: string;
      firstName: string;
      lastName: string;
      avatarUrl?: string | null;
    };
  };
}

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  SCHEDULED: { bg: '#eff6ff', text: '#1e40af' },
  CONFIRMED: { bg: '#f0fdf4', text: '#166534' },
  IN_PROGRESS: { bg: '#fef3c7', text: '#92400e' },
  COMPLETED: { bg: '#dcfce7', text: '#059669' },
  CANCELLED: { bg: '#fef2f2', text: '#991b1b' },
  NO_SHOW: { bg: '#f1f5f9', text: '#475569' },
};

export default function MyAppointmentsScreen() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');

  const fetchAppointments = async () => {
    try {
      const res = await api.get('/api/booking/appointments', { params: { limit: 50 } });
      setAppointments(res.data?.data || []);
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchAppointments(); }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAppointments();
  }, []);

  const handleCancel = (appointment: Appointment) => {
    Alert.alert(
      'Cancel Appointment',
      'Are you sure you want to cancel this appointment?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/api/booking/appointments/${appointment.id}`);
              fetchAppointments();
            } catch (err: any) {
              Alert.alert('Error', err.response?.data?.message || 'Failed to cancel');
            }
          },
        },
      ]
    );
  };

  const now = new Date();
  const filtered = appointments.filter(a => {
    const apptDate = new Date(a.scheduledAt);
    if (filter === 'upcoming') return apptDate >= now && a.status !== 'CANCELLED';
    if (filter === 'past') return apptDate < now || a.status === 'CANCELLED';
    return true;
  });

  return (
    <View style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backText}>←</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>My Appointments</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Filter Tabs */}
      <View style={s.tabs}>
        {(['upcoming', 'past', 'all'] as const).map(f => (
          <TouchableOpacity key={f} style={[s.tab, filter === f && s.tabActive]} onPress={() => setFilter(f)}>
            <Text style={[s.tabText, filter === f && s.tabTextActive]}>{f.charAt(0).toUpperCase() + f.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={s.list} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {loading ? (
          <View style={s.centered}><Text style={s.loadingText}>Loading...</Text></View>
        ) : filtered.length === 0 ? (
          <View style={s.empty}>
            <Text style={s.emptyText}>No appointments</Text>
            <Text style={s.emptySubtext}>Book a session with a therapist to get started</Text>
          </View>
        ) : (
          filtered.map(a => {
            const apptDate = new Date(a.scheduledAt);
            const therapistName = a.TherapistProfile?.User
              ? `${a.TherapistProfile.User.firstName} ${a.TherapistProfile.User.lastName}`
              : 'Therapist';
            const statusColor = STATUS_COLORS[a.status] || STATUS_COLORS.SCHEDULED;

            return (
              <View key={a.id} style={s.card}>
                <View style={s.cardHeader}>
                  <View style={s.avatar}>
                    <Text style={s.avatarText}>{therapistName.split(' ').map(n => n[0]).join('').substring(0, 2)}</Text>
                  </View>
                  <View style={s.cardInfo}>
                    <Text style={s.therapistName}>{therapistName}</Text>
                    <Text style={s.apptDate}>{apptDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} • {apptDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</Text>
                    <View style={s.cardMeta}>
                      <View style={[s.statusBadge, { backgroundColor: statusColor.bg }]}>
                        <Text style={[s.statusText, { color: statusColor.text }]}>{a.status}</Text>
                      </View>
                      <Text style={s.durationText}>{a.duration} min • {a.type}</Text>
                    </View>
                  </View>
                </View>
                {a.status === 'SCHEDULED' || a.status === 'CONFIRMED' ? (
                  <View style={s.cardActions}>
                    <TouchableOpacity style={s.cancelBtn} onPress={() => handleCancel(a)}>
                      <Text style={s.cancelBtnText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            );
          })
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  backBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  backText: { fontSize: 24, color: '#1a293b' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1a293b' },
  tabs: { flexDirection: 'row', paddingHorizontal: 16, paddingTop: 12, gap: 8, backgroundColor: '#fff', paddingBottom: 12 },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f1f5f9' },
  tabActive: { backgroundColor: '#387bd5' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#64748b' },
  tabTextActive: { color: '#fff' },
  list: { flex: 1, padding: 16 },
  centered: { paddingTop: 60, alignItems: 'center' },
  loadingText: { fontSize: 15, color: '#64748b' },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 18, fontWeight: '600', color: '#1a293b', marginBottom: 8 },
  emptySubtext: { fontSize: 14, color: '#64748b' },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  cardHeader: { flexDirection: 'row' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#387bd5', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  cardInfo: { flex: 1 },
  therapistName: { fontSize: 16, fontWeight: '700', color: '#1a293b', marginBottom: 2 },
  apptDate: { fontSize: 14, color: '#64748b', marginBottom: 6 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
  statusText: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase' as const },
  durationText: { fontSize: 12, color: '#94a3b8' },
  cardActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  cancelBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#fecaca' },
  cancelBtnText: { fontSize: 13, fontWeight: '600', color: '#dc2626' },
});
