/**
 * @file TwilioVoiceCall.js
 * @description A production-ready React Native component for Twilio Voice integration.
 * @company Inheritx Solutions
 */

import React, { useState, useEffect, useCallback } from 'react';
import { View, Button, StyleSheet, Text, PermissionsAndroid, Platform, Alert } from 'react-native';
import TwilioVoice from 'react-native-twilio-voice';

/**
 * TwilioVoiceCall Component
 * Demonstrates secure token initialization and call management.
 */
const TwilioVoiceCall = () => {
  const [isReady, setIsReady] = useState(false);
  const [callSid, setCallSid] = useState('');
  const [callStatus, setCallStatus] = useState('Idle');

  /**
   * Request microphone permissions (required for Android).
   */
  const requestPermissions = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'Inheritx App needs access to your microphone to make calls.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS permissions are handled via Info.plist
  }, []);

  /**
   * Fetch the access token from your secure server.
   * NOTE: Never hardcode your Twilio API secrets in the client app.
   */
  const fetchAccessToken = async () => {
    try {
      const response = await fetch('https://your-api.inheritx.com/twilio/token');
      const data = await response.json();
      return data.accessToken;
    } catch (error) {
      console.error('Failed to fetch Twilio token:', error);
      Alert.alert('Error', 'Could not initialize calling service.');
      return null;
    }
  };

  /**
   * Initialize Twilio SDK with the fetched token.
   */
  useEffect(() => {
    const init = async () => {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        setCallStatus('Permission Denied');
        return;
      }

      const token = await fetchAccessToken();
      if (token) {
        TwilioVoice.initWithToken(token);
        setIsReady(true);
        setCallStatus('Ready');
      }
    };

    init();

    // Cleanup listeners if applicable
    return () => {
      // TwilioVoice.removeEventListeners();
    };
  }, [requestPermissions]);

  /**
   * Places a call to a specific phone number.
   * @param {string} toNumber - The destination number in E.164 format.
   */
  const makeCall = async (toNumber) => {
    if (!isReady) {
      Alert.alert('Not Ready', 'Please wait for the service to initialize.');
      return;
    }

    try {
      setCallStatus('Connecting...');
      const call = await TwilioVoice.connect({ To: toNumber });
      setCallSid(call.sid);
      setCallStatus('On Call');
    } catch (error) {
      console.error('Call connection failed:', error);
      setCallStatus('Failed');
      Alert.alert('Call Failed', error.message);
    }
  };

  /**
   * Disconnects the active call.
   */
  const hangup = () => {
    if (callSid) {
      TwilioVoice.disconnect(callSid);
      setCallSid('');
      setCallStatus('Ready');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>Status: {callStatus}</Text>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Place Call" 
          onPress={() => makeCall('+1234567890')} 
          disabled={!isReady || callStatus === 'On Call'}
          color="#2E7D32"
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Hang Up" 
          onPress={hangup} 
          disabled={callStatus !== 'On Call'}
          color="#C62828"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    margin: 10,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 10,
  },
});

export default TwilioVoiceCall;

