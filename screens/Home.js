import { View, Text, SafeAreaView, Image, SafeAreaViewBase, TextInput, ScrollView, TouchableOpacity, NativeModules, FlatList, LogBox } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import { Bars3BottomLeftIcon, ChevronDownIcon, MagnifyingGlassIcon, AdjustmentsVerticalIcon, HomeIcon, UserCircleIcon, } from "react-native-heroicons/solid";
import CategoryItem from '../components/CategoryItem';
import FoodItem from '../components/FoodItem';
import TabBar from '../components/TabBar';
import PopularItems from '../components/PopularItems';
import client from '../Sanity';
import { useFonts } from 'expo-font';
import FoodCard from '../components/FoodCard';
import FoodCardItem2 from '../components/FoodCardItem2';
import * as SplashScreen from 'expo-splash-screen';
import loadingImage from '../assets/takeout-food.png'
import { useDispatch, useSelector } from 'react-redux';
import { selectaddress } from '../features/locationSlice';
import * as Progress from 'react-native-progress';
import CategoryCard from '../components/CategoryCard';
import Loader from '../components/Loader';

import { getDatabase, ref, onValue, set, push, child, update, remove } from "firebase/database";
import { getAuth } from 'firebase/auth';
import { getCart } from '../features/basketSlice';
import { getFav } from '../features/favSlice';
import Animated, { useSharedValue, useAnimatedStyle,withSpring } from 'react-native-reanimated';
import { useColorScheme } from 'react-native';



const Home = () => {

    const isDarkMode = useColorScheme() === 'dark';
console.log(isDarkMode,'dark');

    const [fontsLoaded] = useFonts({
        'SF-Pro-Display-Black': require('../assets/fonts/SF-Pro-Display-Black.ttf'),
    });
    const [isTabVisible, setIsTabVisible] = useState(true);

    const navigation = useNavigation()
    useLayoutEffect(() => {

        navigation.setOptions({
            headerShown: false,

        })

    }, [])
    const { StatusBarManager } = NativeModules;

    const height = StatusBarManager.HEIGHT;

    console.log(height, 'hiere');

    const [popularData, setpopularData] = useState([])
    const [loading, setloading] = useState(true)

    const fetchData = async () => {
        await client.fetch(`
        *[_type== "popular"]{
          ...,
            restaurant[]->{
              ...,
              category[]->{
                ...,
              }
            }
          }
        `)
            .then((data) => {
                console.log(data);
                setpopularData(data[0]?.restaurant)
                // setloading(false)
            })
    }

    const [category, setcategory] = useState()

    const categoryData = async () => {
        await client.fetch(`
        *[_type== "category"]{
          ...,
            
          }
        `)
            .then((data) => {
                console.log(data, 'yyy');
                setcategory(data)
            })
            .catch(err => console.log(err))
            .finally(() => setloading(false))
    }



    useEffect(() => {
        fetchData()
        categoryData()
        // setloading(false)

    }, [])



    console.log(popularData, 'res');

    const address = useSelector(selectaddress)


    console.log(address);


    const auth = getAuth()
    const db = getDatabase()

    const dispach = useDispatch()



    const offset = useSharedValue(0)

    const anistyle = useAnimatedStyle(()=>{
        return {
            transform:[{translateX: withSpring(offset.value * 255)}]
        }
    })

    useEffect(() => {
        setloading(true)
        const cartRef = ref(db, 'users/' + auth.currentUser.uid + '/cart');
        onValue(cartRef, (snapshot) => {
            const data = snapshot.val();

            //  console.log(data,'yyyydata');
            if (data) {
                const array = Object.values(data)


                console.log(Object.assign({}, array), 'itemssarauy');
                dispach(getCart(array))
            }
        }, {
            onlyOnce: true
        });


        const func = async () => {


            const favRef = ref(db, 'users/' + auth.currentUser.uid + '/favorite');
            onValue(favRef, (snapshot) => {
                const data = snapshot.val();

                if (data) {
                    console.log(data, 'favvvvvvvvvvvv');
                    const array = Object.values(data)


                    console.log(Object.assign({}, array), 'itemssfav');
                    dispach(getFav(array))
                }


            }, {
                onlyOnce: true
            });
        }
        func()
        // setloading(false)

    }, [])


    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
     
    }, [])

    if (loading) {
        return <Loader />
    }






    return (

        <SafeAreaView className=' bg-white ' >
            <View style={{
                marginTop: height
            }}>

                <ScrollView contentContainerStyle={{ paddingBottom: 90 }}
                    stickyHeaderIndices={[1]}    >

                    <View className={`flex-row   px-6 pt-5`} >


                        <View className='flex-row  flex-1   space-x-3'>

                            <TouchableOpacity onPress={() => navigation.navigate('Location')}>

                                <HomeIcon size={22} color='#FB6E3B' />
                            </TouchableOpacity>
                            <View className=''>
                                <Text>Deliver Now!</Text>
                                <Text onPress={() => navigation.navigate('Location')} className='text-base font-bold'>
                                    {address == '' ? 'Select Location' : <>
                                        {address[0]?.district ? address[0].district : ''}, {address[0]?.city ? address[0]?.city : ''}
                                    </>}

                                    <ChevronDownIcon size={20} color='gray' />
                                </Text>



                            </View>


                        </View>
                        <View className=' rounded-2xl'>
                            <TouchableOpacity onPress={() => navigation.navigate('MY ACCOUNT')}>

                                <UserCircleIcon size={40} color='gray' />
                            </TouchableOpacity>

                        </View>
                    </View>





                    <View className='px-4 flex-row items-center space-x-2 py-4 bg-white  sticky top-0' >
                        <View className='flex-row flex-1 bg-gray-200/60 py-2.5 px-4 space-x-2 items-center rounded-xl'>
                            <MagnifyingGlassIcon size={20} color='gray' />

                            <TextInput className='   flex-1' placeholder='Search for restaurant, item or more' />

                        </View>

                        <AdjustmentsVerticalIcon size={30} color='gray' />
                    </View>

                    {/* <Animated.View style={[anistyle]} className='p-6 bg-blue-500 w-52 h-40 mx-8'>
                        <TouchableOpacity className='p-8 bg-red-500' onPress={() => (offset.value = Math.random())}></TouchableOpacity>
                    </Animated.View> */}

                    <View className='mt-6 px-4'>
                        <Text className=' mb-4' style={{ fontSize: 17, lineHeight: 20, fontWeight: '900' }}>Top rated near you</Text>
                        <FlatList
                            data={popularData}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => <FoodCardItem2 name={item.name}
                                image={item.image} rating={item.rating} id={item._id}
                                offer={item.offers?.offer} offername={item.offers?.offername}
                                offertype={item.offers?.offertype} time={item.time} lat={item.location?.lat}
                                lng={item.location?.lng} address={item.address} reviews={item.reviews} category={item.category} />}
                        />
                    </View>


                    <View className='mt-10 mb-4 '>
                        <Text className='mx-4 mb-8' style={{ fontSize: 17, lineHeight: 20, fontWeight: '900' }}>
                            What's on your mind?</Text>
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={category}
                            renderItem={({ item }) => <CategoryCard image={item.image?.asset?._ref} name={item.name} />}
                        />



                    </View>



                    <View className='my-6'>
                        <Text className='mx-4 mb-4' style={{ fontSize: 17, lineHeight: 20, fontWeight: '900' }}>
                            {popularData?.length} restaurants to explore</Text>

                        <FlatList
                            data={popularData}
                            renderItem={({ item }) => <FoodCard name={item.name}
                                image={item.image} rating={item.rating} id={item._id} offer={item.offers?.offer} offername={item.offers?.offername}
                                offertype={item.offers?.offertype} time={item.time} lat={item.location?.lat} lng={item.location?.lng} address={item.address} reviews={item.reviews} category={item.category}
                            />}
                        />

                    </View>




                    <View className='py-8 px-4 bg-[#032903]'>
                        <Text className=' mb-4 text-white' style={{ fontSize: 17, lineHeight: 20, fontWeight: '900' }}>Popular Items</Text>
                        <FlatList
                            data={popularData}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => <FoodCardItem2 name={item.name}
                                image={item.image} dark={true} rating={item.rating} id={item._id}
                                offer={item.offers?.offer} offername={item.offers?.offername}
                                offertype={item.offers?.offertype} time={item.time} lat={item.location?.lat} lng={item.location?.lng} address={item.address} reviews={item.reviews} category={item.category} />}
                        />
                    </View>



                    <View className='my-6'>
                        <Text className='mx-4 mb-4' style={{ fontSize: 17, lineHeight: 20, fontWeight: '900' }}>
                            {popularData?.length} restaurants to explore</Text>

                        <FlatList
                            data={popularData}

                            renderItem={({ item }) => <FoodCard name={item.name}
                                image={item.image} rating={item.rating} id={item._id} offer={item.offers?.offer} offername={item.offers?.offername}
                                offertype={item.offers?.offertype} time={item.time} lat={item.location?.lat} lng={item.location?.lng} address={item.address} reviews={item.reviews} category={item.category} />}
                        />

                    </View>



                    {/* {popularData?.map((item) => {
                        return  <FoodCardItem2 name={item.name}  
                        image={item?.restaurantImage?.asset?._ref}  rating={item.rating} /> 

                    })} */}









                </ScrollView>

            </View>



            {/* <StatusBar style="auto" /> */}

        </SafeAreaView>

    )
}

export default Home