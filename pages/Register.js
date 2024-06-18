import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, TouchableOpacity, Text, View, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { ThemeContext } from '../contexts/ThemeContext';
import { TranslationContext } from '../contexts/TranslationContext';
import CustomSwitch from '../components/CustomSwitch';
import TranslationSwitch from '../components/TranslationSwitch';

const Register = ({ navigation }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { translate } = useContext(TranslationContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = () => {
    // Handle signup logic here
    if (!email || !password || !confirmPassword) {
      alert(translate('allFieldsRequired'));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(email)) {
      alert(translate('invalidEmailFormat'));
      return;
    }

    if (!passwordRegex.test(password)) {
      alert(translate('passwordRequirements'));
      return;
    }

    if (password !== confirmPassword) {
      alert(translate('passwordsDoNotMatch'));
      return;
    }

    alert(`${translate('email')}: ${email}, ${translate('password')}: ${password}, ${translate('confirmPassword')}: ${confirmPassword}`);
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
        <View style={styles.T_switchContainer}>
          <TranslationSwitch />
        </View>
        <View style={styles.switchContainer}>
          <CustomSwitch />
        </View>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer} 
          style={styles.formContainerWrapper}
          keyboardShouldPersistTaps='handled'
        >
          <View style={styles.formWrapper}>
            <Text style={[styles.title, { color: textColor }]}>{translate('register')}</Text>
            <View style={[styles.formContainer, { backgroundColor: formBackgroundColor }]}>
              <Text style={[styles.label, { color: textColor }]}>{translate('Username')}</Text>
              <TextInput
                style={[styles.input, { color: textColor, borderColor: inputBorderColor, backgroundColor: inputBackgroundColor }]}
                placeholder={translate('Username')}
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
              />
              <Text style={[styles.label, { color: textColor }]}>{translate('email')}</Text>
              <TextInput
                style={[styles.input, { color: textColor, borderColor: inputBorderColor, backgroundColor: inputBackgroundColor }]}
                placeholder={translate('email')}
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
              />
              <Text style={[styles.label, { color: textColor }]}>{translate('newPassword')}</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={[styles.input, { color: textColor, borderColor: inputBorderColor, backgroundColor: inputBackgroundColor }]}
                  placeholder={translate('newPassword')}
                  placeholderTextColor="#aaa"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={20} color={textColor} style={styles.eyeIcon} />
                </TouchableOpacity>
              </View>
              <Text style={[styles.label, { color: textColor }]}>{translate('confirmPassword')}</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={[styles.input, { color: textColor, borderColor: inputBorderColor, backgroundColor: inputBackgroundColor }]}
                  placeholder={translate('confirmPassword')}
                  placeholderTextColor="#aaa"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <FontAwesome name={showConfirmPassword ? 'eye-slash' : 'eye'} size={20} color={textColor} style={styles.eyeIcon} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={[styles.button, { backgroundColor: buttonBackgroundColor }]} onPress={handleSignup}>
                <Text style={[styles.buttonText, { color: buttonTextColor }]}>{translate('signUp')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.signup, { color: textColor }]}>{translate('alreadyHaveAccount')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
    paddingTop:50,
    padding:20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  formContainerWrapper: {
    flex: 1,
    width: '100%',
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
  formWrapper: {
    alignItems: 'center',
    width: '100%',
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
  signup: {
    top: 10,
    textDecorationLine: 'underline',
    fontStyle: 'italic',
    fontSize: 15,
    fontFamily: 'sans-serif-medium',
  },
});

export default Register;
