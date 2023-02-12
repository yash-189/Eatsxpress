import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Animated, Button, ScrollView, FlatList, LogBox } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StarIcon, ViewfinderCircleIcon } from 'react-native-heroicons/solid'
import { HeartIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import client, { urlFor } from '../Sanity'
import FoodItem3 from '../components/FoodItem3'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import loadingImage from '../assets/takeout-food.png'
import { MaterialIcons } from '@expo/vector-icons';
import LoadingScreen from './LoadingScreen'
import { FontAwesome5 } from '@expo/vector-icons';







const Restscreen = ({ route }) => {
  
    const { id,name } = route.params
    console.log('id', id, 'idddddddd', route.params);


    const navigation = useNavigation()


    const [restaurantData, setrestaurantData] = useState([])
    const [dishes, setdishes] = useState([])
    const [loading, setloading] = useState(true)

    useEffect(()  => {
        client.fetch(`
        *[_type== "restaurant" && _id== $id]{
            ..., 
            dishes[]->{
                ...,
              },
            category[]->{
                ...,
              }
          }
        `, { id })
            .then((data) => {
                console.log(data, 'rrrrrrrrrrrrr');
                setrestaurantData(...data)
                setdishes(data[0]?.dishes)
                console.log(dishes, 'lllllllllllllllll');
                 navigation.setOptions({
                    headerShown: true
                })
            setloading(false)

            })
    }, [id])


    const items = useSelector(selectBasketItems)
    const totalPrice = useSelector(selectBasketTotal)
    console.log(totalPrice,'oooppp');
    if (loading) {
        return <LoadingScreen/>
    }

  
    return (
        <SafeAreaView>
            <ScrollView className='bg-white' contentContainerStyle={{paddingBottom:90}}>


                <SafeAreaView className='px-4 bg-blue-900/10 py-6 rounded-b-3xl'>
                    <View className='bg-white border border-gray-300 rounded-2xl shadow-black shadow-lg px-4 py-4'>
                        <View className='pb-3 border-b border-gray-100'>
                            <View className='flex-row justify-between '>
                                <Text className='text-gray-900 text-xl font-extrabold capitalize'>
                                    {restaurantData?.name}
                                </Text>
                                <HeartIcon size={24} color='gray' />
                            </View>

                            <View className='flex-row space-x-2 items-center my-1.5'>
                                <View className='flex-row '>

                                   <MaterialIcons name="stars" size={18} color="green" />

                                    <Text className='text-gray-700 ml-1 font-semibold text-sm'>
                                        {restaurantData?.rating} (1K+ ratings)
                                    </Text>
                                </View>

                                <Text className='bg-gray-700 h-1 w-1 rounded-full'> </Text>
                                <Text className='text-gray-700 text-sm font-semibold'>
                                    ₹300 for two
                                </Text>

                            </View>

                            <View className=''>
                                <Text className='text-gray-700 text-sm'>
                                    {restaurantData?.category?.map(item=> item.name + ', ')}
                                </Text>

                            </View>
                        </View>
                        <View className='flex-row space-x-4 items-center pt-3'>
                            <View className='items-center' >
                                <Text className='bg-gray-400/60 h-2 w-2 rounded-full' > </Text>
                                <Text className='bg-gray-400  ' style={{ height: 22, width: 1 }}> </Text>
                                <Text className='bg-gray-400/60 h-2 w-2 rounded-full'> </Text>
                            </View>
                            <View className=''>
                                <View className='flex-row mb-2'>
                                    <Text className='text-gray-800 font-semibold w-16 text-sm'>
                                        Outlet
                                    </Text>
                                    <Text className='text-gray-600 text-sm '>
                                        {restaurantData?.address}
                                    </Text>
                                </View>
                                <View className='flex-row '>
                                    <Text className='text-gray-800 font-semibold w-16 text-sm'>
                                        {restaurantData?.time}
                                    </Text>
                                    <Text className='text-gray-600 text-sm'>
                                        Delivery to Home
                                    </Text>
                                </View>

                            </View>
                        </View>
                    </View>
                </SafeAreaView>

                <View className='pl-4 pr-2'>
                    <View className='my-4 justify-center'>
                        <Text className='text-gray-600 tracking-widest text-center'>MENU</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')} className='bg-gray-200/60 flex-row justify-center space-x-2 rounded-xl px-4 mr-2 py-2.5 '>
                        <Text className=' text-base flex-1 text-center text-gray-400' >Search for dishes</Text>
                        <MagnifyingGlassIcon color={'gray'} size={20} />

                    </TouchableOpacity>


                    <FlatList
                        data={dishes}
                        renderItem={({ item }) => (
                            <FoodItem3 key={item._id} name={item.name} rating={item.rating} price={item.price} description={item.description} image={item.image} id={item._id} restaurant={restaurantData.name}  lat={restaurantData?.lcation?.lat} lng={restaurantData?.lcation?.lng} />
                        )}
                    //  StickyHeaderComponent={<Text>header</Text>}
                    // ListHeaderComponent={()=><Text>1231312</Text>}
                    // ListFooterComponent={()=><Text>1231312</Text>}

                    />




                </View>


            </ScrollView>

{items.length >=1 ?
            <View className='bg-white  flex-row justify-between items-center  shadow-md shadow-black/50   px-4 pt-5 pb-7 absolute bottom-0 right-0 left-0 rounded-xl z-50' style={{ elevation: 5 }}>
                <View>
                    <Text className='text-gray-800 -mb-1  text-base font-semibold'>
                        {items.length} Items |  ₹{totalPrice}
                    </Text>
                    <Text className='text-green-600  text-sm font-semibold'>
                        View Detailed Bill
                    </Text>
                </View>
                <TouchableOpacity
                 onPress={() => navigation.navigate('Cart',{name,lat:restaurantData?.location?.lat,lng:restaurantData?.location?.lng})} className=' rounded-xl bg-green-600/90'>
                    <Text className='text-white text-lg font-semibold px-12 py-2.5'>Proceed to Pay</Text>
                </TouchableOpacity>
            </View>
            :''
}
        </SafeAreaView>
    )
}

export default Restscreen