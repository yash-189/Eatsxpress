import { View, Text, KeyboardAvoidingView, ScrollView, Modal, Pressable } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { Button } from 'react-native'
import { getAuth, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { selectEmail } from '../features/authSlice';
import { SafeAreaView } from 'react-native';
import { Image } from 'react-native';
import mobile from '../assets/Mobile.png'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from "@react-navigation/elements";
import Loader from '../components/Loader';
import * as Progress from 'react-native-progress';
import { getDatabase, ref, onValue, set } from "firebase/database";
import auth from '@react-native-firebase/auth';


const Signup = () => {


    const db = getDatabase()
    const auth = getAuth()
    const [value, setValue] = useState({
        email: '',
        password: '',
        name: '',
        mobile: '',
        error: ''
    })
    const [loading, setloading] = useState()
    const [modalVisible, setModalVisible] = useState(false);
    const t = useSelector(selectEmail)

    const navigation = useNavigation()

    const signUp = async () => {

        setloading(true)
        if (value.email === '' || value.password === '' || value.name === '' || value.mobile === '') {
            setValue({
                ...value,
                error: 'All fields are mandatory.'
            })
            setModalVisible(true)
            setloading(false)

            return;
        }

        setValue({
            ...value,
            error: ''
        })



        await createUserWithEmailAndPassword(auth, value.email, value.password)
            .then((userCredential) => {

                const user = userCredential.user;

                updateProfile(auth.currentUser, {
                    displayName: value.name,
                    phoneNumber: value.mobile
                }).then((res) => {
                    // Profile updated!
                    console.log(res, 'update');
                    // ...
                }).catch((error) => {
                    // An error occurred
                    console.log(error);
                    // ...
                })
                    .then(() => {
                        set(ref(db, 'users/' + auth.currentUser.uid), {
                            username: value.name,
                            email: value.email,
                            mobile: value.mobile,
                            cart: '',
                            orders: '',
                            address: ''
                        });

                    }).catch(error => console.log(error, 'firebsae error'))


                console.log(user, 'worked');
                // navigation.navigate('locationPromt')
                setloading(false)
            })
            .catch((error) => {
                const errorMessage = error.message.slice(10, 50);
                console.log(error, 'kkk');
                setValue({ ...value, error: errorMessage })
                setloading(false)
                setModalVisible(true)
            });
        console.log(t, 'email');

    }

    const signout = async () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('outt');
        }).catch((error) => {
            // An error happened.
        });
    }


    return (


        <ScrollView contentContainerStyle={{ backgroundColor: '#fff', flex: 1 }}
        // className='bg-white flex-1 items-center '
        >
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View className='justify-center items-center flex-1'>
                    <View className='bg-white h-[13%] w-[60%] rounded-lg ' >
                        <Text className='text-base text-gray-800  px-4 py-4 font-semibold' >{value?.error}</Text>
                        <Pressable
                            className='bg-[#FB6E3B] rounded-lg absolute bottom-2 right-2'
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text className='text-base px-4 py-1 text-white font-semibold' >Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <KeyboardAvoidingView
                behavior={"position"}
                // style={{ flex: 1 }}
                keyboardVerticalOffset={-20} >
                <View className='mt-[10%] self-center'>
                    <Image source={mobile} className='h-60 w-72 ' />
                </View>

                <View className='w-full px-8 mt-[2%]'>
                    <Text className='text-3xl text-center mb-8 font-bold'>Sign up</Text>

                    <View className=''>
                        <TextInput className='bg-gray-200/50 px-4 py-[2%] rounded-lg ' placeholder='Email' value={value.email}
                            onChangeText={(text) => setValue({ ...value, email: text })} />

                        <TextInput className='bg-gray-200/50 mt-[6%] px-4
                         py-2 rounded-lg ' placeholder='Full name'
                            value={value.name}
                            onChangeText={(text) => setValue({ ...value, name: text })}
                        />
                        <TextInput className='bg-gray-200/50 mt-[6%] px-4 py-2 rounded-lg ' placeholder='Mobile'
                            value={value.mobile}
                            onChangeText={(text) => setValue({ ...value, mobile: text })}
                        />
                        <TextInput className='bg-gray-200/50 mt-[6%] px-4 py-2 rounded-lg ' placeholder='Password'
                            value={value.password}
                            onChangeText={(text) => setValue({ ...value, password: text })}
                        />


                    </View>
                    <Text className='mt-[8%] text-xs text-gray-400 text-center'>By clicking "sign up" You certified that you agree with our Privacy Policy and Terms and Conditions</Text>

                    <TouchableOpacity className='bg-[#FB6E3B] shadow-md shadow-[#FB6E3B]/80 items-center mt-[6%] py-[4.5%] rounded-xl px-4' onPress={signUp} disabled={loading}  >
                        {loading ? <Progress.Circle size={28} color={'#fff'} indeterminate={true} borderWidth={2} />
                            :
                            <Text className='text-white text-center  text-lg font-semibold'>Sign up</Text>
                        }
                    </TouchableOpacity>

                    <View className='mt-[8%] flex-row space-x-1 justify-center'>
                        <Text className='text-xs text-gray-400'>Already have an account?</Text>
                        <Text onPress={() => navigation.navigate('login')} className='text-xs font-semibold text-[#FB6E3B]'>log in</Text>
                    </View>

                </View>
            </KeyboardAvoidingView>

        </ScrollView>
    )
}

export default Signup