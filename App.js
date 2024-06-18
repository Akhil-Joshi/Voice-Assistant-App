import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { TranslationProvider } from './contexts/TranslationContext';
import AppNavigator from './AppNavigator';

const App = () => {
  return (
    <ThemeProvider>
      <TranslationProvider>
        <AppNavigator />
      </TranslationProvider>
    </ThemeProvider>
  );
};

export default App;
