import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import TwilioVoice from 'react-native-twilio-voice';

const TwilioCallComponent = () => {
const [isReady, setIsReady] = useState(false);
const [callSid, setCallSid] = useState('');

// Fetch the access token from your server
async function fetchAccessToken() {
// Replace with your token URL and request logic
const response = await fetch('YOUR_TOKEN_URL');
const data = await response.json();
return data.accessToken;
}

// Initialize Twilio
useEffect(() => {
fetchAccessToken().then(token => {
TwilioVoice.initWithToken(token);
setIsReady(true);
});
}, []);

// Place a call
const makeCall = async (toNumber) => {
if (isReady) {
const call = await TwilioVoice.connect({ To: toNumber });
setCallSid(call.sid);
}
};

// Hang up the call
const hangup = () => {
TwilioVoice.disconnect(callSid);
};

return (
<View>
<Button title="Make a Call" onPress={() => makeCall('+1234567890')} />
<Button title="Hang Up" onPress={hangup} />
</View>
);
};

export default TwilioCallComponent;
