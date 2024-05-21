import en from '@/assets/translations/en.json';
import es from '@/assets/translations/es.json';
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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

export default i18n;
