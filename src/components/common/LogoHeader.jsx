import React from 'react';
import { View, Image, ImageBackground, StyleSheet } from 'react-native';

const DEFAULT_HEIGHT = 140;

/**
 * Shared orange top bar with mask overlay and centered logo.
 * Used on Profile, Add Listing, and any screen that needs only the logo (no search).
 */
export default function LogoHeader({ height = DEFAULT_HEIGHT }) {
  return (
    <View style={[styles.header, { height }]}>
      <ImageBackground
        source={require('../../assets/images/orange.png')}
        resizeMode="cover"
        style={styles.headerBg}
      >
        <Image
          source={require('../../assets/images/mask.png')}
          style={styles.headerMask}
          resizeMode="cover"
        />
        <View style={styles.logoWrap}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    overflow: 'hidden',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  headerBg: {
    flex: 1,
  },
  headerMask: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.9,
  },
  logoWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    paddingBottom: 16,
  },
  logo: {
    width: 180,
    height: 72,
  },
});
