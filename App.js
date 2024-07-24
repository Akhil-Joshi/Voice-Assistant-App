import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { TranslationProvider } from './contexts/TranslationContext';
import AppNavigator from './AppNavigator';
import AudioProvider from './contexts/AudioProvider';

const App = () => {
  return (
    <AudioProvider>
      <ThemeProvider>
        <TranslationProvider>
          <AppNavigator />
        </TranslationProvider>
      </ThemeProvider>
    </AudioProvider>
  );
};

export default App;
