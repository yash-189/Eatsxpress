import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import emptyCart from '../assets/emptycart.png'
import { Image } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'

const EmptyCart = () => {
    const navigation = useNavigation()
    useLayoutEffect(() => {

        navigation.setOptions({
            headerShown: false
        })
    }, [])
    return (
        <View className='flex-1 bg-white  justify-center items-center'>
             <View className=' absolute top-10 left-5   rounded-full py-2 px-2 z-10'>
                        <ArrowLeftIcon onPress={() => navigation.goBack()} size={25} color='gray' />
                    </View>
            <Image source={emptyCart} className='h-60 w-60' />
            <Text className='text-gray-600 text-sm'>Your cart is empty. Add something from the menu</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')}>
                <Text className='text-orange-500 px-3 py-2 bg-orange-100/50 border border-orange-200 rounded-xl mt-6 font-medium text-base'>Browse Restaurants</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EmptyCart