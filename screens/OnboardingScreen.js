import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { getStorage } from '../features/authSlice';


const Page1 = () => (

    <>
        <Image className='h-80 w-96 ' resizeMode='cover' source={require('../assets/chef.png')} />

        <Text className='text-xl mt-2 font-bold text-gray-800'>Search for your favorite </Text>
        <Text className='text-xl font-bold text-gray-800'>food near you</Text>
        <Text className='text-gray-500 mt-2 text-sm font-semibold'>
            Discover food from over 300+
        </Text>
        <Text className='text-gray-500  text-sm font-semibold'>restaurants</Text>
    </>
);

const Page2 = () => (

    <>
        <Image className='h-80 w-96 ' resizeMode='cover' source={require('../assets/cuate.png')} />

        <Text className='text-xl font-bold text-gray-800'>EatsXpress Food With Great </Text>
        <Text className='text-xl font-bold text-gray-800'>Express Delivery</Text>
        <Text className='text-gray-500 mt-2 text-sm font-semibold'>
            Fast and easy food delivery from
        </Text>
        <Text className='text-gray-500  text-sm font-semibold'>the best restaurants near you</Text>
    </>
);

const Page3 = () => (

    <>
        <Image className='h-80 w-96 ' resizeMode='cover' source={require('../assets/orderfood.png')} />

        <Text className='text-xl mt-4 font-bold text-gray-800'>Dine-in Experience, </Text>
        <Text className='text-xl font-bold text-gray-800'>Delivered</Text>
        <Text className='text-gray-500 mt-2 text-sm font-semibold'>
            Get restaurant-quality meals at home
        </Text>
        <Text className='text-gray-500  text-sm font-semibold'>order now and enjoy!</Text>
    </>
);




const OnboardingScreen = () => {
    const navigation = useNavigation()
    const [number, setnumber] = useState(1)
 


    const onPressFinish = async () => {
       
        navigation.navigate('signup');
       
    };

    const changePageHandler = () => {

        if (number >= 3) return onPressFinish()
        setnumber(prev => prev + 1)
    }


  







    return (


        <View className='flex-1 justify-center items-center bg-white'>

            {number == 1 && <Page1 />}
            {number == 2 && <Page2 />}
            {number == 3 && <Page3 />}
            {number == 4 && <View className='flex-1 justify-center items-center'>
                <Progress.Circle size={40} color={'#FB6E3B'} indeterminate={true} borderWidth={2} />
            </View>
            }
            <View className='flex-row space-x-1 mt-6'>
                <Text className={` h-1 transition-all ${number == 1 ? 'w-8 bg-[#FB6E3B]' : 'w-2 bg-gray-400/60'} rounded-xl`}></Text>
                <Text className={` h-1 transition-all ${number == 2 ? 'w-8 bg-[#FB6E3B]' : 'w-2 bg-gray-400/60'} rounded-xl`}></Text>
                <Text className={` h-1 transition-all ${number == 3 ? 'w-8 bg-[#FB6E3B]' : 'w-2 bg-gray-400/60'} rounded-xl`}></Text>
            </View>
            <View className=' mx-4 mt-6'>
                <TouchableOpacity className='bg-[#FB6E3B] shadow-md shadow-black rounded-xl  w-[320]  py-3' onPress={() => changePageHandler()}>

                    <Text className='text-center text-white font-bold text-lg'>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity className='' onPress={()=>setnumber(3)}>
                    <Text className='text-center text-gray-400 mt-4 font-bold text-sm'>SKIP</Text>
                </TouchableOpacity>
            </View>

        </View>



    )
}

export default OnboardingScreen





const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: '800',
        lineHeight: 30,
        textAlign: 'center'
    },

})




{/* <Onboarding
DotComponent={Square}
NextButtonComponent={Next}
SkipButtonComponent={Skip}
DoneButtonComponent={Done}
titleStyles={{ color: 'blue' }} // set default color for the title
pages={[
  {
    backgroundColor: '#fff',
    image: <Image source={require('./images/circle.png')} />,
    title: 'Onboarding',
    subtitle: 'Done with React Native Onboarding Swiper',
    titleStyles: { color: 'red' }, // overwrite default color
  },
  {
    backgroundColor: '#FB6E3B',
    image: <Image source={require('./images/square.png')} />,
    title: 'The Title',
    subtitle: 'This is the subtitle that sumplements the title.',
  },
  {
    backgroundColor: '#999',
    image: <Image source={require('./images/triangle.png')} />,
    title: 'Triangle',
    subtitle: "Beautiful, isn't it?",
  },
]}
/>
); */}