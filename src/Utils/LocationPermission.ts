// to turn on the wifi location is needed.
import React, { useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid, Linking, Platform, Alert, ToastAndroid } from 'react-native';

export const LocationPermission = async () => {
  let locationStatus = 'Error'
  try {
    
    await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then( async(result) => {
        if (result) {
        // console.log('in try of location permission');
        // console.log('Permission is OK');
        locationStatus = 'granted'
        return true
      }
      else {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).then(result => {
          console.log('in location status', result);
          if (result.toLocaleLowerCase() === 'granted') {
            // console.log('Location permission granted', result);
          } else if (result.toLocaleLowerCase() === 'denied') {
            // console.log('Location permission denied', result);
          } else if (result.toLocaleLowerCase() === 'never_ask_again') {
            // console.log('Location permission denied with "Never ask again"');
            ToastAndroid.show('Enable location in app settings',ToastAndroid.SHORT)
            
            // Linking.openSettings();
          } else {
            // console.log(result);
          }
          console.log('locationStatus in try', locationStatus)
          locationStatus = result
        })
      };
    })

  } catch (error) {
    // console.error('Failed to check location status:', error);
  }
  // console.log('locationStatus', locationStatus)
  return locationStatus === 'granted' ? true : false
}


