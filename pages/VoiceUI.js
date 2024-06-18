import React, { useContext, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Easing, TouchableOpacity, SafeAreaView, Text, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CustomSwitch from '../components/CustomSwitch';
import { ThemeContext } from '../contexts/ThemeContext';
import { TranslationContext } from '../contexts/TranslationContext';
import TranslationSwitch from '../components/TranslationSwitch';

const VoiceUI = ({ navigation }) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const { translate} = useContext(TranslationContext);

    // Set background color based on theme
    const backgroundColor = isDarkTheme ? 'black' : 'white';
    const textColor = isDarkTheme ? '#fff' : '#333';

    const coreAnimation = useRef(new Animated.Value(0)).current;
    const atmosphereAnimation = useRef(new Animated.Value(0)).current;
    const [isAnimating, setIsAnimating] = useState(false);

    const coreAnimationRef = useRef();
    const atmosphereAnimationRef = useRef();

    const startAnimations = () => {
        const coreSequence = Animated.loop(
            Animated.sequence([
                Animated.timing(coreAnimation, {
                    toValue: 1,
                    duration: 650,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(coreAnimation, {
                    toValue: 0,
                    duration: 650,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ]),
        );

        const atmosphereSequence = Animated.loop(
            Animated.sequence([
                Animated.timing(atmosphereAnimation, {
                    toValue: 1,
                    duration: 650,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(atmosphereAnimation, {
                    toValue: 0,
                    duration: 650,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ]),
        );

        coreAnimationRef.current = coreSequence;
        atmosphereAnimationRef.current = atmosphereSequence;

        coreSequence.start();
        atmosphereSequence.start();
    };

    const stopAnimations = () => {
        if (coreAnimationRef.current && atmosphereAnimationRef.current) {
            coreAnimationRef.current.stop();
            atmosphereAnimationRef.current.stop();

            Animated.timing(coreAnimation, {
                toValue: 0,
                duration: 150,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();

            Animated.timing(atmosphereAnimation, {
                toValue: 0,
                duration: 150,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();
        }
    };

    const handleIconPress = () => {
        if (isAnimating) {
            stopAnimations();
        } else {
            startAnimations();
        }
        setIsAnimating(!isAnimating);
    };

    const coreScale = coreAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.1], // Adjust the scale of the core
    });

    const atmosphereScale = atmosphereAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.85, 1], // Adjust the scale of the atmosphere
    });

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <FontAwesome name="arrow-left" size={24} color={textColor} />
                </TouchableOpacity>
                <View style={styles.T_switchContainer}>
                    <TranslationSwitch />
                </View>
                <View style={styles.switchContainer}>
                    <CustomSwitch />
                </View>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={[styles.searchInput, { color: textColor, borderColor: textColor }]}
                        placeholder={translate('search')}
                        placeholderTextColor={textColor}
                    />
                    <TouchableOpacity style={styles.searchButton}>
                        <FontAwesome name="search" size={24} color={textColor} />
                    </TouchableOpacity>
                </View>
                <View style={styles.coreContainer}>
                    <TouchableOpacity onPress={handleIconPress}>
                        <Animated.View style={[styles.core, { transform: [{ scale: coreScale }] }]}>
                            <FontAwesome name='microphone' size={30} color={textColor} />
                        </Animated.View>
                    </TouchableOpacity>
                </View>
                <View style={styles.atmosphereContainer}>
                    <Text style={{ color: textColor }}>{translate('tapToSpeak')}</Text>
                    <Animated.View style={[styles.atmosphere, { transform: [{ scale: atmosphereScale }] }]} />
                </View>
                <View style={styles.commandContainer}>
                    <Text style={[styles.placeholderText, { color: textColor }]}>{translate('spokenTextPlaceholder')}</Text>
                </View>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        padding:10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 40, // Adjusted top position
        left: 20,
    },
    switchContainer: {
        position: 'absolute',
        top: 40,
        right: 20,
    },
    T_switchContainer: {
        position: 'absolute',
        top: 40,
        right: 100,
    },
    searchContainer: {
        position: 'absolute',
        top: 100, // Adjust this value as needed
        left: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
    },
    searchButton: {
        marginLeft: 10,
    },
    coreContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        bottom: 65,
    },
    core: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(25, 181, 254, 0.4)',
        justifyContent: 'center', // Center the microphone icon horizontally
        alignItems: 'center', // Center the microphone icon vertically
    },
    atmosphereContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
        bottom: 40,
    },
    atmosphere: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(25, 181, 254, 0.3)', // Adjust the color and opacity of the atmosphere
    },
    commandContainer: {
        position: 'absolute',
        top: '40%', // Adjust this value to position it vertically
        left: 20,
        right: 20,
        padding: 20,
        height: 150,
        borderWidth: 1,
        borderColor: 'rgba(25, 181, 254, 0.5)',
        borderRadius: 10,
        backgroundColor: 'rgba(25, 181, 254, 0.1)',
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default VoiceUI;
