/**
 * @file FirebaseSocialAuth.js
 * @description A robust implementation of Google and Apple authentication using Firebase.
 * @company Inheritx Solutions
 */

import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';

/**
 * Configure Google Sign-In with your credentials.
 * Ensure you have the correct webClientId from your Google Developer Console.
 */
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  offlineAccess: true,
});

/**
 * Handles the Google Sign-In process.
 * @returns {Promise<void>}
 */
const onGoogleButtonPress = async () => {
  try {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    await auth().signInWithCredential(googleCredential);
    
    Alert.alert('Success', 'Successfully signed in with Google!');
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('User cancelled the login flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Sign in is in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      Alert.alert('Error', 'Play services not available or outdated');
    } else {
      console.error('Google Sign-In Error:', error);
      Alert.alert('Error', 'An unexpected error occurred during Google Sign-In');
    }
  }
};

/**
 * Handles the Apple Sign-In process.
 * @returns {Promise<void>}
 */
const onAppleButtonPress = async () => {
  try {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    // Ensure Apple returned an identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identity token returned');
    }

    const { identityToken, nonce } = appleAuthRequestResponse;

    // Create an Apple credential with the token
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

    // Sign-in the user with the credential
    await auth().signInWithCredential(appleCredential);
    
    Alert.alert('Success', 'Successfully signed in with Apple!');
  } catch (error) {
    console.error('Apple Sign-In Error:', error);
    Alert.alert('Error', 'An unexpected error occurred during Apple Sign-In');
  }
};

/**
 * FirebaseSocialAuth Component
 * A clean UI featuring both Google and Apple sign-in buttons.
 */
const FirebaseSocialAuth = () => {
  return (
    <View style={styles.container}>
      {/* Google Sign-In button */}
      <GoogleSigninButton
        style={styles.googleBtn}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onGoogleButtonPress}
      />

      {/* Apple Sign-In button */}
      <AppleButton
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.SIGN_IN}
        style={styles.appleBtn}
        onPress={onAppleButtonPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  googleBtn: {
    width: '100%',
    height: 48,
    marginBottom: 16,
  },
  appleBtn: {
    width: '100%',
    height: 48,
  },
});

export default FirebaseSocialAuth;