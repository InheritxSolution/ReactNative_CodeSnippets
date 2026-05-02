/**
 * @file StorageProvider.js
 * @description Synchronous, high-performance local storage using MMKV.
 * @company Inheritx Solutions
 */

import { MMKV } from 'react-native-mmkv';

/**
 * Initialize a global storage instance.
 * You can also create multiple instances for different domains (e.g., 'user-data', 'app-settings').
 */
export const storage = new MMKV({
  id: 'inheritx-app-storage',
  // encryptionKey: 'optional-secure-key' 
});

/**
 * StorageProvider
 * A wrapper around MMKV to provide typed access and logging.
 */
export const StorageProvider = {
  /**
   * Set a string value.
   */
  setString(key, value) {
    storage.set(key, value);
  },

  /**
   * Get a string value.
   */
  getString(key) {
    return storage.getString(key);
  },

  /**
   * Set an object (automatic JSON serialization).
   */
  setObject(key, value) {
    storage.set(key, JSON.stringify(value));
  },

  /**
   * Get an object (automatic JSON parsing).
   */
  getObject(key) {
    const value = storage.getString(key);
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      console.error(`Failed to parse storage object for key: ${key}`);
      return null;
    }
  },

  /**
   * Set a boolean value.
   */
  setBool(key, value) {
    storage.set(key, value);
  },

  /**
   * Get a boolean value.
   */
  getBool(key) {
    return storage.getBoolean(key);
  },

  /**
   * Remove a specific key.
   */
  remove(key) {
    storage.delete(key);
  },

  /**
   * Clear all stored data.
   */
  clearAll() {
    storage.clearAll();
  }
};

export default StorageProvider;
