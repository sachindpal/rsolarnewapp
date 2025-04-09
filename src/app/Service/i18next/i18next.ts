import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '../../../asset/translationLanguage/en.json';
import hi from '../../../asset/translationLanguage/hi.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const languageResources = {
  en: {translation: en},
  hi: {translation: hi},
};

const STORE_LANGUAGE_KEY = "currentLangauge";

const languageDetectorPlugin:any = {
  type: "languageDetector",
  async: true,
  init: () => {},
  detect: async function (callback: (lang: string) => void) {
    try {
      //get stored language from Async storage
      await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then((language) => {
        if (language) {
          //if language was stored before, use this language in the app
          return callback(language);
        } else {
          //if language was not stored yet, use device's locale
          return callback("en");
        }
      });
    } catch (error) {
      console.log("Error reading language", error);
    }
  },
  // cacheUserLanguage: async function (language: string) {
  //   try {
  //     //save a user's language choice in Async storage
  //     await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
  //   } catch (error) {}
  // },
};

i18next.use(initReactI18next).use(languageDetectorPlugin).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  resources: languageResources,
});

export default i18next;
