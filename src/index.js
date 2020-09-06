import * as React from 'react';
import {
  Text,
  StatusBar,
  Button,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppearanceProvider, Appearance} from 'react-native-appearance';
import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';
import * as RNLocalize from 'react-native-localize';
import {store, persistor} from './redux-toolkit/store';

function Screen1({navigation}) {
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: '#6a51ae'}]}>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <Text style={{color: '#fff'}}>Light Screen</Text>
      <Button
        title="Next screen"
        onPress={() => navigation.navigate('Screen2')}
        color="blue"
      />
    </SafeAreaView>
  );
}

function Screen2({navigation}) {
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: '#ecf0f1'}]}>
      <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <Text>Dark Screen</Text>
      <Button
        title="Next screen"
        onPress={() => navigation.navigate('Screen1')}
      />
    </SafeAreaView>
  );
}

const useAppLanguage = () => {
  const appLocale = RNLocalize.getLocales();
  const appLanguage = RNLocalize.findBestAvailableLanguage(
    appLocale.map((item) => item.languageCode),
  );
  return {appLocale, appLanguage};
};

const Stack = createStackNavigator();

export const AppContext = React.createContext();

const App = () => {
  const {appLanguage} = useAppLanguage();

  const [appConfig, setAppConfig] = React.useState({
    isDarkTheme: Appearance.getColorScheme() === 'dark',
    language: appLanguage.languageTag || 'en',
  });

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
      setAppConfig({...appConfig, isDarkTheme: !appConfig.isDarkTheme});
    },
    switchLanguage: (newLanguage) => {
      setAppConfig({...appConfig, language: newLanguage});
    },
  });

  return (
    <AppearanceProvider>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
            <AppContext.Provider value={appContext}>
              <NavigationContainer
                theme={appConfig.isDarkTheme ? DarkTheme : DefaultTheme}>
                <Stack.Navigator>
                  <Stack.Screen
                    name="Screen1"
                    component={Screen1}
                    options={{
                      headerTitle: 'hihi',
                      headerTitleAlign: 'center',
                      headerRight: () => (
                        <Button
                          onPress={() => appContext().toggleTheme()}
                          title="Info"
                          color="green"
                        />
                      ),
                    }}
                  />
                  <Stack.Screen
                    name="Screen2"
                    component={Screen2}
                    options={{
                      headerLeft: (props) => (
                        <HeaderBackButton {...props} tintColor="blue" />
                      ),
                    }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </AppContext.Provider>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </AppearanceProvider>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default App;
