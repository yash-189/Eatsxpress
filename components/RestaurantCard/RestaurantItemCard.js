import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'

import client, { urlFor } from '../../Sanity'
import { useDispatch, useSelector } from 'react-redux'
import { selectBasketItems, addToBasket, selectBasketItemsWithId } from '../../features/basketSlice'
import RestaurantFoodCard from './RestaurantFoodCard'

const RestaurantItemCard = ({ id, data }) => {

    const items = useSelector((state) => selectBasketItemsWithId(state, id))
    console.log(items, 'items');

    const dispach = useDispatch()

    const onclick = (id, name) => {
        dispach(addToBasket({ id, name }))
    }

    // console.log(data, 'oooo');


    return (
        <View className='bg-white px-2 py-4 rounded-md'>
            <View className='flex-row space-x-3 '>
                <Text className='font-bold text-lg'>Juice</Text>
                <Text className='font-bold text-lg text-gray-400'>5 items</Text>
            </View>

            <FlatList 
        data={data[0]?.dishes}
        renderItem={({item}) => <RestaurantFoodCard name={item.name} price={item.price} image={item.image?.asset?._ref} description={item.description} id={item._id} />}
        keyExtractor={item => item._id} contentContainerStyle={{paddingHorizontal:0}}
      />

        </View>
    )
}

export default RestaurantItemCard