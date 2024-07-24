import React, { useContext, useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing, TouchableOpacity, SafeAreaView, Text, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Audio } from 'expo-av'; // Import Audio from expo-av
import CustomSwitch from '../components/CustomSwitch';
import { ThemeContext } from '../contexts/ThemeContext';
import { TranslationContext } from '../contexts/TranslationContext';
import TranslationSwitch from '../components/TranslationSwitch';
import { AudioContext } from '../contexts/AudioProvider';

const VoiceUI = ({ navigation }) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const { translate } = useContext(TranslationContext);
    const { getPermission, hasMicrophonePermission } = useContext(AudioContext);

    const [recording, setRecording] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const coreAnimation = useRef(new Animated.Value(0)).current;
    const atmosphereAnimation = useRef(new Animated.Value(0)).current;

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

    const handleIconPress = async () => {
        await getPermission();

        if (!hasMicrophonePermission) {
            alert("Microphone permission is required to record audio.");
            return;
        }

        if (isAnimating) {
            stopAnimations();
            if (recording) {
                try {
                    await recording.stopAndUnloadAsync();
                    setRecording(null);
                    console.log("Recording stopped");
                } catch (error) {
                    console.error("Failed to stop and unload recording", error);
                }
            }
        } else {
            startAnimations();
            try {
                const { status } = await Audio.requestPermissionsAsync();
                if (status === 'granted') {
                    const { recording } = await Audio.Recording.createAsync(
                        Audio.RecordingOptionsPresets.HIGH_QUALITY
                    );
                    setRecording(recording);
                    console.log("Recording started");
                } else {
                    alert("Microphone permission is required to start recording.");
                }
            } catch (error) {
                console.error("Failed to start recording", error);
            }
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

    useEffect(() => {
        return () => {
            // Safeguard against stopping and unloading an already unloaded recording
            if (recording) {
                recording.getStatusAsync().then(status => {
                    if (status.isRecording) {
                        recording.stopAndUnloadAsync().catch(error => {
                            console.error("Failed to stop and unload recording on unmount", error);
                        });
                    }
                }).catch(error => {
                    console.error("Failed to get recording status on unmount", error);
                });
            }
        };
    }, [recording]);

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkTheme ? 'black' : 'white' }]}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <FontAwesome name="arrow-left" size={24} color={isDarkTheme ? '#fff' : '#333'} />
                </TouchableOpacity>
                <View style={styles.T_switchContainer}>
                    <TranslationSwitch />
                </View>
                <View style={styles.switchContainer}>
                    <CustomSwitch />
                </View>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={[styles.searchInput, { color: isDarkTheme ? '#fff' : '#333', borderColor: isDarkTheme ? '#fff' : '#333' }]}
                        placeholder={translate('search')}
                        placeholderTextColor={isDarkTheme ? '#fff' : '#333'}
                    />
                    <TouchableOpacity style={styles.searchButton}>
                        <FontAwesome name="search" size={24} color={isDarkTheme ? '#fff' : '#333'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.coreContainer}>
                    <TouchableOpacity onPress={handleIconPress}>
                        <Animated.View style={[styles.core, { transform: [{ scale: coreScale }] }]}>
                            <FontAwesome name='microphone' size={30} color={isDarkTheme ? '#fff' : '#333'} />
                        </Animated.View>
                    </TouchableOpacity>
                </View>
                <View style={styles.atmosphereContainer}>
                    <Text style={{ color: isDarkTheme ? '#fff' : '#333' }}>{translate('tapToSpeak')}</Text>
                    <Animated.View style={[styles.atmosphere, { transform: [{ scale: atmosphereScale }] }]} />
                </View>
                <View style={styles.commandContainer}>
                    <Text style={[styles.placeholderText, { color: isDarkTheme ? '#fff' : '#333' }]}>{translate('spokenTextPlaceholder')}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        padding: 10,
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