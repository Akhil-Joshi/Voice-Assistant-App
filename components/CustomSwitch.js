import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { ThemeContext } from '../contexts/ThemeContext';

const CustomSwitch = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={[styles.customSwitch, isDarkTheme ? styles.switchEnabled : styles.switchDisabled]}
      onPress={toggleTheme}
    >
      {isDarkTheme ? (
        <Icon name="sun-o" type="font-awesome" color="#FFD700" size={24} />
      ) : (
        <Icon name="moon-o" type="font-awesome" color="#28282B" size={24} />
      )}
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
  switchEnabled: {
    backgroundColor: '#555',
  },
  switchDisabled: {
    backgroundColor: '#ddd',
  },
});

export default CustomSwitch;
