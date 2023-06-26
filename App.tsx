// required to fix an unhandled event due to the asynchronous router
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WifiHomeScreen from './src/Screens/WifiHomeScreen';
import SecondScreen from './src/canDelete/SecondScreen';
import ConnectToWifi from './src/Components/ConnectToWifi';
import SenderScreen from './src/Screens/SenderScreen';
import ReceiverScreen from './src/Screens/ReceiverScreen';
import { Strings } from './src/Constants/Strings';
import ConnectedWifi from './src/Components/ConnectedWifi';
import { View } from 'react-native';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <View style={{height:0,width:0 }}><ConnectedWifi/></View>
      <Stack.Navigator>
        <Stack.Screen
          name= {Strings.WifiHomeScreen}
          component={WifiHomeScreen}
          options={{
            title: 'Wi-Fi',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: 'black',
            },

          }} />
        <Stack.Screen 
          name={Strings.SecondScreen}
          component={SecondScreen}
          options={{title:'Second'}} />

        <Stack.Screen 
          name="ConnectToWifi" 
          component={ConnectToWifi}
          options={{title:'Wi-Fi',headerTitleAlign: 'center',}} />

        <Stack.Screen
          name="SenderScreen"
          component={SenderScreen}
          options={{title:'Sender Screen',headerTitleAlign: 'center',}} />
        <Stack.Screen
          name="ReceiverScreen"
          component={ReceiverScreen}
          options={{title:'Receiver Screen',headerTitleAlign: 'center',}} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}
export default App;
