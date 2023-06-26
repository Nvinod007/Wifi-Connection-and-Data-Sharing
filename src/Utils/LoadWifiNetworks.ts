import { useEffect, useState } from 'react';
import WifiManager, { WifiEntry } from 'react-native-wifi-reborn';

  // const [networks, setNetworks] = useState([]);
  const [networks, setNetworks] = useState<WifiEntry[]>([]);
  

  useEffect(() => {
    // Load available WiFi networks on component mount
    loadWifiNetworks();
  }, []);

  export const loadWifiNetworks = async () => {
    try {
      const wifiNetworks = await WifiManager.loadWifiList();
      setNetworks(wifiNetworks);
    } catch (error:any) {
      console.log('Error loading WiFi networks:', error.message);
      if ("Location service is turned off"===error.message){
        console.log('LocationStatus()')
      }

    }
  };
