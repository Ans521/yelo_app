import React from 'react';
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const DEFAULT_HEIGHT = 140;

export default function BackLogoHeader({ height = DEFAULT_HEIGHT, onBackPress }) {
  const navigation = useNavigation();

  const handleBack = () => {
    if (typeof onBackPress === 'function') {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

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
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <MaterialIcons name="arrow-back-ios" size={18} color="#ffffff" style={styles.backBtnIcon}/>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerMask: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.9,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  logoWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 56,
  },
  logo: {
    width: 180,
    height: 72,
  },
  backBtnIcon: {
    marginLeft: 8
  },
});
