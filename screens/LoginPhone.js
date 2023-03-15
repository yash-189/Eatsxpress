import { View, Text, ScrollView, Modal, KeyboardAvoidingView, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import otpimage from '../assets/otp.png'
import * as Progress from 'react-native-progress';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { getAuth, PhoneAuthProvider, RecaptchaVerifier, signInWithCredential, signInWithPhoneNumber } from 'firebase/auth';
import { getDatabase, ref, set, update } from 'firebase/database';
import Loader from '../components/Loader';
import { setSignIn } from '../features/authSlice';
import { useDispatch } from 'react-redux';
import { firebase } from '@react-native-firebase/auth';

const LoginPhone = () => {

    const auth = getAuth()
    const db = getDatabase()
    // firebase.auth().settings.appVerificationDisabledForTesting = true;

    auth.settings.appVerificationDisabledForTesting = true

    const navigation = useNavigation()
    const [loading, setloading] = useState()
    const [disabled, setdisabled] = useState(true)
    const [number, setnumber] = useState('')
    const [code, setcode] = useState('')
    const [enableCodefield, setenableCodefield] = useState(false)

    useEffect(() => {
        if (number.length == 10) {
            setdisabled(false)
        } else {
            setdisabled(true)
        }
    }, [number])




    auth.languageCode = 'es';
    const firebaseConfig = {
        apiKey: "AIzaSyBJRjhQ0o5N5K4iycVtzxrjRif1L91n_A4",
        authDomain: "eatxpress-93e52.firebaseapp.com",
        databaseURL: "https://eatxpress-93e52-default-rtdb.firebaseio.com",
        projectId: "eatxpress-93e52",
        storageBucket: "eatxpress-93e52.appspot.com",
        messagingSenderId: "735371731452",
        appId: "1:735371731452:web:59315a7efa66a2d6485279",
        measurementId: "G-Z6DRRH5P2K"
    };

    const recaptchaVerify = useRef(null)
    const dispatch = useDispatch()

    const [c, setc] = useState()

    const signin = () => {
        console.log('signin');
        const mNumber = '+91'+number

        signInWithPhoneNumber(auth, mNumber, recaptchaVerify.current)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                console.log(confirmationResult, 'signin');
                setc(confirmationResult?.verificationId)
                // ...
                setenableCodefield(true)

            }).catch((error) => {
               
                // Error; SMS not sent
                // ...
                Alert.alert('Try again')
                throw new Error('Error ! Please try again later')
            });
    }

    const confirmCode = async () => {
        
        console.log('confirm');
        if (code.length !== 6) {
           
           return Alert.alert('Please enter a 6 digits OTP sent to your mobile number')
            
        }
        setloading(true)
      
        const phoneCredential = PhoneAuthProvider.credential(c, code);

        await signInWithCredential(auth, phoneCredential)
        .then((user)=>{
            console.log(user,'ooooo');
            if (user) {
                update(ref(db, 'users/' + user.uid), {

                    mobile: number,
                });
                navigation.navigate('Home')
            }
        })
        .catch((err)=>{
            setloading(false)
            console.log(err,'oooooerr');
            Alert.alert('Invalid OTP')
            throw new Error('Error ! Please try again later')
        })

 



    }
    // 'recaptcha-container' is the ID of an element in the DOM.

    if (loading) return <Loader />

    return (
        <ScrollView contentContainerStyle={{ backgroundColor: '#fff', flex: 1 }}

        >
        
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerify}

                firebaseConfig={firebaseConfig} />
            <KeyboardAvoidingView
                behavior={"position"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={-100} >
                <View className='mt-[16%]  items-center'>
                    <Image source={otpimage} className='h-60 w-60' />
                </View>

                <View className='w-[100%] px-8 mt-[5%] '>
                    <Text className='text-3xl text-center mb-[9%] font-bold'>Login</Text>
                    <View className='bg-gray-200/50 flex-row px-4 py-4 rounded-lg items-center'>
                        {!enableCodefield ?
                        <>
                        <Text>+91 |</Text>
                            <TextInput className=' pl-2 w-full' placeholder='Enter your mobile number to get OTP' value={number}
                                onChangeText={(text) => setnumber(text)} />
                                </>
                            :

                            <TextInput className='  w-full' placeholder='Enter 6 digits OTP'
                                value={code}
                                onChangeText={(text) => setcode(text)}
                            />
                        }

                        {/* <View className='mt-[5%] flex-row  justify-between'>
                    <View className='flex-row space-x-1 items-center '>


                        <Checkbox value={isChecked} className='h-4 w-4 border-0 bg-gray-200 '
                            onValueChange={setChecked}
                            color={isChecked ? '#FB6E3B' : undefined} />
                        <Text className='text-xs text-gray-400'>Remember me</Text>
                    </View>
                    <Text className='text-xs font-semibold text-[#FB6E3B]'>Forgot password?</Text>
                </View> */}


                    </View>


                    {!enableCodefield ?
                        <TouchableOpacity className={`bg-[#FB6E3B]  shadow-md shadow-[#FB6E3B]/80 items-center mt-[12%] py-3.5 rounded-xl px-4  ${disabled ? 'opacity-70' : ''}`} onPress={() => signin()} disabled={loading || disabled} >
                            {loading ? <Progress.Circle size={28} color={'#fff'} indeterminate={true} borderWidth={2} /> :
                                <Text className={`text-white text-center  text-lg font-semibold}`}>Get OTP</Text>
                            }
                        </TouchableOpacity>
                        :
                        <TouchableOpacity className={`bg-[#FB6E3B]  shadow-md shadow-[#FB6E3B]/80 items-center mt-[12%] py-3.5 rounded-xl px-4  ${disabled ? 'opacity-70' : ''}`} onPress={() => confirmCode()} disabled={loading} >
                            {loading ? <Progress.Circle size={28} color={'#fff'} indeterminate={true} borderWidth={2} /> :
                                <Text className={`text-white text-center  text-lg font-semibold}`}>Verify OTP</Text>
                            }
                        </TouchableOpacity>
                    }
                    <View className='mt-[10%] flex-row space-x-1 justify-center'>
                        <Text className='text-xs text-gray-400'>Login using email & password?</Text>

                        <Text onPress={() => navigation.navigate('login')} className='text-xs font-semibold text-[#FB6E3B]'>Log in</Text>

                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default LoginPhone