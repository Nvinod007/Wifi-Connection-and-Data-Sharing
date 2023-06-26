import WifiManager from 'react-native-wifi-reborn';

export const disconnectWifi = async (ssid:any) => {
  try {
    await WifiManager.disconnect();
    // await WifiManager.disconnectFromSSID(ssid)
    console.log('Wi-Fi disconnected successfully');
  } catch (error) {
    console.log('Error disconnecting Wi-Fi:', error);
  }
};

