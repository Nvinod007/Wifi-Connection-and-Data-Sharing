import WifiManager from 'react-native-wifi-reborn';

export const getConnectedWifiStatus = async () => {
  try {
    const connectedSsid = await WifiManager.getCurrentWifiSSID();
    const connectedWifiBssid = await WifiManager.getBSSID()
    console.log('getWifiConnectedStatus Your current connected WiFi SSID is ' + connectedSsid);
    console.log('connectedWifiBssid in connected wifi', connectedWifiBssid)
    return connectedWifiBssid

  } catch (error) {
    console.log('getWifiConnectedStatus Cannot get current SSID!', error);
    return 'Not Connected to Any';
  }
};
