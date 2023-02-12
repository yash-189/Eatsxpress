import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'

const SearchScreen = () => {
    const navigation = useNavigation()
    return (
        <View className='bg-white/60 flex-1 px-4'>
            <SafeAreaView>
                <View className='mt-14 mb-5 bg-white border border-gray-300 shadow-black shadow-2xl items-center rounded-lg  py-3 px-3.5 flex-row space-x-2' >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size={24} color='gray' fontWeight={'900'} />

                    </TouchableOpacity>
                    <TextInput className='' placeholder='Search for restaurant, item or more' />
                </View>
            </SafeAreaView>

            <ScrollView>
                <View className='my-2 flex-row items-center space-x-4'>
                    <Image source={{uri:'https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg'}}
                    className='h-16 w-16 rounded-full' />
                    <View>
                        <Text className='font-semibold'>
                            Burgers
                        </Text>
                        <Text className='text-sm'>
                            Dish
                        </Text>
                    </View>
                </View>







               
            </ScrollView>
        </View>
    )
}

export default SearchScreen