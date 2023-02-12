import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { urlFor } from '../Sanity'
import { useNavigation } from '@react-navigation/native'

const FoodItem = ({ title, description, price, image, res }) => {

    const navigation = useNavigation()
    return (
        <TouchableOpacity style={{elevation:6}} className='ml-3 z-20 bg-white shadow-lg boder border-gray-100 shadow-black/60  h-40 w-40 rounded-3xl px-4 justify-end items-center py-4 relative'
            onPress={() => navigation.navigate('Rest', ...res)}>
            <Image source={{
                uri: urlFor(image).url(),

            }} resizeMode='contain'
                className='h-28 w-28 bottom-[106px] self-center absolute drop-shadow-xl shadow-black rounded-full' />
            <View className='mb-1'>

                <Text className='text-base text-center font-semibold text-gray-800'>{title}</Text>
                <Text className='text-center text-gray-400'>{description.slice(0,10)}</Text>
            </View>
            <Text className='text-xl mt-0.5 font-semibold text-gray-800'>₹{price}</Text>
        </TouchableOpacity>
    )
}

export default FoodItem