import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { urlFor } from '../Sanity'
import { TouchableOpacity } from 'react-native'

const CategoryCard = ({image, name}) => {
    console.log(image,'yyyyy');
  return (
    <TouchableOpacity activeOpacity={0.8} className='px-4 items-center'   style={{ elevation: 6 }} >
        <Image source={{
                        uri: urlFor(image).url()
                    }} resizeMode='cover'
                    
                   
                     className='h-20 w-20 rounded-full shadow-black shadow-2xl' />

                    <Text className='text-sm text-center font-medium text-gray-600 mt-2'>{name}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard