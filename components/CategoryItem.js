import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'

const CategoryItem = () => {
    return (
        
        <TouchableOpacity style={{elevation:6}} className='shadow-lg shadow-black/50 bg-white rounded-full justify-center items-center py-3 h-14 px-4 ml-3 flex-row'>

            <Image source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/5987/5987424.png',
            }}
                className='h-10 w-10 mr-2' />
            <Text className='text-md'>CategoryItem</Text>
        </TouchableOpacity>
        
    )
}

export default CategoryItem