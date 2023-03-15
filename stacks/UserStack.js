
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import TabBar from '../components/TabBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import { Provider, useDispatch } from 'react-redux';
import store from '../store';
import RestaurantScreen from '../screens/RestaurantScreen';
import PreparingOrderScreen from '../screens/PreparingOrderScreen';
import SearchScreen from '../screens/SearchScreen';
import MyAccountscreen from '../screens/MyAccountscreen';
import Restscreen from '../screens/Restscreen';
import DeliveryScreen from '../screens/DeliveryScreen';
import { useEffect, useState } from 'react';
import LocationScreen from '../screens/LocationScreen';
import CartScreen from '../screens/CartScreen';
import LocationPrompt from '../components/LocationPrompt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from '../screens/OnboardingScreen';
import InitialScreen from '../screens/InitialScreen';


import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import Signup from '../screens/Signup';

const Stack = createNativeStackNavigator();

const UserStack = () => {


  return (
    <>
      
        <Stack.Navigator initialRouteName='Home'  >
      
          <Stack.Screen name='Home'
            //  options={{headerShown:false}} 
            component={TabBar}></Stack.Screen>
          <Stack.Screen name='Restaurant' component={RestaurantScreen}></Stack.Screen>
          <Stack.Screen name='PreparingOrder'
            options={{
              headerShown: false,
              presentation: 'fullScreenModal',
              animation: 'fade_from_bottom'


            }}
            component={PreparingOrderScreen}>

          </Stack.Screen>
          <Stack.Screen name='Delivery'
            options={{
              headerShown: false,
              presentation: 'fullScreenModal',
              animation: 'slide_from_bottom'

            }}
            component={DeliveryScreen}>

          </Stack.Screen>
          <Stack.Screen name='Location'
            options={{
              headerShown: false,
              presentation: 'fullScreenModal',
              animation: 'slide_from_bottom'

            }}
            component={LocationScreen}>

          </Stack.Screen>
          <Stack.Screen name='MY ACCOUNT'
            options={{
              headerShown:false,
              presentation: 'fullScreenModal',

            }}
            component={MyAccountscreen}>

          </Stack.Screen>
          <Stack.Screen name='locationPromt'
            options={{
              headerShown: false,
              presentation: 'fullScreenModal',

            }}
            component={LocationPrompt}>

          </Stack.Screen>

          <Stack.Screen name='onboarding'
            options={{
              headerShown: false,
              presentation: 'fullScreenModal',
              animation: 'fade'

            }}
            component={OnboardingScreen}>

          </Stack.Screen>

          
          <Stack.Screen name='initial'
            options={{
              headerShown: false,
              presentation: 'fullScreenModal',
              animation: 'fade'

            }}
            component={InitialScreen}>

          </Stack.Screen>



          <Stack.Screen name='RestaurantScreen'
            options={({ route }) => ({
              title: route.params.name,
              headerStyle: {
                // backgroundColor: '#ffae94',
              },
              headerTintColor: 'black',
              headerTitleStyle: {
                fontWeight: '100',
                fontSize: 18,


              },
              animation: 'slide_from_right'
            }
            )

            }

            // options={{
            //   title:route.params.name
            //   // headerShown:false,
            //   // presentation:'fullScreenModal',

            // }}
            component={Restscreen}>

          </Stack.Screen>
          <Stack.Screen name='Search'
            options={{
              headerShown: false,
              presentation: 'fullScreenModal',
              animation: 'slide_from_bottom'
            }}
            component={SearchScreen}>

          </Stack.Screen>

          <Stack.Screen
            name='Cart'
            options={{
              // headerShown: false,
              presentation: 'fullScreenModal',
              animation: 'slide_from_right'


            }}
            component={CartScreen}>

          </Stack.Screen>

        </Stack.Navigator>





   
    </>
  )
}

export default UserStack