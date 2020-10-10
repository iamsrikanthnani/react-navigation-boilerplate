import * as React from 'react';
import {ActivityIndicator, Alert} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppearanceProvider, Appearance} from 'react-native-appearance';
import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';
import * as RNLocalize from 'react-native-localize';
import {store, persistor} from 'redux-toolkit/store';
import {RNStatusBar} from 'components/common';
import {TabStack, InitialStack} from 'navigation';
import {useAppLanguage} from 'i18n';

export const AppContext = React.createContext();

// custom theme
const DEFAULT_THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
    text: '#272727',
  },
};

const DARK_THEME = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#000000',
    text: '#ebebeb',
  },
};

const App = () => {
  const {appLanguage} = useAppLanguage();

  const [appConfig, setAppConfig] = React.useState({
    isDarkTheme: Appearance.getColorScheme() === 'dark',
    language: appLanguage?.languageTag || 'en',
  });

  //detect theme
  React.useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setAppConfig({...appConfig, isDarkTheme: colorScheme === 'dark'});
    });
    return () => {
      subscription.remove();
    };
  }, []);

  // detect network
  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        return Alert.alert(Config.APP_NAME, 'You are currently offline.');
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // detect language
  React.useEffect(() => {
    RNLocalize.addEventListener('change', handleLocalizationChange);
    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    };
  }, []);

  // handle change language
  const handleLocalizationChange = () => {
    setAppConfig({...appConfig, language: appLanguage.languageTag});
  };

  // app context
  const appContext = () => ({
    toggleTheme: () => {
      setAppConfig({...appConfig, isDarkTheme: !isDarkTheme});
    },
    switchLanguage: (newLanguage) => {
      setAppConfig({...appConfig, language: newLanguage});
    },
  });

  const {isDarkTheme} = appConfig;

  return (
    <AppearanceProvider>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
            <AppContext.Provider value={appContext}>
              <NavigationContainer
                theme={isDarkTheme ? DARK_THEME : DEFAULT_THEME}>
                <RNStatusBar />
                {store.getState().auth.token !== null ? (
                  <TabStack />
                ) : (
                  <InitialStack />
                )}
              </NavigationContainer>
            </AppContext.Provider>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </AppearanceProvider>
  );
};

export default App;
