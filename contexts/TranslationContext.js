import React, { createContext, useState } from 'react';

export const TranslationContext = createContext();

const translations = {
  en: {
    search: "Search",
    tapToSpeak: "Tap to speak",
    spokenTextPlaceholder: "Spoken text will be here",
    login: "Login",
    usernameOrEmail: "Username or Email",
    password: "Password",
    forgotPassword: "Forgot Password",
    dontHaveAccount: "Don't have an account?",
    register: "Register",
    email: "Email",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    signUp: "Sign Up",
    alreadyHaveAccount: "Already have an account?",
    allFieldsRequired: "All fields are required.",
    invalidEmailFormat: "Invalid email format.",
    passwordRequirements: "Password must be at least 8 characters long and include at least one letter and one number.",
    passwordsDoNotMatch: "Passwords do not match.",
    welcomeTitle: "Welcome to Your AI Assistant",
    welcomeSubtitle: "Here to help you with everything you need."
  },
  np: {
    search: "खोजी गर्नुहोस्",
    tapToSpeak: "बोल्न ट्याप गर्नुहोस्",
    spokenTextPlaceholder: "यहाँ बोलेको पाठ हुनेछ",
    login: "लग - इन",
    usernameOrEmail: "प्रयोगकर्ता नाम वा इमेल",
    password: "पासवर्ड",
    forgotPassword: "पासवर्ड बिर्सनुभयो",
    dontHaveAccount: "खाता छैन?",
    Username: "प्रयोगकर्ता नाम",
    register: "साइन अप",
    email: "इमेल",
    newPassword: "नयाँ पासवर्ड",
    confirmPassword: "पासवर्ड पुष्टि गर्नुहोस्",
    signUp: "साइन अप गर्नुहोस्",
    alreadyHaveAccount: "पहिले नै खाता छ?",
    allFieldsRequired: "सबै क्षेत्रहरू आवश्यक छन्।",
    invalidEmailFormat: "अवैध इमेल ढाँचा।",
    passwordRequirements: "पासवर्ड कम्तिमा 8 वर्ण लामो र कम्तिमा एक अक्षर र एक नम्बर समावेश गर्नु पर्छ।",
    passwordsDoNotMatch: "पासवर्डहरू मेल खाँदैनन्।",
    welcomeTitle: "तपाईंको एआई सहायकमा स्वागत छ",
    welcomeSubtitle: "तपाईंलाई सबै आवश्यक कुरामा सहायक गर्न यहाँ।"
  }
};

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [prevLanguage, setPrevLanguage] = useState('en');

  const translate = (key) => {
    return translations[language][key] || key;
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'np' : 'en';
    setPrevLanguage(language);
    setLanguage(newLanguage);
  };

  return (
    <TranslationContext.Provider value={{ language, prevLanguage, translate, toggleLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};
