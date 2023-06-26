import WifiManager from 'react-native-wifi-reborn';
import NetInfo from '@react-native-community/netinfo';
// import React, { useEffect, useState } from 'react';
import { View, Text, ToastAndroid } from 'react-native';



export const isWifiTurnedOn = async () => {
  const netInfoState = await NetInfo.fetch();
  // console.log(netInfoState)
  console.log("in enable wifi")
  console.log('netInfoState.type', netInfoState.type)
  if (netInfoState.type === 'wifi' && !netInfoState.isConnected) {
    try {
      WifiManager.setEnabled(true);
      console.log('Wi-Fi turned on successfully.');
    } catch (error) {
      console.error('Failed to turn on Wi-Fi:', error);
      ToastAndroid.show("Turn on Wifi",ToastAndroid.SHORT)
    }
  } else {
    console.log('Wi-Fi is already enabled.--in enablewifi');
  }
  console.log('checking wifi turned on or not ...........................');
  
  let isWifiOnOrOff=false;

    const checkWifiStatus = async () => {
      isWifiOnOrOff = await WifiManager.isEnabled();
    };

    checkWifiStatus();

  return isWifiOnOrOff
};