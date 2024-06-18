import React, { useEffect, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, Appearance } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomSwitch from '../components/CustomSwitch';
import { ThemeContext } from '../contexts/ThemeContext';
import { TranslationContext } from '../contexts/TranslationContext';
import TranslationSwitch from '../components/TranslationSwitch'
const WelcomePage = ({ navigation }) => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const { translate} = useContext(TranslationContext);

  useEffect(() => {
    // Initialize theme based on system preference if needed
    const colorScheme = Appearance.getColorScheme();
    if (colorScheme === 'dark' && !isDarkTheme) {
      toggleTheme();
    }
  }, []);

  const backgroundColor = isDarkTheme ? '#333' : '#fff';
  const textColor = isDarkTheme ? '#fff' : '#000';
  const buttonBackgroundColor = '#00AEE1';
  const buttonTextColor = '#000';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
      <View style={styles.switchContainer}>
        <CustomSwitch />
      </View>

      {/* TranslationSwitch */}
      <View style={styles.T_switchContainer}>
        <TranslationSwitch />
      </View>

      <View style={styles.container}>
        <Image source={require('../assets/MainIcon.png')} style={styles.icon} />
        <Text style={[styles.title, { color: textColor }]}>{translate('welcomeTitle')}</Text>
        <Text style={[styles.subtitle, { color: textColor }]}>{translate('welcomeSubtitle')}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { backgroundColor: buttonBackgroundColor }]} onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.buttonText, { color: buttonTextColor }]}>{translate('login')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: buttonBackgroundColor }]} onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.buttonText, { color: buttonTextColor }]}>{translate('register')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  switchContainer: {
    alignItems: 'flex-end',
    padding: 20,
  },
  T_switchContainer: {
    position: 'absolute',
    top: 55,
    right: 100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    width: 70,
    height: 70,
    borderRadius: 30,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#00AEE1',
    shadowColor: '#00AEE1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  button: {
    padding: 9,
    borderRadius: 13,
    marginHorizontal: 10,
    width: 100,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomePage;
