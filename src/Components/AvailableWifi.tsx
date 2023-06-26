import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import styles from '../Constants/Styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { securedSignalStrengthIcon,
   signalStrengthIcon } from '../Utils/signalStrengthIcon';


const AvailableWifi = ({ wifi }: any) => {
  // console.log(wifi.item.capabilities.includes("PSK"));
  const isProtectedWithPassword = wifi.item.capabilities.includes("PSK")
  let wifiDetails : any=''

  const navigation: any = useNavigation();

  const handleWifiSelected = () => {
    // console.log('wifi.item.strength', wifi.item.level)
    // console.log('wifi.item.strength', wifi.item)
    wifiDetails = wifi.item.capabilities 

    navigation.navigate("ConnectToWifi", { selectedWifi: wifi.item })
  }


  // for lock and no-lock icons
  const signalIcon = isProtectedWithPassword ? securedSignalStrengthIcon(wifi.item.level) : signalStrengthIcon(wifi.item.level)

  // frequency level
  const frequency = wifi.item.frequency >=3000 ? '5GHz' :'2.4GHz'

  return (
    <View>
    <TouchableOpacity
      onPress={handleWifiSelected}
      style={styles.wifiCard}
    >
      <Icon name={signalIcon} size={20} color="black" style={styles.signalIcon} />
      <Text style={styles.availableWifiName}>{wifi.item.SSID}</Text> 
      <Text style={styles.textForDark}>{frequency}</Text>
      {/* {connectiedWifiBssid == wifi.item.BSSID && <Text>hai</Text>} */}
    </TouchableOpacity>
    </View>
  )
}
export default AvailableWifi