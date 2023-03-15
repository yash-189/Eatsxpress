import { View, Text, KeyboardAvoidingView, ScrollView, Modal, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native'
import { Button } from 'react-native'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebaseConfig';
import { useSelector } from 'react-redux';
import { selectEmail } from '../features/authSlice';
import { SafeAreaView } from 'react-native';
import { Image } from 'react-native';
import mobile from '../assets/mobile-login.png'
import { TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import Loader from '../components/Loader';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation()
    const auth = getAuth()
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setloading] = useState()
    const [isChecked, setChecked] = useState(false);
    const [value, setValue] = useState({
        email: '',
        password: '',
        error: ''
    })
    const t = useSelector(selectEmail)


    const LogIn = async () => {
        console.log('log');
        setloading(true)
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are mandatory.'
            })
            setModalVisible(true)
            setloading(false)
            return;
        }

        setValue({
            ...value,
            error: ''
        })



        await signInWithEmailAndPassword(auth, value.email, value.password)
            .then((userCredential) => {

                const user = userCredential.user;

                console.log(user, 'worked');
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


  
// useEffect(() => {
//     const starCountRef = ref(db, 'posts/')
//     onValue(starCountRef, (snapshot) => {
//         const data = snapshot.val();
//         console.log(data,'fata');
//         updateStarCount(postElement, data);
//     });
//     console.log(starCountRef);
// }, [])

  

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
                style={{ flex: 1 }}
                keyboardVerticalOffset={-100} >
                <View className='mt-[16%]'>
                    <Image source={mobile} className='h-80 w-96' />
                </View>

                <View className='w-[100%] px-8 mt-[5%] '>
                    <Text className='text-3xl text-center mb-[9%] font-bold'>Login</Text>
                    <View className=''>
                        <TextInput className='bg-gray-200/50 px-4 py-2 rounded-lg ' placeholder='Email' value={value.email}
                            onChangeText={(text) => setValue({ ...value, email: text })} />


                        <TextInput className='bg-gray-200/50 mt-[7%] px-4 py-2 rounded-lg ' placeholder='Password'
                            value={value.password}
                            onChangeText={(text) => setValue({ ...value, password: text })}
                        />

                        <View className='mt-[5%] flex-row  justify-between'>
                            <View className='flex-row space-x-1 items-center '>


                                <Checkbox value={isChecked} className='h-4 w-4 border-0 bg-gray-200 '
                                    onValueChange={setChecked}
                                    color={isChecked ? '#FB6E3B' : undefined} />
                                <Text className='text-xs text-gray-400'>Remember me</Text>
                            </View>
                            <Text className='text-xs font-semibold text-[#FB6E3B]'>Forgot password?</Text>
                        </View>


                    </View>


                    <TouchableOpacity className='bg-[#FB6E3B]  shadow-md shadow-[#FB6E3B]/80 items-center mt-[12%] py-3.5 rounded-xl px-4' onPress={() => LogIn()} disabled={loading} >
                        {loading ? <Progress.Circle size={28} color={'#fff'} indeterminate={true} borderWidth={2} /> :
                            <Text className='text-white text-center  text-lg font-semibold'>Log in</Text>
                        }
                    </TouchableOpacity>
                    <View className='mt-[10%] flex-row space-x-1 justify-center'>
                        <Text className='text-xs text-gray-400'>New to here?</Text>

                        <Text onPress={() => navigation.navigate('signup')} className='text-xs font-semibold text-[#FB6E3B]'>Sign up</Text>

                    </View>
                    <View className='mt-[2%] flex-row space-x-1 justify-center'>
                        <Text className='text-xs text-gray-400'>Login using</Text>

                        <Text onPress={() => navigation.navigate('phone')} className='text-xs font-semibold text-[#FB6E3B]'>Phone number</Text>

                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default Login