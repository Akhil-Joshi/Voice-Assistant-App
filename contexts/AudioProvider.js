import React, { Component, createContext } from 'react';
import { Alert } from 'react-native';
import * as Audio from 'expo-av';

export const AudioContext = createContext();

export class AudioProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMicrophonePermission: false,
        };
    }

    permissionAlert = () => {
        Alert.alert(
            "Permission Required",
            "This app needs access to your microphone",
            [
                { text: 'Accept', onPress: () => this.getPermission() },
                { text: 'Reject', onPress: () => this.permissionAlert() }
            ]
        );
    };

    getPermission = async () => {
        // Check current permission status
        const { status } = await Audio.Audio.requestPermissionsAsync();

        if (status === 'granted') {
            this.setState({ hasMicrophonePermission: true });
            console.log("Microphone permission granted");
        } else if (status === 'denied') {
            const { status: newStatus } = await Audio.Audio.requestPermissionsAsync();
            if (newStatus === 'granted') {
                this.setState({ hasMicrophonePermission: true });
                console.log("Microphone permission granted");
            } else {
                this.permissionAlert();
            }
        }
    };

    componentDidMount() {
        this.getPermission();
    }

    render() {
        return (
            <AudioContext.Provider value={{ getPermission: this.getPermission, hasMicrophonePermission: this.state.hasMicrophonePermission }}>
                {this.props.children}
            </AudioContext.Provider>
        );
    }
}

export default AudioProvider;
