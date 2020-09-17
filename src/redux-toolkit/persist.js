import AsyncStorage from '@react-native-community/async-storage';

const reduxPersist = {
  key: 'root',
  storage: AsyncStorage,
  timeout: null,
  version: 1,
  whitelist: ['auth'],
  blacklist: [],
};

export default reduxPersist;
