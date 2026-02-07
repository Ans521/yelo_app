import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeContent() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {/* Promotional card */}
            <View style={styles.card}>
                <ImageBackground
                    source={require('../assets/images/homescreen.png')}
                    resizeMode="cover"
                    style={styles.cardImage}
                >
                    {/* Dark overlay for text readability */}
                    <View style={styles.overlay}>
                        <View>
                            <Text style={styles.title}>
                                EXCITING COUPLE{'\n'}TOUR FOR NEXT{'\n'}VACATION
                            </Text>
                            <View style={styles.line} />
                                <Text style={styles.description}>
                                    It is a long established fact that a reader will be distracted by the
                                    readable content of a page when looking at its layout.
                                </Text>
                            </View>
                        <TouchableOpacity
                            activeOpacity={0.80}
                            style={styles.button}
                            onPress={() => navigation.navigate('Profile')}
                        >
                            <Text style={styles.buttonText}>BOOK NOW</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
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
