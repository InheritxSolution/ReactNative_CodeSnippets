/**
 * @file BiometricAuth.js
 * @description Secure local authentication using FaceID, TouchID, or Android Fingerprint.
 * @company Inheritx Solutions
 */

import ReactNativeBiometrics from 'react-native-biometrics';
import { Alert } from 'react-native';

const rnBiometrics = new ReactNativeBiometrics();

/**
 * BiometricService
 * High-level API for handling biometric authentication.
 */
export const BiometricService = {
  /**
   * Checks if biometrics are available and enrolled on the device.
   * @returns {Promise<boolean>}
   */
  async isAvailable() {
    try {
      const { available, biometryType } = await rnBiometrics.isSensorAvailable();
      if (available) {
        console.log(`Biometrics available: ${biometryType}`);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Biometric availability check failed:', error);
      return false;
    }
  },

  /**
   * Prompts the user for biometric authentication.
   * @param {string} promptMessage - Message displayed to the user.
   * @returns {Promise<boolean>}
   */
  async authenticate(promptMessage = 'Confirm your identity') {
    try {
      const isSupported = await this.isAvailable();
      if (!isSupported) {
        Alert.alert('Not Supported', 'Biometric authentication is not available on this device.');
        return false;
      }

      const { success, error } = await rnBiometrics.simplePrompt({
        promptMessage,
        cancelButtonText: 'Cancel',
      });

      if (success) {
        console.log('Successfully authenticated');
        return true;
      } else {
        console.log('Authentication failed or cancelled:', error);
        return false;
      }
    } catch (error) {
      console.error('Biometric authentication error:', error);
      Alert.alert('Error', 'An error occurred during biometric authentication.');
      return false;
    }
  },

  /**
   * Generates a key pair for secure server-side verification (Advanced).
   */
  async createSignature(payload) {
    const { success, signature } = await rnBiometrics.createSignature({
      promptMessage: 'Sign in',
      payload,
    });
    return { success, signature };
  }
};

export default BiometricService;
