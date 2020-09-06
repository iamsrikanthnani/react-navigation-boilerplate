import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import {memoize} from 'lodash';
import {I18nManager} from 'react-native';

import en from './languages/en.json';
import vi from './languages/vi.json';

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

export default {
  setI18nConfig,
  appTranslate,
};
