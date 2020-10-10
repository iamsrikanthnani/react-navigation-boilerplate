import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import {memoize} from 'lodash';
import {I18nManager} from 'react-native';
import en from 'i18n/languages/en.json';
import vi from 'i18n/languages/vi.json';

const translationGetters = {
  en,
  vi,
};

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

const setI18nConfig = ({store}) => {
  // fallback if no available language fits
  const fallback = {languageTag: 'en', isRTL: false};
  const {isRTL} =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;
  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = translationGetters;
  i18n.translate = (key, config = {}) => {
    const {language} = store.getState().app;
    return i18n.t(key, {...config, locale: language});
  };
};

const appTranslate = (text) => i18n.translate(text);

const useAppLanguage = () => {
  const appLocale = RNLocalize.getLocales();
  const appLanguage = RNLocalize.findBestAvailableLanguage(
    appLocale.map((item) => item.languageCode),
  );
  return {appLocale, appLanguage};
};

export {setI18nConfig, appTranslate, useAppLanguage};
