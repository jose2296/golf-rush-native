import en from '@/assets/translations/en.json';
import es from '@/assets/translations/es.json';
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useEffect } from 'react';
import { initReactI18next } from 'react-i18next';
import { Platform } from 'react-native';
import 'react-native-reanimated';
import "../../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    useEffect(() => {
        if (['android', 'ios'].includes(Platform.OS)) {
            i18n
                .use(initReactI18next) // passes i18n down to react-i18next
                .use(RNLanguageDetector)
                .init({
                    compatibilityJSON: 'v3',
                    // the translations
                    // (tip move them in a JSON file and import them,
                    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
                    supportedLngs: ['es', 'en'],
                    resources: {
                        en,
                        es
                    },
                    fallbackLng: 'en',
                    debug: true,
                    interpolation: {
                        escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
                    }
                });
        } else {
            i18n
                .use(initReactI18next) // passes i18n down to react-i18next
                .use(LanguageDetector)
                .init({
                    compatibilityJSON: 'v3',
                    // the translations
                    // (tip move them in a JSON file and import them,
                    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
                    supportedLngs: ['es', 'en'],
                    resources: {
                        en,
                        es
                    },
                    fallbackLng: 'en',
                    debug: true,
                    interpolation: {
                        escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
                    }
                });
        }

        SplashScreen.hideAsync();
    }, []);


    return (
        <ThemeProvider value={DefaultTheme}>
            <StatusBar hidden />
            <Slot />
        </ThemeProvider>
    );
}
