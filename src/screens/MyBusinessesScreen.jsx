import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
  ScrollView,
  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import LogoHeader from '../components/common/LogoHeader';
import { getUserBusinesses } from '../services/authApi';
import { useAuth } from '../context/AuthContext';

const ORANGE = '#F08E14';
const TEXT_DARK = '#111827';

export default function MyBusinessesScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const userId = user?.id ?? user?.userId ?? null;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBusinesses = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    const res = await getUserBusinesses();
    if (res.success && Array.isArray(res.data)) {
      setList(res.data);
    } else {
      setList([]);
    }
    setLoading(false);
    setRefreshing(false);
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      fetchBusinesses();
    }, [fetchBusinesses])
  );

  const onRowPress = (business) => {
    const businessId = business.business_id ?? business.id;
    const tabNav = navigation.getParent();
    tabNav?.navigate('AddListing', {
      screen: 'ListingDetail',
      params: { businessId },
    });
  };

  const onEdit = (business, e) => {
    e?.stopPropagation?.();
    const tabNav = navigation.getParent();
    tabNav?.navigate('AddListing', {
      screen: 'AddListingForm',
      params: { editBusiness: business, businessId: business.business_id },
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => onRowPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.businessInfo}>
        <Text style={styles.businessName} numberOfLines={1}>
          {item.business_name ?? item.businessName ?? '--'}
        </Text>
        <Text style={styles.businessName} numberOfLines={1}>
          {item.category_name ?? '--'}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.editBtn}
        onPress={(e) => onEdit(item, e)}
        activeOpacity={0.7}
      >
        <MaterialIcons name="edit" size={22} color={ORANGE} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
        <LogoHeader />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={ORANGE} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
      <LogoHeader />
      <Text style={styles.title}>Your business listings</Text>
      <FlatList
        data={list}
        keyExtractor={(item) => String(item.id ?? item.businessId ?? Math.random())}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.empty}>No businesses listed yet.</Text>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchBusinesses(true)}
            colors={["#ffffff"]}
          />
        }
      />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#D26100' },
  scroll: { flex: 1, backgroundColor: '#ffffff' },
  scrollContent: { paddingBottom: 100 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_DARK,
    paddingHorizontal: 18,
    marginTop: 16,
    paddingBottom: 20,
  },
  listContent: { paddingHorizontal: 16, paddingBottom: 50 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  
    // Android
    elevation: 3,
  },
  businessName: { flex: 1, fontSize: 16, fontWeight: '500', color: TEXT_DARK },
  editBtn: { padding: 8 },
  empty: { fontSize: 15, color: '#6B7280', textAlign: 'center', marginTop: 24 },
  businessInfo: { 
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
   },
});
