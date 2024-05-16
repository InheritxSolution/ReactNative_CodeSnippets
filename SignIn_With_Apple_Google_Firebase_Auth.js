import React from 'react';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';

// Configure Google Sign-In
GoogleSignin.configure({
// ... other options
webClientId: 'your-web-client-id', // From Google Developer Console
});

// Function to handle Google Sign-In
async function onGoogleButtonPress() {
const { idToken } = await GoogleSignin.signIn();
const googleCredential = auth.GoogleAuthProvider.credential(idToken);
return auth().signInWithCredential(googleCredential);
}

// Function to handle Apple Sign-In
async function onAppleButtonPress() {
const appleAuthRequestResponse = await appleAuth.performRequest({
requestedOperation: appleAuth.Operation.LOGIN,
requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
});

if (!appleAuthRequestResponse.identityToken) {
throw new Error('Apple Sign-In failed - no identify token returned');
}

const { identityToken, nonce } = appleAuthRequestResponse;
const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
return auth().signInWithCredential(appleCredential);
}

const App = () => {
return (
<>
{/* Google Sign-In button */}
<GoogleSigninButton
onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
/>

{/* Apple Sign-In button */}
<AppleButton
buttonStyle={AppleButton.Style.WHITE}
buttonType={AppleButton.Type.SIGN_IN}
onPress={() => onAppleButtonPress().then(() => console.log('Signed in with Apple!'))}
/>
</>
);
};

export default App;