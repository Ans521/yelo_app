import React, { useState, useEffect } from 'react';
import { View, ImageBackground, TouchableOpacity, StyleSheet, ActivityIndicator, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAllBanners } from '../services/authApi';

const DEFAULT_IMAGE = require('../assets/images/homescreen.png');

export default function HomeContent() {
    const navigation = useNavigation();
    const [banner, setBanner] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            const res = await getAllBanners();
            if (cancelled) return;
            setLoading(false);
            if (res.success && Array.isArray(res.data) && res.data.length > 0) {
                const mainBanner = res.data.find((b) => b.is_main == 1);
                if (mainBanner) {
                    console.log("mainBanner", mainBanner);
                    setBanner({
                        link: mainBanner.link || null,
                        image_url: mainBanner.image_url || null,
                    });
                }
            }
        })();
        return () => { cancelled = true; };
    }, []);

    const imageSource = banner?.image_url
        ? { uri: banner.image_url }
        : DEFAULT_IMAGE;


    return (
        <View style={styles.container}>
            <View style={styles.card}>
                {loading ? (
                    <View style={[styles.cardImage, styles.loadingWrap]}>
                        <ActivityIndicator size="large" color="#FF9800" />
                    </View>
                ) : (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.touch}
                        disabled={!banner?.link}
                        onPress={() => {
                            if (banner?.link) {
                                Linking.openURL(banner.link).catch(() => {});
                            }
                        }}
                    >
                        <ImageBackground
                            source={imageSource}
                            resizeMode="cover"
                            style={styles.cardImage}
                        >
                            <View style={styles.overlay} />
                        </ImageBackground>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    card: {
        borderRadius: 16,
        overflow: 'hidden',
        height: 400,
        backgroundColor: 'transparent',
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    loadingWrap: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.16)',
        padding: 20,
        justifyContent: 'space-between',
    },
    title: {
        color: '#fff',
        paddingTop: 20,
        fontSize: 33,
        fontWeight: '900',
        lineHeight: 50,
    },
    line: {
        width: 99,
        height: 0.5,
        backgroundColor: 'rgba(255,255,255,0.75)',
        marginVertical: 5,
    },
    description: {
        color: 'rgba(245, 245, 252, 0.89)',
        fontSize: 13.5,
        lineHeight: 20,
        maxWidth: '100%',
        marginTop: 11,
    },
    button: {
        alignSelf: 'flex-start',
        backgroundColor: '#FF9800',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom : 25
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});
