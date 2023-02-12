import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import FoodItem from './FoodItem'

const PopularItems = ({ name, data }) => {
  return (
    <View className='mt-1'>
      <View className='flex-row px-6  items-center'>
        <Text className='text-lg flex-1 font-bold'>{name}</Text>
        <Text className='text-sm font-medium text-[#FB6E3B]'>View more</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30, paddingTop: 70 }} className=' '>

        {data?.map((dish) => {
          // console.log(dish, 'kkk');
          return <FoodItem title={dish.name} description={dish.description} price={dish.price} image={dish?.image?.asset?._ref} res={dish?.restaurant} />
        })}

        {/* <FoodItem />
        <FoodItem /> */}

      </ScrollView>
    </View>
  )
}

export default PopularItems