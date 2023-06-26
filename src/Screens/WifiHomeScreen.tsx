import React, { useState } from 'react';
import { View, Text, Switch, FlatList, ToastAndroid } from 'react-native';
import styles from '../Constants/Styles';
import WifiManager, { WifiEntry } from 'react-native-wifi-reborn';
import { LocationPermission } from '../Utils/LocationPermission';
import AvailableWifi from '../Components/AvailableWifi';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ConnectedWifi from '../Components/ConnectedWifi';
import { useIsFocused } from '@react-navigation/native';
import { isWifiTurnedOn } from '../Utils/isWifiTurnedOn';

const WifiHomeScreen = () => {

  const [isWifiEnabled, setIsWifiEnabled] = useState(false);
  const [networks, setNetworks] = useState<WifiEntry[]>([]);

  let isLocationPermissionGranted: any = false
  let isWifiOnOrOff: any = false

  // to render a particular component whenever come to screen again.
  const isFouced = useIsFocused();

  // to load the wifi networks available
  const loadWifiNetworks = async () => {
    try {
      const wifiNetworks = await WifiManager.loadWifiList();
      // console.log('wifiNetworks', wifiNetworks)
      setNetworks(wifiNetworks);

    } catch (error: any) {
      console.log('Error loading WiFi networks:', error.message);
      if (
        error.message === 'Location service is turned off' ||
        error.message === 'Location permission (ACCESS_FINE_LOCATION) is not granted'
      ) {
        console.log('LocationPermission()')
        ToastAndroid.show('Please turn on location', ToastAndroid.SHORT);
        setIsWifiEnabled(false)
        setNetworks([])
      }

    }
  };
  LocationPermission().then(res => { isLocationPermissionGranted = res })

  const toggleSwitch = () => {
    isWifiTurnedOn()
    setIsWifiEnabled(previousState => !previousState)
    WifiManager.setEnabled(true); //set WiFi ON
    if (!isWifiEnabled && isLocationPermissionGranted) {
      loadWifiNetworks();
    }
    else {

      WifiManager.setEnabled(false); //set WiFi OFF
      setIsWifiEnabled(false)
      setNetworks([])
    }
  };

  const handleRefreshIcon = () => {
    if (!isWifiEnabled) { return }
    setNetworks([])
    loadWifiNetworks()
  }

  // sorting as per signal level and security.
  const sortedNetworks = networks.sort((a, b) => {
    // Sort by level in descending order
    if (a.level > b.level) return -1;
    if (a.level < b.level) return 1;
    // Sort by capability (checking for 'PSK' in capabilities)
    const hasPSKA = a.capabilities.includes('PSK');
    const hasPSKB = b.capabilities.includes('PSK');
    if (hasPSKA && !hasPSKB) return -1;
    if (!hasPSKA && hasPSKB) return 1;
    return 0;
  });


  return (
    <View style={styles.container}>
      {/* <View style={{height:0,width:0 }}><ConnectedWifi/></View> */}
      <View style={{ flexDirection: 'row', backgroundColor: 'lightgray', }}>
        <Text style={styles.headerText}>Show Available Wi-Fi's</Text>
        <Switch
          style={styles.switch}
          value={isWifiEnabled}
          onValueChange={toggleSwitch}
        />
      </View>

      <Text style={styles.textForDark}>   Connected Network</Text>
      {isFouced && <ConnectedWifi />}

      {/* <View style={styles.separator} /> */}
      {/* <Text style={styles.textForDark}>   saved Networks (backend needed) // TODO</Text> */}
      <View style={styles.separator} />
      <View style={styles.availAndRefresh}>
        <Text style={styles.textForDark}>    Available Networks </Text>
        <Icon name='refresh' style={styles.refreshIcon} onPress={handleRefreshIcon} />

      </View>
      <FlatList
        data={sortedNetworks}
        renderItem={(item) => <AvailableWifi wifi={item} />}
        keyExtractor={(item) => item.BSSID}
        // below two lines for last item.
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{ height: 16 }}
      />
    </View>
  );
};

export default WifiHomeScreen
