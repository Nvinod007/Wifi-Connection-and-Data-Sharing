import { View, Text, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from '../Constants/Styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import WifiManager from 'react-native-wifi-reborn';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ConnectedWifi from './ConnectedWifi';
import { postData } from '../Utils/postData';


const ConnectToWifi = () => {
  const routes: any = useRoute();
  // console.log('routes.params', routes.params.selectedWifi);
  const selectedWifi = routes.params.selectedWifi;
  const [connected, setConnected] = useState({ connected: false, ssid: selectedWifi.SSID.toString });
  // const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isConnecting,setIsConnecting] = useState(false);

  const isWep = false;
  const isHidden = false;
  const isProtectedWithPassword = selectedWifi.capabilities.includes("PSK")


  const connectToSelected = async () => {

    console.log('in connecting progress -- connectToWifi');

    try {
      const data = await WifiManager.connectToProtectedSSID(selectedWifi.SSID, password, isWep, isHidden);
      console.log('-- connectToWifiConnected successfully!', { data });
      ToastAndroid.show('Connection Successful', ToastAndroid.SHORT)
      setConnected({ connected: true, ssid: selectedWifi.SSID });
    } catch (error: any) {
      setConnected({ connected: false, ssid: '' });
      ToastAndroid.show('Turn on the WIFI Manually', ToastAndroid.SHORT)
      console.log('-- connectToWifiConnection failed!', { error });
    }
  };

  

  const handleShowpasswdIcon = () => {
    setShowPassword(!showPassword);
  };

  const navigation: any = useNavigation();

  const handlePostData = async () => {
    const url = 'http://localhost:5000/WifiDataInsert';
  
    const data = {
      index: selectedWifi.index,
      item: {
        BSSID: selectedWifi.item.BSSID,
        SSID: selectedWifi.item.SSID,
        capabilities: selectedWifi.item.capabilities,
        frequency: selectedWifi.item.frequency,
        password: password,
      },
    };
  
    await postData(url, data);
  };

  const handleConnectWifiConnection = async () => {
    // Handle connecting to the Wi-Fi network with the provided password
    // 7993626942 passwd for pg wifi
    setIsConnecting(true)
    console.log('Connecting to Wi-Fi with password:', password);
    await connectToSelected()
    setIsConnecting(false)
    handlePostData().then((res)=>{console.log('data posted successfully', res)}).catch((e)=>{console.log('error posting data', e)})
    navigation.navigate("WifiHomeScreen")

    // postData(`
    //   BSSID:${selectedWifi.BSSID},
    //   SSID:${selectedWifi.SSID},
    //   capabilities:${selectedWifi.capabilities},
    //   frequency:${selectedWifi.frequency},
    //   password:${password}
    // `,)
  };

  const handleCancelWifiConnection = () => {
    console.log('Wi-Fi connection canceled');
    setShowPassword(!showPassword);
    navigation.navigate("WifiHomeScreen")

  };

  // for input focus
  const [isFocused, setIsFocused] = useState(false);

  const handleTextInputFocus = () => {
    setIsFocused(true);
  };

  const handleTextInputBlur = () => {
    setIsFocused(false);
  };

  return (
    <View>
      <Text style={styles.availableWifiName}>{selectedWifi.SSID}</Text>

      {isProtectedWithPassword && <>
        <TextInput
          style={[
            styles.passwdInput,
            isFocused && styles.passwdInputFocused, // Apply focused style if isFocused is true
          ]}
          secureTextEntry={!showPassword}
          placeholder="Enter password"
          placeholderTextColor="gray"
          value={password}
          onChangeText={setPassword}
          onFocus={handleTextInputFocus}
          onBlur={handleTextInputBlur}
        />

          <TouchableOpacity onPress={handleShowpasswdIcon} style={styles.showPasswd}>
            <Icon
              name={showPassword ? 'eye' : 'eye-off'}
              size={24}
              color="black"
              style={styles.eyeIcon}
            />
          <Text style={styles.showPasswd}>Show Password</Text>
          </TouchableOpacity>
      </>
      }
      {!isProtectedWithPassword &&
        <>
          <Text style={styles.textForDark}>Are you sure you want to use an insecure WiFi network {selectedWifi.SSID}? </Text>
        </>
      }

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <TouchableOpacity
          onPress={handleCancelWifiConnection}
        >
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleConnectWifiConnection}
        >
          {isProtectedWithPassword && <Text style={styles.connectButton}>Connect</Text>}
          {!isProtectedWithPassword && <Text style={styles.connectButton}>Proceed</Text>}
        </TouchableOpacity>
      </View>
      
      {isConnecting && <ActivityIndicator size='large'/>}
    </View>
  );
};

export default ConnectToWifi;
