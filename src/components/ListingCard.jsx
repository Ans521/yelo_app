import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Linking,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_IMAGE_SIZE = (SCREEN_WIDTH - 32) * 0.32;

const TEXT_DARK = '#111827';
const TEXT_LIGHT = '#6B7280';
const BORDER = '#E5E7EB';

/**
 * Shared listing card: image left (~1/3), title, subtitle, separator, call / WhatsApp / share.
 * item: { image, title, subtitle }
 * onPress: optional; if provided, whole card is pressable.
 */
export default function ListingCard({ item, onPress, wrapperStyle }) {
  const handleCall = (e) => {
    e?.stopPropagation?.();
    Linking.openURL('tel:+911234567890');
  };
  const handleWhatsApp = (e) => {
    e?.stopPropagation?.();
    Linking.openURL('https://wa.me/911234567890');
  };
  const handleShare = (e) => {
    e?.stopPropagation?.();
  };

  const cardContent = (
    <Shadow
      distance={3}
      startColor="#0000000C"
      finalColor="#00000003"
      offset={[1, 1]}
      radius={50}
      style={styles.cardShadow}
    >
      <View style={styles.card}>
        <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
        <View style={styles.cardRight}>
          <View style={styles.cardHeading}>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.cardSubtitle} numberOfLines={1}>
              {item.subtitle}
            </Text>
          </View>
          <View style={styles.cardHeadingSeparator} />
          <View style={styles.actionRow}>
            <TouchableOpacity onPress={handleCall} style={styles.actionBtn} activeOpacity={0.7}>
              <MaterialIcons name="call" size={20} color={TEXT_LIGHT} />
            </TouchableOpacity>
            <View style={styles.actionDivider} />
            <TouchableOpacity onPress={handleWhatsApp} style={styles.actionBtn} activeOpacity={0.7}>
              <MaterialCommunityIcons name="whatsapp" size={20} color={TEXT_LIGHT} />
            </TouchableOpacity>
            <View style={styles.actionDivider} />
            <TouchableOpacity onPress={handleShare} style={styles.actionBtn} activeOpacity={0.7}>
              <MaterialIcons name="share" size={20} color={TEXT_LIGHT} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Shadow>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onPress(item)}
        style={[styles.wrapper, wrapperStyle]}
      >
        {cardContent}
      </TouchableOpacity>
    );
  }

  return <View style={[styles.wrapper, wrapperStyle]}>{cardContent}</View>;
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  cardShadow: {
    alignSelf: 'stretch',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: '#D3D3D3',
  },
  cardImage: {
    width: CARD_IMAGE_SIZE,
    height: CARD_IMAGE_SIZE,
    backgroundColor: '#F3F4F6',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  cardRight: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
  },
  cardHeading: {
    marginBottom: 0,
  },
  cardHeadingSeparator: {
    height: 1,
    backgroundColor: BORDER,
    marginTop: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: TEXT_DARK,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: TEXT_LIGHT,
    marginBottom: 0,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionDivider: {
    width: 1,
    height: 20,
    backgroundColor: BORDER,
  },
});
