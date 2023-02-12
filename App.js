
import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useFonts } from 'expo-font';
import { Provider, useDispatch } from 'react-redux';
import store from './store';

import 'firebase/auth';


import app, { auth } from './firebaseConfig';
import Main from './Main';


NativeWindStyleSheet.setOutput({
  default: "native",
});



export default function App({ route }) {
  // const {name} = route.params
  const [fontsLoaded] = useFonts({
    'SF-Pro-Display-Black': require('./assets/fonts/SF-Pro-Display-Black.ttf'),
  });
  

 








 


  return (
    <NavigationContainer>
   
      <Provider store={store}>
        <Main/>



      </Provider>
      </NavigationContainer>

  );
}

