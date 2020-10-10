import React, {useRef} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {KeyboardContainer, RNText, RNTextInput} from '../components/common';

const Login = ({}) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  //function
  const onLogin = () => {
    console.log('hihi', emailRef, emailRef.current);
  };

  return (
    <KeyboardContainer style={styles.container}>
      <View style={styles.topView}>
        <RNText font="semibold" style={styles.startedText}>
          Let's get started
        </RNText>
        <RNText font="regular" style={styles.descriptionText}>
          Log in to your exist account to see all features
        </RNText>
      </View>
      <View style={styles.inputView}>
        <RNTextInput
          ref={emailRef}
          placeholder="Enter your email"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <RNTextInput
          ref={passwordRef}
          placeholder="Enter your password"
          returnKeyType="done"
          secureTextEntry
          style={styles.passwordTextInput}
        />
      </View>
      <RNText font="regular" style={styles.forgotText}>
        Forgot password?
      </RNText>
      <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
        <RNText font="regular" style={styles.loginButtonText}>
          Login
        </RNText>
      </TouchableOpacity>
      <RNText font="regular" style={styles.otherConnectText}>
        Or connect using
      </RNText>

      <View>
        <TouchableOpacity style={styles.facebookButton}>
          <Icon name="facebook-f" size={23} color="white" />
          <RNText font="medium" style={styles.socialButtonText}>
            Login via Facebook
          </RNText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButton}>
          <Icon name="google" size={23} color="white" />
          <RNText font="medium" style={styles.socialButtonText}>
            Login via Google
          </RNText>
        </TouchableOpacity>
      </View>
    </KeyboardContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  topView: {
    marginTop: 80,
  },
  startedText: {
    fontSize: 24,
  },
  descriptionText: {
    fontSize: 16,
    paddingVertical: 10,
  },
  inputView: {
    marginVertical: 20,
  },
  passwordTextInput: {
    marginTop: 20,
  },
  forgotText: {
    textAlign: 'right',
  },
  loginButton: {
    backgroundColor: '#e21e5d',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  otherConnectText: {
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 30,
    paddingBottom: 20,
  },
  facebookButton: {
    backgroundColor: '#0183ff',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    flexDirection: 'row',
  },
  socialButtonText: {
    fontSize: 14,
    textAlign: 'center',
    paddingLeft: 20,
    color: 'white',
  },
  googleButton: {
    backgroundColor: '#d5493c',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    flexDirection: 'row',
  },
});
export default Login;
