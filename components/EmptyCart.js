import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import emptyCart from '../assets/emptycart.png'
import { Image } from 'react-native'

const EmptyCart = () => {
    const navigation = useNavigation()
    useLayoutEffect(() => {

        navigation.setOptions({
            headerShown: false
        })
    }, [])
    return (
        <View className='flex-1 bg-white  justify-center items-center'>
            <Image source={emptyCart} className='h-60 w-60' />
            <Text className='text-gray-600 text-sm'>Your cart is empty. Add something from the menu</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')}>
                <Text className='text-orange-500 px-3 py-2 bg-orange-100 border border-orange-200 rounded-xl mt-6 font-semibold text-lg'>Browse Restaurants</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EmptyCart