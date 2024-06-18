import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { TranslationContext } from '../contexts/TranslationContext';

const TranslationSwitch = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { toggleLanguage, language } = useContext(TranslationContext);

  const backgroundColor = isDarkTheme ? '#555' : '#ddd';
  const textColor = isDarkTheme ? '#FFF' : '#28282B';

  return (
    <TouchableOpacity
      onPress={toggleLanguage}
      style={[
        styles.customSwitch,
        { backgroundColor: backgroundColor, borderColor: textColor },
      ]}
      activeOpacity={0.7}
    >
      <Image
        source={language === 'en' ? require('../assets/NepalFlag.png') : require('../assets/USAFlag.png')}
        style={styles.flag}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  customSwitch: {
    width: 60,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flag: {
    width: 28,
    height: 28,
  },
});

export default TranslationSwitch;
