import * as React from 'react';

import {Text, StatusBar, Button, StyleSheet, SafeAreaView} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  AppearanceProvider,
  Appearance,
  useColorScheme,
} from 'react-native-appearance';
import 'react-native-gesture-handler';

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

const Stack = createStackNavigator();

const App = () => {
  const scheme = useColorScheme();

  console.log('colorScheme', scheme);

  return (
    <AppearanceProvider>
      <SafeAreaProvider>
        <NavigationContainer
          theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack.Navigator>
            <Stack.Screen
              name="Screen1"
              component={Screen1}
              options={{
                headerTitle: 'hihi',
                headerTitleAlign: 'center',
                headerRight: () => (
                  <Button
                    onPress={() => alert('This is a button!')}
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
      </SafeAreaProvider>
    </AppearanceProvider>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default App;
