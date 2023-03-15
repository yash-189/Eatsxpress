import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { getStorage } from '../features/authSlice';
import { Dimensions } from 'react-native';

import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import Page from '../components/Page';
import first from '../assets/chef.png'
import second from '../assets/cuate.png'
import third from '../assets/orderfood.png'
import { ScrollView } from 'react-native';







const IMAGE_WIDTH = 350;
const IMAGE_HEIGHT = 290;


const DATA = [
    {
        image: first,
        title: 'Search for your favorite',
        subTitle: 'food near you',
        description: 'Discover food from over 300+',
        desc2: 'restaurants'

    },
    {
        image: second,
        title: 'EatsXpress Food With Great',
        subTitle: 'Express Delivery',
        description: 'Fast and easy food delivery from',
        desc2: 'the best restaurants near you'

    },
    {
        image: third,
        title: 'Dine-in Experience,',
        subTitle: 'Delivered',
        description: 'Get restaurant-quality meals at home',
        desc2: 'order now and enjoy!'

    }

]








const OnboardingScreen = () => {
    const navigation = useNavigation()
    



    const onPressFinish = async () => {

        navigation.navigate('signup');
        await AsyncStorage.setItem('ONBOARDED', 'true');

    };

   



    const translateX = useSharedValue(0)

    const scrollHandler = useAnimatedScrollHandler((event) => {
        // 'worklet';
        // console.log(event.contentOffset.x);
        translateX.value = event.contentOffset.x
       


    })





  



    return (


        <View style={[styles.container]} className='  items-center bg-white'>

         

            <Animated.ScrollView 
            style={[styles.container]}
                onScroll={scrollHandler}
                
                horizontal pagingEnabled={true}  showsHorizontalScrollIndicator={false}
            >

                {DATA.map((item, index) => {
                    return <Page key={index.toString()} title={item.title} index={index} image={item.image}
                        translateX={translateX}
                        desc2={item.desc2} description={item.description}
                        subTitle={item.subTitle}
                    />
                })}
            </Animated.ScrollView>




          





            <View className=' absolute  bottom-6'>
                {/* <TouchableOpacity className='bg-[#FB6E3B] shadow-md shadow-black rounded-xl  w-[320]  py-3' onPress={() => changePageHandler()}>

                    <Text className='text-center text-white font-bold text-lg'>Next</Text>
                </TouchableOpacity> */}
                <TouchableOpacity className='' onPress={() => onPressFinish()}>
                    <Text className='text-center text-gray-400 mt-4 font-bold text-sm'>SKIP</Text>
                </TouchableOpacity>
            </View>

        </View>



    )
}

export default OnboardingScreen





const styles = StyleSheet.create({


    container: {
        // flex: 1,
        // height:900,
        backgroundColor: '#fff',
        paddingBottom:40
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        lineHeight: 30,
        textAlign: 'center'
    },
    image: {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT
    }

})




