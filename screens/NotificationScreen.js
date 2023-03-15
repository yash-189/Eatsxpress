import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'

const NotificationScreen = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='pt-14 bg-white pb-5 flex-row px-4 space-x-4 items-center'>
        <ArrowLeftIcon onPress={() => navigation.goBack()} size={24} color={'gray'} />
        <Text className='text-gray-800 font-bold '>Notifications</Text>


      </View>
      <View className=''>

        <View className=' justify-center items-center'>
          <Text className='text-sm text-gray-600'>No new notification</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
  export default NotificationScreen