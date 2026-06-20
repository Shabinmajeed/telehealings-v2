import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../api/client';

const SPECIALIZATIONS = ['All', 'Anxiety', 'Depression', 'Trauma', 'Relationships', 'Addiction', 'Eating Disorders', 'Stress Management', 'Grief'];

interface Therapist {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  TherapistProfile: {
    specialization: string[];
    bio: string | null;
    yearsExperience: number;
    rating: number;
    totalSessions: number;
    hourlyRate: number | null;
  };
}

export default function TherapistDiscoveryScreen() {
  const router = useRouter();
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTherapists = async (p = 1, append = false) => {
    try {
      const params: any = { page: p, limit: 12 };
      if (search.trim()) params.search = search.trim();
      if (selectedSpec !== 'All') params.specialization = selectedSpec;

      const res = await api.get('/booking/therapists', { params });
      const { data, totalPages: tp } = res.data;
      setTherapists(append ? [...therapists, ...data] : data);
      setTotalPages(tp);
    } catch (err) {
      console.error('Failed to fetch therapists:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setPage(1);
    fetchTherapists(1);
  }, [search, selectedSpec]);

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchTherapists(1);
  };

  const loadMore = () => {
    if (page < totalPages && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchTherapists(nextPage, true);
    }
  };

  const handleBook = (therapist: Therapist) => {
    router.push({
      pathname: '/care',
      params: { therapistId: therapist.id, therapistName: `${therapist.firstName} ${therapist.lastName}` },
    });
  };

  if (loading && therapists.length === 0) {
    return (
      <View style={s.centered}>
        <ActivityIndicator size="large" color="#387bd5" />
        <Text style={s.loadingText}>Finding therapists...</Text>
      </View>
    );
  }

  return (
    <View style={s.container}>
      {/* Search */}
      <View style={s.searchBar}>
        <TextInput
          style={s.searchInput}
          placeholder="Search therapists..."
          placeholderTextColor="#94a3b8"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Specialization Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.filterRow}>
        {SPECIALIZATIONS.map((spec) => (
          <TouchableOpacity
            key={spec}
            style={[s.filterChip, selectedSpec === spec && s.filterChipActive]}
            onPress={() => setSelectedSpec(spec)}
          >
            <Text style={[s.filterChipText, selectedSpec === spec && s.filterChipTextActive]}>{spec}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results */}
      <ScrollView
        style={s.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 100) {
            loadMore();
          }
        }}
        scrollEventThrottle={400}
      >
        {therapists.length === 0 ? (
          <View style={s.empty}>
            <Text style={s.emptyText}>No therapists found</Text>
            <Text style={s.emptySubtext}>Try adjusting your search or filters</Text>
          </View>
        ) : (
          therapists.map((t) => (
            <View key={t.id} style={s.card}>
              <View style={s.cardHeader}>
                <View style={s.avatar}>
                  <Text style={s.avatarText}>{t.firstName[0]}{t.lastName[0]}</Text>
                </View>
                <View style={s.cardInfo}>
                  <Text style={s.name}>Dr. {t.firstName} {t.lastName}</Text>
                  <Text style={s.spec}>{t.TherapistProfile.specialization.join(', ')}</Text>
                  <View style={s.meta}>
                    <Text style={s.metaText}>⭐ {t.TherapistProfile.rating.toFixed(1)}</Text>
                    <Text style={s.metaDot}>•</Text>
                    <Text style={s.metaText}>{t.TherapistProfile.totalSessions} sessions</Text>
                    <Text style={s.metaDot}>•</Text>
                    <Text style={s.metaText}>{t.TherapistProfile.yearsExperience} yrs exp</Text>
                  </View>
                </View>
              </View>
              {t.TherapistProfile.bio ? (
                <Text style={s.bio} numberOfLines={2}>{t.TherapistProfile.bio}</Text>
              ) : null}
              <View style={s.cardFooter}>
                <Text style={s.rate}>{t.TherapistProfile.hourlyRate ? `$${t.TherapistProfile.hourlyRate}/hr` : 'Contact for rate'}</Text>
                <TouchableOpacity style={s.bookBtn} onPress={() => handleBook(t)}>
                  <Text style={s.bookBtnText}>Book Session</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
        {page < totalPages && (
          <ActivityIndicator style={s.moreLoader} size="small" color="#387bd5" />
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' },
  loadingText: { marginTop: 12, color: '#64748b', fontSize: 15 },
  searchBar: { padding: 16, paddingBottom: 8 },
  searchInput: { backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, borderWidth: 1, borderColor: '#e2e8f0' },
  filterRow: { paddingHorizontal: 16, paddingBottom: 8 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0', marginRight: 8 },
  filterChipActive: { backgroundColor: '#387bd5', borderColor: '#387bd5' },
  filterChipText: { fontSize: 13, color: '#64748b', fontWeight: '500' },
  filterChipTextActive: { color: '#fff' },
  list: { flex: 1, paddingHorizontal: 16 },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 18, fontWeight: '600', color: '#1a293b', marginBottom: 8 },
  emptySubtext: { fontSize: 14, color: '#64748b' },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  cardHeader: { flexDirection: 'row', marginBottom: 12 },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#387bd5', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  cardInfo: { flex: 1 },
  name: { fontSize: 17, fontWeight: '700', color: '#1a293b', marginBottom: 2 },
  spec: { fontSize: 13, color: '#387bd5', fontWeight: '500', marginBottom: 4 },
  meta: { flexDirection: 'row', alignItems: 'center' },
  metaText: { fontSize: 12, color: '#64748b' },
  metaDot: { fontSize: 12, color: '#cbd5e1', marginHorizontal: 6 },
  bio: { fontSize: 14, color: '#64748b', lineHeight: 20, marginBottom: 12 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rate: { fontSize: 15, fontWeight: '700', color: '#1a293b' },
  bookBtn: { backgroundColor: '#387bd5', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10 },
  bookBtnText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  moreLoader: { paddingVertical: 16 },
});
