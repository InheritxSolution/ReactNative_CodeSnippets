# 🚀 Premium React Native Snippets by Inheritx Solutions

[![React Native](https://img.shields.io/badge/React_Native-v0.72+-61DAFB?logo=react&logoColor=black&style=for-the-badge)](https://reactnative.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-v18-FFCA28?logo=firebase&logoColor=white&style=for-the-badge)](https://firebase.google.com/)
[![Twilio](https://img.shields.io/badge/Twilio-Voice-F22F46?logo=twilio&logoColor=white&style=for-the-badge)](https://www.twilio.com/)
[![Biometrics](https://img.shields.io/badge/Security-Biometrics-00C853?logo=faceid&logoColor=white&style=for-the-badge)](https://github.com/SelfLiveness/react-native-biometrics)
[![Storage](https://img.shields.io/badge/Storage-MMKV-4285F4?logo=sqlite&logoColor=white&style=for-the-badge)](https://github.com/mrousavy/react-native-mmkv)

Welcome to the official **Inheritx Solutions** open-source snippet repository. This collection showcases high-performance, production-ready React Native components and integration patterns designed to accelerate mobile development.

---

## 🌟 Featured Snippets

### 🔐 1. Advanced Social Authentication
A robust implementation of **Google** and **Apple** sign-in using Firebase. It includes full error handling for edge cases like cancelled login flows or missing play services.
*   **Location**: `src/auth/FirebaseSocialAuth.js`

### 🆔 2. Biometric Security
Secure local authentication using **FaceID**, **TouchID**, or **Android Fingerprint**.
*   **Location**: `src/auth/BiometricAuth.js`
*   **Features**: Key generation, sensor availability checks, and secure prompts.

### 📞 3. Twilio VoIP Voice Integration
A clean, modular component for handling real-time voice communication using Twilio.
*   **Location**: `src/communication/TwilioVoiceCall.js`
*   **Features**: Permission handling, token initialization, and call state management.

### 🔔 4. Push Notification Manager
Centralized management for **Firebase Cloud Messaging (FCM)**.
*   **Location**: `src/notifications/PushNotificationManager.js`
*   **Features**: Token generation, background/foreground listeners, and permission requests.

### ⚡ 5. High-Performance Storage (MMKV)
Synchronous, lightning-fast key-value storage using MMKV.
*   **Location**: `src/storage/StorageProvider.js`
*   **Features**: Typed getters/setters, JSON serialization, and memory-efficient caching.

### 🎨 6. Dynamic Theme Manager
A scalable Light/Dark mode system using React Context.
*   **Location**: `src/theme/ThemeManager.js`
*   **Features**: System theme synchronization, persistent selection, and easy-to-use hooks.

### 📍 7. Background Location Tracking
Efficient geolocation tracking with background support.
*   **Location**: `src/location/LocationService.js`
*   **Features**: Configurable accuracy, battery-efficient updates, and dual-platform permission handling.

---

## 🛠️ Getting Started

### Prerequisites
Ensure you have the core dependencies installed in your React Native project:

```bash
# General Setup
npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/messaging
npm install @react-native-google-signin/google-signin @invertase/react-native-apple-authentication
npm install react-native-biometrics react-native-mmkv
npm install react-native-twilio-voice react-native-geolocation-service
```

### Usage
Every snippet is designed to be **modular**. Simply copy the desired feature from the `src/` directory into your project and configure the respective SDKs (Firebase, Twilio, etc.).

---

## 🏗️ Architecture & Best Practices
At **Inheritx Solutions**, we follow industry-leading standards for mobile engineering:
- **Clean Architecture**: Separation of concerns between UI, Business Logic, and Storage.
- **Security First**: All components emphasize secure token handling and permission checks.
- **Performance Optimized**: Using synchronous storage (MMKV) and efficient listeners.
- **Cross-Platform**: Designed to work seamlessly on both Android and iOS.

---

## 🤝 Contributing
We welcome contributions! If you have a high-quality snippet to share, please feel free to open a Pull Request.

---

## 🏢 About Inheritx Solutions
Inheritx Solutions is a global leader in software engineering, specializing in cutting-edge mobile and web applications. We empower businesses by delivering scalable, high-quality technical solutions.

**[Visit our Website](https://www.inheritx.com/) | [Follow us on LinkedIn](https://www.linkedin.com/company/inheritx-solutions)**

---

<p align="center">
  Made with ❤️ by the Inheritx Engineering Team
</p>
