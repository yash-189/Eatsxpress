import { View, Text, NativeModules, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { ArrowLeftIcon, XMarkIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { useDispatch } from 'react-redux';
import { saveLocation } from '../features/locationSlice';
import { MapPinIcon } from 'react-native-heroicons/outline';
import { getDatabase, push, ref, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';


const LocationScreen = () => {
    const { StatusBarManager } = NativeModules;

    const height = StatusBarManager.HEIGHT;

    const navigation = useNavigation()

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [region, setregion] = useState(null)
    const [loading, setloading] = useState(true)
    const [address, setaddress] = useState(null)

    const db = getDatabase();
    const auth = getAuth()

    const dispach = useDispatch()

    const userLocation = async () => {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        let address = await Location.reverseGeocodeAsync(location.coords);
        setaddress(address[0]);
        dispach(saveLocation(address[0]))
        setLocation(location);
        const coord = location.coords
        setregion({
            latitude: coord.latitude,
            longitude: coord.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
        })
        console.log(address, 'adress');
        update(ref(db, 'users/' + auth.currentUser.uid), {
            address: [address[0]]
        })
            .then((res) => {
                console.log('location saver');
            })
            .catch(err => console.log(err, 'location error'))

        setloading(false)

    }
  


    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
        Alert.alert(text = errorMsg)

    } else if (location) {
        text = JSON.stringify(location);
    }
    console.log(text, 'location');

    useEffect(() => {
        userLocation()


        setTimeout(() => {
            if (text=='waiting..') {
                // throw new Error('Error ! Please try again later')
                userLocation()
            }
        }, 20000);



    }, []);
    return (
        <>
            {loading ? <View className='flex-1 justify-center items-center'>
                <Progress.Circle size={40} color={'#FB6E3B'} indeterminate={true} borderWidth={2} />
            </View>
                :
                <SafeAreaView className='bg-white flex-1'>


                    <View className=' absolute bg-white/80 mx-4 mt-12 rounded-full py-2 px-2 z-10'>
                        <ArrowLeftIcon onPress={() => navigation.goBack()} size={25} color='gray' />
                    </View>
                    <MapView initialRegion={region} className='flex-1  ' style={{ marginTop: height }} mapType='standard' >
                        <Marker coordinate={region} title={'Restaurant name'}
                            pinColor={'#FB6E3B'} />

                    </MapView>
                    <View className='  bg-white/80 mx-4 py-4 rounded-full  px-2 z-10'>
                        <Text className='text-gray-500 text-xs font-bold tracking-wider'>SELECT DELIVERY LOCATION</Text>
                        <View className='flex-row   mt-4'>
                            <MapPinIcon size={26} color='#FB6E3B' />
                            <Text className='text-gray-800 ml-1 font-extrabold text-xl'>{address?.district}</Text>
                        </View>
                        <View>
                            <Text className='text-gray-700 capitalize  text-sm font-light'>
                                {/* {address?.street } */}
                                {address?.district}, {address?.city}, {address?.region}, {address?.postalCode}, {address?.country}</Text>
                        </View>
                        <Text onPress={() => navigation.navigate('Home')} className='uppercase py-3.5 mt-7 mb-4 bg-[#FB6E3B] text-white font-bold rounded-lg text-center'>Confirm location</Text>

                    </View>


                </SafeAreaView>
            }
        </>
    )
}

export default LocationScreen