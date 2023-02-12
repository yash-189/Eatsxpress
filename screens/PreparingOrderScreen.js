import { View, Text, SafeAreaView, Image, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import im from '../assets/TakeAway.gif'
import * as Progress from 'react-native-progress';
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { resetStore } from '../features/basketSlice';

const PreparingOrderScreen = ({route}) => {
const {name , lat , lng} = route.params
    console.log(route,'kkkkkkkkkkkkkkkkkk');
   
    const navigation = useNavigation()
     useEffect(() => {
       setTimeout(() => {

        navigation.navigate('Delivery',{name,lat,lng})
        
        

       }, 4000);
     }, [])
     
    
    
    return (
        <SafeAreaView className='bg-white flex-1 justify-center items-center'>
            <Image
            source={im}
            
            className='w-64 h-60'

            />
            <Text   className='text-base font-semibold mb-6'> Waiting for Restaurant to accept your order!</Text>
             <Progress.CircleSnail size={50} spinDuration={2000} color={['#FB6E3B', '#3b2b5a', '#9e76dd']}  />
        </SafeAreaView>
    )
}

export default PreparingOrderScreen