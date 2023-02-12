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
import { useSelector } from 'react-redux';
import { selectaddress } from '../features/locationSlice';
import * as Progress from 'react-native-progress';
import CategoryCard from '../components/CategoryCard';
import Loader from '../components/Loader';

import { getDatabase, ref, onValue, set, push, child, update, remove } from "firebase/database";
import { getAuth } from 'firebase/auth';


const Home = () => {

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
            .catch(err=> console.log(err))
            .finally(()=>setloading(false))
    }



    useEffect(() => {
        fetchData()
        categoryData()
        // setloading(false)

    }, [])



    console.log(popularData, 'res');

    const address = useSelector(selectaddress)


    console.log(address);


    
    const db = getDatabase()
    console.log(db, 'hhhhhhhhhhhhhhhhhh');

    
const writeUserData = (userId, name, email, imageUrl)=> {
    // const db = getDatabase();
    set(ref(db, 'user/'+'QtBBzn5dRET9OmkzULUgHX9MY9V2'), {
      username: name,
      email: email,
      cart:[],
      orders:[]
    //   profile_picture : imageUrl
    });
  }


// const auth = getAuth()
//   useEffect(() => {
//     remove(ref(db, 'users/'+auth.currentUser.uid))
//       .then((res)=>{
//         console.log('updated');
//       })
//       .catch(err=>console.log(err,'updtaerror'))
//   }, [])


    // const handleScroll = (event) => {
    //   const offset = event.nativeEvent.contentOffset.y;
    //   if (offset > 0 && isTabVisible) {

    //     setIsTabVisible(false);
    //   } else if (offset <= 0 && !isTabVisible) {
    //     setIsTabVisible(true);
    //   }
    // };


    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    if (loading) {
        return <Loader/>
    }


    return (

        <SafeAreaView className=' bg-white ' >
            <View style={{
                marginTop: height
            }}>

                <ScrollView contentContainerStyle={{ paddingBottom: 90 }}
                    stickyHeaderIndices={[1]}    >

                    <View className='flex-row  px-6 pt-5' >


                        <View className='flex-row  flex-1   space-x-3'>

                            <TouchableOpacity onPress={() => navigation.navigate('MY ACCOUNT')}>

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


                    <View className='mt-6 px-4'>
                        <Text className=' mb-4' style={{ fontSize: 17, lineHeight: 20, fontWeight: '900' }}>Top rated near you</Text>
                        <FlatList
                            data={popularData}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => <FoodCardItem2 name={item.name}
                                Rimage={item.image} rating={item.rating} id={item._id}
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
                                Rimage={item.image} rating={item.rating} id={item._id} offer={item.offers?.offer} offername={item.offers?.offername}
                                offertype={item.offers?.offertype} time={item.time} lat={item.location?.lat} lng={item.location?.lng} address={item.address} reviews={item.reviews} category={item.category}
                            />}
                        />

                    </View>




                    <View className='py-8 px-4 bg-[#032903]'>
                        <Text className=' mb-4 text-white' style={{ fontSize: 17, lineHeight: 20, fontWeight: '900' }}>Popular Brands</Text>
                        <FlatList
                            data={popularData}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => <FoodCardItem2 name={item.name}
                                Rimage={item.image} dark={true} rating={item.rating} id={item._id}
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
                                Rimage={item.image} rating={item.rating} id={item._id} offer={item.offers?.offer} offername={item.offers?.offername}
                                offertype={item.offers?.offertype} time={item.time} lat={item.location?.lat} lng={item.location?.lng} address={item.address} reviews={item.reviews} category={item.category} />}
                        />

                    </View>



                    {/* {popularData?.map((item) => {
                        return  <FoodCardItem2 name={item.name}  
                        Rimage={item?.restaurantImage?.asset?._ref}  rating={item.rating} /> 

                    })} */}









                </ScrollView>

            </View>



            <StatusBar style="auto" />

        </SafeAreaView>

    )
}

export default Home