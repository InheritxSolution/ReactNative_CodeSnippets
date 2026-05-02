/**
 * @file LocationService.js
 * @description Efficient geolocation tracking with background support.
 * @company Inheritx Solutions
 */

import Geolocation from 'react-native-geolocation-service';
import { Platform, PermissionsAndroid, Alert } from 'react-native';

/**
 * LocationService
 * Handles permission checks and location tracking.
 */
export const LocationService = {
  /**
   * Request location permissions for Android.
   */
  async requestPermission() {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      return auth === 'granted';
    }

    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Inheritx App needs access to your location for background tracking.',
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
    return false;
  },

  /**
   * Get the current location once.
   */
  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  },

  /**
   * Start watching location changes in real-time.
   * @param {Function} callback - Success callback with position data.
   */
  startTracking(callback) {
    return Geolocation.watchPosition(
      (position) => callback(position),
      (error) => {
        console.error('Location tracking error:', error);
        Alert.alert('Location Error', 'Unable to track location.');
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10, // Minimum distance (in meters) to trigger update
        interval: 5000, // Update interval for Android
        fastestInterval: 2000,
      }
    );
  },

  /**
   * Stop watching location.
   * @param {number} watchId - The ID returned from startTracking.
   */
  stopTracking(watchId) {
    if (watchId !== undefined) {
      Geolocation.clearWatch(watchId);
    }
  }
};

export default LocationService;
