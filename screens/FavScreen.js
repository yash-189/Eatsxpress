import { View, Text, FlatList } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux'
import { selectFavItems } from '../features/favSlice'
import FoodCard from '../components/FoodCard'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'

const FavScreen = () => {

  const navigation = useNavigation()
    useLayoutEffect(() => {

        navigation.setOptions({
            headerShown: false
            

        })
    }, [])

  const items = useSelector(selectFavItems)

  return (
    <SafeAreaView className='flex-1 bg-white'>
         <View className='pt-14 bg-white pb-5 flex-row px-4 space-x-4 items-center'>
                <ArrowLeftIcon onPress={() => navigation.goBack()} size={24} color={'gray'} />
                <Text className='text-gray-800 font-bold '>Your favourite's</Text>
                

            </View>
      <View className=''>
       

        <FlatList
          data={items}
          renderItem={({ item }) => <FoodCard name={item.name}
            Rimage={item.restaurantImage} rating={item.rating} id={item._id} />}
        />

      </View>
    </SafeAreaView>
  )
}

export default FavScreen