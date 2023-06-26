import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    color:'#000',
  },
  headerText:{ 
    color: '#000', 
    fontSize: 20, 
    margin: 20 },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray', //lightgray
  },
  availableWifiName: {
    // flexDirection:'row',
    color: 'black',
    padding: 6,
    fontSize: 16,
    fontWeight: 'bold',
  },connectedWifiName: {
    color: 'black',
    fontSize: 26,
    alignSelf:'center',
  },
  switch: {
    position: 'absolute',
    right: 5,
    margin: 20,
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  connectedWifi:{
    marginTop: 10,
    padding: 16,
    marginHorizontal:20,
    
  },
  share:{
    color:'#0c0',
    fontSize:20,
    justifyContent:'center',
    alignSelf:'center'

  },
  receive:{
    color:'blue',
    fontSize:20,
    justifyContent:'center',
    alignSelf:'center'

  },
  disConnect:{
    color:'red',
    fontSize:20,
    justifyContent:'center',
    alignSelf:'center'

  },
  wifiCard: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    borderRadius: 25,
    padding: 16,
    // margin: 0,
    marginTop: 20,
    marginHorizontal: 5,
    // elevation: 5,
    // shadowColor: '#000',
    // verticalAlign:'middle',
    // justifyContent: 'flex-start',

  },
  wifiNames: {
    color: 'black',
    fontSize: 6,
    fontWeight: 'bold',
  },
  shareReceiveDisConnect:{
    flexDirection:'row',
    justifyContent:'space-evenly'

  },
  signalIcon: {
    verticalAlign: 'middle',
    marginRight:20,
    marginHorizontal:10,
  },
  passwdInput: {
    fontSize:20,
    borderBottomWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    margin: 10,
    color: "black",
  },
  passwdInputFocused: {
    borderBottomWidth: 1.8,
    borderBottomColor: 'lightgreen', // border color when focused
  },
  showPasswd: {
    flexDirection:'row',
    marginLeft: 8,
    marginRight:16,
    color: 'black',
    verticalAlign:'middle',
    justifyContent:'flex-start'
  },
  eyeIcon: {
    marginLeft: 8,
    color: 'black',
  },
  textForDark: {
    color: '#000',
  },
  cancelButton: {
    margin: 20,
    // right:80,
    color: '#030',
  },
  connectButton: {
    margin: 20,
    // right:40,
    color: '#0c0',
  },
  connectedSsid:{
    color:'#000',
    fontSize:24,
    alignSelf:'center'
  },
  refreshIcon:{
    position:'absolute',
    fontSize: 30, 
    color:'black',
    alignSelf:'flex-end',
    right:44,
    verticalAlign:'middle'
  },
  availAndRefresh:{
    marginTop:10,
    // maxWidth:'100%',
    flexDirection:'row',
    verticalAlign:'middle',
    paddingTop:10,
    
  }
});

export default styles