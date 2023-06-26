import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import styles from '../Constants/Styles';
import WifiManager from 'react-native-wifi-reborn';
import { useNavigation } from '@react-navigation/native';
import { disconnectWifi } from '../Utils/disconnectWifi';


const ConnectedWifi = () => {
  const [connectedWifiSsid, setConnectedWifiSsid] = useState<string | null>(null);
  const [isClicked, setIsClicked] = useState(false)
  const [isConnected , setIsConnected] = useState(false)


  useEffect(() => {
    WifiManager.setEnabled(true);
    const ConnectedWifiStatus = async () => {
      try {
        if (await WifiManager.isEnabled()) {
          const connectedSsid = await WifiManager.getCurrentWifiSSID();
          setConnectedWifiSsid(connectedSsid);
          setIsConnected(true)
          console.log('connectedSsid', connectedSsid)
        } else {
          setConnectedWifiSsid(null);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };
    ConnectedWifiStatus();
  }, []);

  const handleWifiSelected = async () => {
    if(connectedWifiSsid) {setIsClicked(previous => !previous)}
    console.log('connectedWifiSsid', connectedWifiSsid)
    console.log('clicked on Connected wifi name');
  }
  const navigator = useNavigation()
  const handleShare = () => {
    console.log('share option clicked');
    navigator.navigate('SenderScreen')
  }
  const handleReceive = () => {
    console.log('share option clicked');
    navigator.navigate('ReceiverScreen')
  }
  const handleDisConnect = async () => {
    console.log('Disconnect option clicked');
    await disconnectWifi(connectedWifiSsid)
    setIsConnected(false)
    // setConnectedWifiSsid(null)
    // setIsClicked(false);
    // ConnectedWifi()
  }

  return (
    <View>
      <TouchableOpacity
        onPress={handleWifiSelected}
        style={[styles.connectedWifi,]}
      >
        <Text style={styles.connectedWifiName}>
          {/* {connectedWifiSsid || 'Currently Not Connected'} */}
          {isConnected && connectedWifiSsid || 'Currently Not Connected'}
        </Text>
        {isClicked && isConnected  && connectedWifiSsid &&
          // <Text>clicked</Text>
          <View style={styles.shareReceiveDisConnect}>
            <TouchableOpacity
              onPress={handleShare}
            >
              <Text style={styles.share}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleReceive}
            >
              <Text style={styles.receive}>Receive</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDisConnect}
            >
              <Text style={styles.disConnect}>Disconnect</Text>
            </TouchableOpacity>

          </View>
        }
      </TouchableOpacity>
    </View>
  );
};

export default ConnectedWifi;
