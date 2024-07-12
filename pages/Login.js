import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, TouchableOpacity, Text, View, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { ThemeContext } from '../contexts/ThemeContext';
import { TranslationContext } from '../contexts/TranslationContext';
import CustomSwitch from '../components/CustomSwitch';
import TranslationSwitch from '../components/TranslationSwitch';
import axios from 'axios';

const Login = ({ navigation }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { translate } = useContext(TranslationContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/login', {
        email: username,
        password: password,
      });
      navigation.navigate('WelcomePage');
      alert(`Login successful: ${response.data.message}`);
    } catch (error) {
      alert(`Login failed: ${error.response.data.message}`);
    }
  };

  const backgroundColor = isDarkTheme ? '#333' : '#f5f5f5';
  const textColor = isDarkTheme ? '#fff' : '#333';
  const buttonBackgroundColor = '#00AEEF';
  const buttonTextColor = '#fff';
  const inputBackgroundColor = isDarkTheme ? '#555' : '#fff';
  const inputBorderColor = isDarkTheme ? '#777' : '#ccc';
  const formBackgroundColor = isDarkTheme ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <KeyboardAvoidingView style={styles.container} behavior='padding' keyboardVerticalOffset={10}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color={textColor} />
        </TouchableOpacity>
        <View style={styles.switchContainer}>
          <CustomSwitch />
        </View>
        <View style={styles.T_switchContainer}>
          <TranslationSwitch />
        </View>
        <Text style={[styles.title, { color: textColor }]}>{translate('login')}</Text>
        <View style={[styles.formContainer, { backgroundColor: formBackgroundColor }]}>
          <Text style={[styles.label, { color: textColor }]}>{translate('usernameOrEmail')}</Text>
          <TextInput
            style={[styles.input, { color: textColor, borderColor: inputBorderColor, backgroundColor: inputBackgroundColor }]}
            placeholder={translate('usernameOrEmail')}
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={setUsername}
          />
          <View style={styles.passwordContainer}>
            <Text style={[styles.label, { color: textColor }]}>{translate('password')}</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={[styles.input, { color: textColor, borderColor: inputBorderColor, backgroundColor: inputBackgroundColor }]}
                placeholder={translate('password')}
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={20} color={textColor} style={styles.eyeIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => alert(translate('forgotPassword'))}>
            <Text style={[styles.reset, { color: textColor }]}>{translate('forgotPassword')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: buttonBackgroundColor }]} onPress={handleLogin}>
            <Text style={[styles.buttonText, { color: buttonTextColor }]}>{translate('login')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.signup, { color: textColor }]}>{translate('dontHaveAccount')}</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style={isDarkTheme ? "light" : "dark"} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 5,
    paddingTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  switchContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  T_switchContainer: {
    position: 'absolute',
    top: 20,
    right: 100,
  },
  formContainer: {
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    paddingVertical: 9,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  passwordContainer: {
    marginBottom: 20,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    bottom: 0,
  },
  reset: {
    bottom: 20,
    textDecorationLine: 'underline',
  },
  signup: {
    top: 10,
    textDecorationLine: 'underline',
    fontStyle: 'italic',
    fontSize: 15,
    fontFamily: 'sans-serif-medium',
  },
});

export default Login;
