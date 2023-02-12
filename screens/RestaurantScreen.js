import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import client, { urlFor } from '../Sanity'
import { StarIcon, ArrowLeftIcon } from 'react-native-heroicons/solid'
import { MapPinIcon } from 'react-native-heroicons/outline'
import CategoryItem from '../components/CategoryItem'
import RestaurantItemCard from '../components/RestaurantCard/RestaurantItemCard'

const RestaurantScreen = ({ route }) => {
    const navigation = useNavigation()
    useLayoutEffect(() => {

        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const { _id, restaurantImage, name, location, dishes, category, rating } = route.params

    console.log(route.params, 'lllll');
    const [data, setdata] = useState([])

    useEffect(() => {
        client.fetch(`
        *[_type== "restaurant" && _id== $id]{
            ..., 
            dishes[]->{
                ...,
              }
          }
        `, { id: _id })
            .then((data) => {
                console.log(data, 'iiii');
                setdata(data)
            })
    }, [_id])

    // console.log('kkkkkkkkkk', _id);
    return (
        <SafeAreaView className=' bg-gray-100/5 h-full'>
            <ScrollView>
                {/* <Text>{name}</Text> */}
                <View className='relative'>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 14, left: 16, zIndex: 10, }}>
                        <ArrowLeftIcon size={26} fontWeight={800} color={'white'} />
                    </TouchableOpacity>

                    <Image source={{
                        uri: urlFor(restaurantImage?.asset?._ref).url(),
                    }} resizeMode='cover' className='w-full h-56' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} />
                    <View className='absolute bg-black/50  w-full h-full px-4 pt-24'>
                        <Text className='text-3xl text-white/90 font-bold capitalize'>{name}</Text>
                        <View className='flex-row space-x-1 items-center mt-1 '>
                            <MapPinIcon size={16} color={'#e6e6e6'} opacity={0.7} />
                            <Text className='text-lg  text-white/70 opacity-70'>{location}</Text>
                        </View>
                        <View className='flex-row space-x-1 items-center'>
                            <StarIcon size={16} color={'#c79d04'} />

                            <Text className='text-base text-white/90 '>{rating}

                            </Text>
                        </View>

                    </View>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }} className=' mt-6 flex-row'>
                    <CategoryItem />
                    <CategoryItem />
                    <CategoryItem />
                </ScrollView>
                <RestaurantItemCard data={data} />

            </ScrollView>
            <View className='bg-white flex-row justify-between items-center  shadow-md shadow-black/50   px-4 pt-5 pb-7 absolute bottom-0 right-0 left-0 rounded-xl z-50' style={{ elevation: 5 }}>
                <View>
                    <Text className='text-gray-800 -mb-1  text-base font-semibold'>
                        ₹500
                    </Text>
                    <Text className='text-green-600  text-sm font-semibold'>
                        View Detailed Bill
                    </Text>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('RestaurantScreen')} className=' rounded-xl bg-green-600/90'>
                    <Text className='text-white text-lg font-semibold px-12 py-2.5'>Proceed to Pay</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RestaurantScreen