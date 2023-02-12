import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import loadingImage from '../assets/takeout-food.png'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const LoadingScreen = () => {

  const navigation = useNavigation()
  useLayoutEffect(() => {

    navigation.setOptions({
      headerShown: false
    })
  }, [])
  return (
    <View className='flex-1 bg-white  justify-center items-center'>
      <Image source={loadingImage} className='h-60 w-60' />
     
    </View>
  )
}

export default LoadingScreen