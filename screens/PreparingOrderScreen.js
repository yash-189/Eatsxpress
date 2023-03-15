import { View, Text, SafeAreaView, Image, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import im from '../assets/TakeAway.gif'
import * as Progress from 'react-native-progress';
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { resetStore, selectBasketItems } from '../features/basketSlice';
import { getAuth } from 'firebase/auth';
import { getDatabase, push, ref, set, update } from 'firebase/database';

const PreparingOrderScreen = ({ route }) => {
    const { name, lat, lng } = route.params
    console.log(route, 'kkkkkkkkkkkkkkkkkk');
    const auth = getAuth()
    const db = getDatabase();

    const items = useSelector(selectBasketItems)

    const navigation = useNavigation()
    useEffect(() => {



        const date = new Date().toLocaleString();

        const orderRef = ref(db, 'users/' + auth.currentUser.uid + '/orders');
        

 
        const dataMap = items.map((v, i) =>
            ({ "date": date, ...v })
        )

        console.log(dataMap, 'ooooooo');


        const order = push(orderRef)
        set(order, dataMap)
       
        


        setTimeout(() => {
            const cartRef = ref(db, 'users/' + auth.currentUser.uid );
            update(cartRef, { cart: null })
            navigation.navigate('Delivery', { name, lat, lng })



        }, 4000);
    }, [])



    return (
        <SafeAreaView className='bg-white flex-1 justify-center items-center'>
            <Image
                source={im}

                className='w-64 h-60'

            />
            <Text className='text-base font-semibold mb-6'> Waiting for Restaurant to accept your order!</Text>
            <Progress.CircleSnail size={50} spinDuration={2000} color={['#FB6E3B', '#3b2b5a', '#9e76dd']} />
        </SafeAreaView>
    )
}

export default PreparingOrderScreen