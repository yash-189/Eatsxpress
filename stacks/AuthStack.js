import { View, Text } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'

import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Signup from '../screens/Signup';
import Login from '../screens/Login';
import OnboardingScreen from '../screens/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';



const Stack = createNativeStackNavigator();

const AuthStack = () => {



  const [isFirstLaunch, setisFirstLaunch] = useState()
  const [loading, setloading] = useState(true)

  const getStorage = async () => {
    const onboarded = await AsyncStorage.getItem('ONBOARDED')
    console.log(onboarded, 'async');

    if (onboarded === null) {
      setisFirstLaunch(true)
      await AsyncStorage.setItem('ONBOARDED', 'true');
      // console.log('not launch');
      setloading(false)
    } else {
      // console.log('launch ');
      setisFirstLaunch(false)
      setloading(false)
    }
  }


  useLayoutEffect(() => {
    getStorage()
  }, [])


  if (loading) return <Loader />

  return (
    <>

      <Stack.Navigator initialRouteName=''  >

        {isFirstLaunch ?
          <Stack.Screen
            name='onboarding'
            options={{ headerShown: false }}
            component={OnboardingScreen}>

          </Stack.Screen>
          : null}


<Stack.Screen
          name='login'
          options={{ headerShown: false,
            animation:"fade_from_bottom",
          
            
          
          }}
          component={Login} >
          

        </Stack.Screen>

        
        <Stack.Screen
          name='signup'
          options={{ headerShown: false }}
          component={Signup}>

        </Stack.Screen>

        



      </Stack.Navigator>


    </>
  )
}

export default AuthStack