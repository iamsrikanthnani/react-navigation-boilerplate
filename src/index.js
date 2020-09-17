import * as React from 'react';
import {StatusBar, ActivityIndicator, Alert} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppearanceProvider, Appearance} from 'react-native-appearance';
import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';
import * as RNLocalize from 'react-native-localize';
import {store, persistor} from './redux-toolkit/store';
import SCREENS from './screens';

const InitStack = createStackNavigator();
const TaskManagementStack = createStackNavigator();
const LoveStack = createStackNavigator();
const Tab = createBottomTabNavigator();

// init stack
const InitStackScreen = () => (
  <InitStack.Navigator>
    <InitStack.Screen
      name="OnBoarding"
      component={SCREENS.OnBoarding}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <InitStack.Screen name="Login" component={SCREENS.Login} />
    <InitStack.Screen name="SignUp" component={SCREENS.SignUp} />
  </InitStack.Navigator>
);

// tab stack for main tab
const TaskManagementTab = () => (
  <TaskManagementStack.Navigator>
    <TaskManagementStack.Screen
      name="TaskManagement"
      component={SCREENS.TaskManagement}
    />
  </TaskManagementStack.Navigator>
);

const LoveTab = () => (
  <LoveStack.Navigator>
    <LoveStack.Screen name="Love" component={SCREENS.TaskManagement} />
  </LoveStack.Navigator>
);

// main tab
const MainTabScreen = () => (
  <Tab.Navigator>
    <Tab.Screen name="TaskManagement" component={TaskManagementTab} />
    <Tab.Screen name="Love" component={LoveTab} />
  </Tab.Navigator>
);

const useAppLanguage = () => {
  const appLocale = RNLocalize.getLocales();
  const appLanguage = RNLocalize.findBestAvailableLanguage(
    appLocale.map((item) => item.languageCode),
  );
  return {appLocale, appLanguage};
};

export const AppContext = React.createContext();

const App = () => {
  const {appLanguage} = useAppLanguage();

  const [appConfig, setAppConfig] = React.useState({
    isDarkTheme: Appearance.getColorScheme() === 'dark',
    language: appLanguage.languageTag || 'en',
  });

  const {isDarkTheme} = appConfig;

  const handleLocalizationChange = () => {
    setAppConfig({...appConfig, language: appLanguage.languageTag});
  };

  //theme
  React.useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setAppConfig({...appConfig, isDarkTheme: colorScheme === 'dark'});
    });
    return () => {
      subscription.remove();
    };
  }, []);

  // network
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

  // language
  React.useEffect(() => {
    RNLocalize.addEventListener('change', handleLocalizationChange);
    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    };
  }, []);

  const appContext = () => ({
    toggleTheme: () => {
      setAppConfig({...appConfig, isDarkTheme: !isDarkTheme});
    },
    switchLanguage: (newLanguage) => {
      setAppConfig({...appConfig, language: newLanguage});
    },
  });

  // custom theme
  const CustomDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#ffffff',
      text: '#272727',
    },
  };

  const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#000000',
      text: '#ebebeb',
    },
  };

  return (
    <AppearanceProvider>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
            <AppContext.Provider value={appContext}>
              <NavigationContainer
                theme={isDarkTheme ? CustomDarkTheme : CustomDefaultTheme}>
                <StatusBar
                  barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
                  backgroundColor={isDarkTheme ? '#000000' : '#ffffff'}
                />
                {store.getState().auth.token !== null ? (
                  <MainTabScreen />
                ) : (
                  <InitStackScreen />
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
