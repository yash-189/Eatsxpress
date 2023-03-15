
import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useFonts } from 'expo-font';
import { Provider, useDispatch } from 'react-redux';
import store from './store';

import 'firebase/auth';


import app, { auth } from './firebaseConfig';
import Main from './Main';
import ErrorBoundary from 'react-native-error-boundary'
import { StyleSheet, Text, View } from "react-native";
import Test from "./screens/Test";
import Example from "./screens/Example";


NativeWindStyleSheet.setOutput({
  default: "native",
});



export default function App({ route }) {
  // const {name} = route.params
  const [fontsLoaded] = useFonts({
    'SF-Pro-Display-Black': require('./assets/fonts/SF-Pro-Display-Black.ttf'),
  });
  

  const ErrorFallback = (props) => (
    <View style={styles.container}>
       <Text style={styles.title}>Something happened!</Text>
       <Text style={styles.text}>{props.error.toString()}</Text>
    </View>
 )
 
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:20,
    backgroundColor: '#ecf0f1',
    padding: 8,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    fontSize: 48
  },
  text: {
    marginVertical: 16
  }
});








 


  return (
    <NavigationContainer>
   
      <Provider store={store}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Main/>
        {/* <Test/> */}
        {/* <Example/> */}
        </ErrorBoundary>



      </Provider>
      </NavigationContainer>

  );
}

