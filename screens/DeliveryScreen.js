import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Progress from 'react-native-progress';
import { XMarkIcon } from 'react-native-heroicons/solid';
import takeaway from '../assets/TakeAway.png'
import take from '../assets/Take.png'
import { CommonActions, useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { resetStore, selectBasketItems } from '../features/basketSlice';

const DeliveryScreen = ({route}) => {
    const {name,lng,lat} = route.params
    console.log(route,lat,lng,'delv');
    const navigation = useNavigation()
    const items = useSelector(selectBasketItems)
    const dispatch = useDispatch() 

    const [restarant, setrestarant] = useState(items[0]?.restaurant)

    useEffect(() => {

        CommonActions.reset({
            index: 1,
            routes: [{ name: 'HomeScreen' }],       
       })
       
 setTimeout(() => {
    dispatch(resetStore())
 }, 1000);
            
         
         
 
    
      }, [])

    return (
        <View className='bg-[#9e76dd] flex-1'>
            <SafeAreaView className='mx-4 mt-14 z-10'>
                <View className='flex-row justify-between mb-6'>
                    <XMarkIcon size={30} color='white' onPress={() => navigation.navigate('HomeScreen')} />
                    <Text className='text-white font-medium text-xl'>
                        Order Help
                    </Text>
                </View>
                <View className='bg-white py-4 px-4 rounded-xl'>

                    <View className=' flex-row justify-between items-center'>
                        <View className=''>
                            <Text className='text-gray-400 font-bold text-xl'>
                                Estimated Arrival
                            </Text>
                            <Text className=' font-bold text-gray-900 text-3xl mb-3'>
                                30-35 Minutes
                            </Text>

                            <Progress.Bar size={30} color='#9e76dd' indeterminate={true} />

                        </View>
                        <Image source={takeaway} className='h-32 w-28' />
                    </View>
                    <Text className='text-gray-400 font-medium text-sm'>
                        Your order at {restarant} is being prepared
                    </Text>

                </View>


            </SafeAreaView>
            <MapView initialRegion={{
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            }} className='flex-1 -mt-10 z-0' mapType='standard' >
                <Marker coordinate={{
                    latitude: lat,
                    longitude: lng,
                }} title={name}
                    pinColor={'#FB6E3B'} />

            </MapView>
            <SafeAreaView className='bg-white py-2 px-6'>
                <View className='flex-row justify-between items-center space-x-2'>
                    <View className='flex-row space-x-2 items-center'>
                        <Image source={take} className='h-20 w-20 rounded-full' />

                        <View>
                            <Text className='text-base text-gray-800'>
                                Rider Name
                            </Text>
                            <Text className='text-sm text-gray-500'>
                                Your Rider
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Text className='text-base text-[#9e76dd]'>Call</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default DeliveryScreen