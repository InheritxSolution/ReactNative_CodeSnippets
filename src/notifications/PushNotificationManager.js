/**
 * @file PushNotificationManager.js
 * @description Centralized manager for Firebase Cloud Messaging (FCM).
 * @company Inheritx Solutions
 */

import messaging from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';

class PushNotificationManager {
  /**
   * Initialize notification listeners and request permissions.
   */
  async initialize() {
    const authorized = await this.requestPermission();
    if (authorized) {
      this.getToken();
      this.createNotificationListeners();
    }
  }

  /**
   * Requests notification permissions (iOS specific).
   */
  async requestPermission() {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Permission request failed:', error);
      return false;
    }
  }

  /**
   * Fetches the FCM token for the device.
   */
  async getToken() {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
        // Typically you would send this token to your server here
        return fcmToken;
      }
    } catch (error) {
      console.error('Failed to get FCM token:', error);
    }
  }

  /**
   * Sets up listeners for different notification states.
   */
  createNotificationListeners() {
    // 1. Foreground state messages
    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      console.log('Foreground message received:', remoteMessage);
      Alert.alert(
        remoteMessage.notification?.title || 'Notification',
        remoteMessage.notification?.body || ''
      );
    });

    // 2. Background/Quit state message opened
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('Notification caused app to open from background:', remoteMessage);
    });

    // 3. Check if app was opened from a quit state via notification
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', remoteMessage);
        }
      });
  }

  /**
   * Clean up listeners when the component unmounts.
   */
  unregister() {
    if (this.messageListener) {
      this.messageListener();
    }
  }
}

export default new PushNotificationManager();
