import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { selectEmail, selectIsLoggedIn } from '../features/authSlice';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const InitialScreen = () => {

    const auth = getAuth()

    const navigation = useNavigation()

    const [onboarded, setOnboarded] = useState(false)
    const [loading, setloading] = useState(true)

    const [isLogged, setisLogged] = useState()
    const [isFirstLaunch, setisFirstLaunch] = useState()

    const user = useSelector(selectIsLoggedIn)
    console.log(user, 'logged');

    const unsubscribeFromAuthStatuChanged = () => {
        onAuthStateChanged(auth, (user) => {
            console.log('user,effect', user);
            if (user) {
                console.log(user, 'ussrr');
                const us = {
                    email: user.email,
                    name: '',
                    isLoggedIn: true
                }
                dispatch(setSignIn(us))

                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setisLogged(true)
            } else {
                // User is signed out
                setisLogged(false)
            }
        })
    }


    const getStorage = async () => {
        const onboarded = await AsyncStorage.getItem('ONBOARDED')
        console.log(onboarded, 'async');
        console.log(typeof (onboarded), 'type async', onboarded)

        if (onboarded === 'true') {

            setisFirstLaunch(false)
            // user ? navigation.navigate('Home') : navigation.navigate('signup')

        } else {
            setisFirstLaunch(true)
            // navigation.navigate('onboarding')
        }
        setloading(false)
    }
    const clearAsyncStorage = async () => {
        AsyncStorage.clear();
    }

    useEffect(() => {
        unsubscribeFromAuthStatuChanged()
        getStorage()
        // clearAsyncStorage()
    }, [])

    if (isFirstLaunch) {
        navigation.navigate('onboarding')
    }
    else if (isLogged) {
        navigation.navigate('signup')
    }
    else {
        navigation.navigate('Home')
    }

    return (
        <View className='flex-1 justify-center items-center'>
            <Progress.Circle size={40} color={'#FB6E3B'} indeterminate={true} borderWidth={2} />
        </View>
    )
}

export default InitialScreen