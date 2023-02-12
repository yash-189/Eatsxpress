import { View, Text, SafeAreaView, Image, SafeAreaViewBase, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import { Bars3BottomLeftIcon, ChevronDownIcon, MagnifyingGlassIcon, AdjustmentsVerticalIcon, } from "react-native-heroicons/solid";
import CategoryItem from '../components/CategoryItem';
import FoodItem from '../components/FoodItem';
import TabBar from '../components/TabBar';
import PopularItems from '../components/PopularItems';
import client from '../Sanity';
import { useFonts } from 'expo-font';

const Home = () => {

    const [fontsLoaded] = useFonts({
        'SF-Pro-Display-Black': require('../assets/fonts/SF-Pro-Display-Black.ttf'),
    });

    const navigation = useNavigation()
    useLayoutEffect(() => {

        navigation.setOptions({
            headerShown: false
        })
    }, [])



    const [popularData, setpopularData] = useState([])

    useEffect(() => {
        client.fetch(`
  *[_type== "popular"]{
    ...,
    dishes[]->{
      ...,
      restaurant[]->{
        ...,
      }
    }
  }
  `)
            .then((data) => {
                console.log(data);
                setpopularData(data)
            })
    }, [])
    console.log(popularData);
    return (

        <SafeAreaView className='mt-14 bg-white/90'>
            <ScrollView contentContainerStyle={{ paddingBottom: 90 }}
                stickyHeaderIndices={[2]}>

                <View className='flex-row px-6 '>


                    <View className='flex-row  flex-1  items-center space-x-3'>
<TouchableOpacity onPress={()=>navigation.navigate('MY ACCOUNT')}>

                        <Image  source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/5987/5987424.png',
                        }}
                            className='h-12 w-12'
                        />
</TouchableOpacity>

                        <View className=''>
                            <Text>Deliver Now!</Text>
                            <Text className='text-base font-bold'>Current Location
                                <ChevronDownIcon size={20} color='gray' />
                            </Text>


                        </View>


                    </View>
                    <View className=' rounded-2xl'>
                        <Bars3BottomLeftIcon size={40} color='gray' />

                    </View>
                </View>



                <View className='px-6 mt-6 mb-8'>
                    <Text className='text-3xl font-bold'>Let's find </Text>
                    <Text className='text-3xl font-bold  '>food near you</Text>
                    {/* <Text style={{ fontFamily: 'SF-Pro-Display-Black', fontSize: 30 }}>Let's find</Text> */}
                </View>

                <View className='px-3  mx-6 flex-row items-center space-x-2 py-3 bg-gray-200 rounded-xl sticky top-0' >
                    <View className='flex-row flex-1  space-x-2 items-center'>
                        <MagnifyingGlassIcon size={20} color='gray' />
                        <TextInput className='   flex-1' placeholder='Search' />
                    </View>

                    <AdjustmentsVerticalIcon size={30} color='gray' />
                </View>




                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }} className=' mt-6 flex-row'>
                    <CategoryItem />
                    <CategoryItem />
                    <CategoryItem />
                </ScrollView>


                {popularData?.map((elems) => {
                    return <PopularItems name={elems.name} data={elems?.dishes} />

                })}
                {/* <PopularItems />
                <PopularItems /> */}








            </ScrollView>





            <StatusBar style="auto" />

        </SafeAreaView>

    )
}

export default Home