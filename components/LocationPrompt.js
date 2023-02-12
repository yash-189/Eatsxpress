import { View, Text, NativeModules, Image, TouchableOpacity, Modal, Alert, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { ArrowLeftIcon, ArrowRightIcon, ArrowTrendingUpIcon, XMarkIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { useDispatch } from 'react-redux';
import { saveLocation } from '../features/locationSlice';
import { MapPinIcon } from 'react-native-heroicons/outline';
import image from '../assets/Address-cuate.png'

const LocationPrompt = () => {
    const { StatusBarManager } = NativeModules;
    const [modalVisible, setModalVisible] = useState(false);
    const [textInp, settextInp] = useState('')

    const height = StatusBarManager.HEIGHT;

    const navigation = useNavigation()

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [region, setregion] = useState(null)
    const [loading, setloading] = useState(false)
    const [address, setaddress] = useState(null)



    const dispach = useDispatch()

    const userLocation = async () => {
        setloading(true)
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {

            // setModalVisible(true)
            Alert.alert('Please Allow location access');
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
        navigation.navigate('Home')
    }
    // useEffect(() => {
    //     userLocation()



    // }, []);


    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    console.log(text, 'location');


    const onPress = () => {
        console.log(textInp);
        dispach(saveLocation({ district: textInp }))
        navigation.navigate('Home')
    }

    return (
        <>
            {loading ? <View className='flex-1 justify-center items-center'>
                <Progress.Circle size={40} color={'#9e76dd'} indeterminate={true} borderWidth={2} />
            </View>
                :
                <SafeAreaView className='bg-white flex-1'>




                    <View className='   mx-4 ' style={{ marginTop: height }}>


                        <Text className='text-gray-900 mb-1  mt-20 font-extrabold text-2xl'>What's your location</Text>


                        <Text className='text-gray-600 tracking-wider   text-base font-light'>

                            We need your location to show available restaurants.</Text>



                    </View>
                    <View className='  items-center mt-6'>
                        <Image source={image} className='h-[75%] w-[100%] ' />

                    </View>
                    <View>
                        <TouchableOpacity onPress={() => userLocation()} activeOpacity={0.8} className='mx-4 bottom-20 absolute  right-0 left-0'>


                            <Text className='uppercase py-4 mt-7 mb-4 bg-[#FB6E3B] text-white  font-bold rounded-xl text-center'>Allow location access</Text>
                        </TouchableOpacity>

                        <Pressable onPress={() => setModalVisible(true)}>
                            <Text className=' mx-4 bottom-14 absolute  right-0 left-0  text-[#FB6E3B] tracking-wider  font-bold rounded-xl text-center'>Enter Location Manually</Text>
                        </Pressable>
                    </View>





                </SafeAreaView>
            }

            <Modal
                animationType="fade"
                transparent={true}

                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View className='flex-1 bg-black/70  justify-center items-center'>
                    <View className='shadow-xl flex-row shadow-white w-[90%] py-16 px-4 justify-center bg-white rounded-xl items-center'>

                        <TextInput placeholder='Enter your location' onChangeText={(text => settextInp(text))} onSubmitEditing={() => console.log(textInp)} className='bg-gray-100 border border-gray-300 text-center px-2 py-4 rounded-xl w-[100%]' />
                        <TouchableOpacity className='bg-[#FB6E3B] p-2 rounded-full mt-4 absolute right-6' onPress={() => onPress()}>
                            <ArrowRightIcon size={20} color='white' />

                        </TouchableOpacity>

                    </View>

                </View>
            </Modal>

        </>
    )
}

export default LocationPrompt