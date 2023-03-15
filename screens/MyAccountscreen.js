import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowLeftIcon, CheckCircleIcon, ChevronRightIcon, StarIcon } from 'react-native-heroicons/solid'
import { getAuth, signOut } from 'firebase/auth'
import { child, getDatabase, onValue, push, ref, set, update } from 'firebase/database'
import { useSelector } from 'react-redux'
import { selectBasketItems } from '../features/basketSlice'
import OrderCard from '../components/OrderCard'
import { useNavigation } from '@react-navigation/native'

const MyAccountscreen = () => {

    const navigation = useNavigation()
    const auth = getAuth()

    const db = getDatabase()
    const [user, setuser] = useState(auth?.currentUser)
    const items = useSelector(selectBasketItems)


    const signout = async () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('outt');
        }).catch((error) => {
            // An error happened.
        });
    }

    const [ordersData, setordersData] = useState()

    useEffect(() => {


        // const date = Date.now()

        // const orderRef = ref(db, 'users/' + auth.currentUser.uid + '/orders');



        // const dataMap = items.map((v, i) =>
        //     ({ "date": date, ...v })
        // )

        // console.log(dataMap, 'ooooooo');


        // const order = push(orderRef)
        // set(order, dataMap)




        const orderRef = ref(db, 'users/' + auth.currentUser.uid + '/orders');
        onValue(orderRef, (snapshot) => {
            const data = snapshot.val();

            //  console.log(data,'yyyydata');
            if (data) {
                const array = Object.values(data)
                console.log(array, 'kkkk');
                const letk = array.flat()
                let rr = []
                const uniqueValues = new Set(letk.map(v => { v.date, v.name }));
                const modifiedArray = letk.flatMap((val, idx) => {
                    // filter((item) => item.date === val.date)
                    return { h: val.name, k: idx }
                })




                console.log(array.flat(), modifiedArray, uniqueValues, 'oooooooooooooo');


                const duplicates = {};

                for (const current of letk) {
                    const key = `${current.restaurant}-${current.date}`;

                    const existing = duplicates[key] && duplicates[key].find(
                        item => item.name === current.name && item.description === current.description
                    );

                    if (existing) {
                        existing.quantity++;
                    } else {
                        duplicates[key] = duplicates[key] || [];
                        duplicates[key].push({ ...current, quantity: 1 });
                    }
                }

                const result = Object.entries(duplicates).map(([key, objects]) => {
                    const [restaurant, date] = key.split('-');

                    return { restaurant, date, objects };
                });

                console.log(result, 'ppp');

                setordersData(result)
            }

            console.log(ordersData, 'oooooo');



        }, {
            onlyOnce: true
        });
    }, [])


    // useEffect(() => {
    //     throw new Error('Error ! Please try again later')
    //   }, [])



    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 150 }} className='' stickyHeaderIndices={[0]} >
             <View style={{elevation:6}} className='pt-14 bg-white shadow-black shadow-2xl border-b border-gray-100 px-4 pb-4  flex-row  space-x-4 items-center'>
                    <ArrowLeftIcon onPress={() => navigation.goBack()} size={24} color={'gray'} />
                    <Text className='text-gray-800 font-bold '>My Account</Text>


                </View>
            <SafeAreaView className=' px-4 bg-white  mb-6'>
               
                <View className=' border-b-2 py-5'>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-lg font-extrabold text-gray-800 uppercase'>{user?.displayName}</Text>
                        <Text className='text-base font-bold text-orange-500 uppercase'>edit</Text>


                    </View>
                    <View className='flex-row space-x-2 mt-0.5'>
                        <Text className='text-xs  text-gray-500 '>+91 - {user?.phoneNumber}</Text>
                        <Text className='text-xs  text-gray-500 '>{user?.email}</Text>
                    </View>
                </View>


                <View className=' border-b border-gray-300 py-5 flex-row justify-between items-center'>
                    <View>
                        <View className='flex-row justify-between items-center'>
                            <Text className='text-base font-normal text-gray-800 capitalize'>Addressess</Text>


                        </View>

                        <View className='flex-row space-x-2 mt-0.5'>
                            <Text className='text-xs  text-gray-500 '>Edit & Add New Addressess</Text>
                        </View>
                    </View>
                    <ChevronRightIcon size={20} color='gray' />

                </View>


                <View className=' border-b border-gray-300 py-5 flex-row justify-between items-center'>
                    <View>
                        <View className='flex-row justify-between items-center'>
                            <Text className='text-base font-normal text-gray-800 capitalize'>Payments & Refunds</Text>


                        </View>

                        <View className='flex-row space-x-2 mt-0.5'>
                            <Text className='text-xs  text-gray-500 '>Refund Status & Payment Modes</Text>
                        </View>
                    </View>
                    <ChevronRightIcon size={20} color='gray' />

                </View>


                <View className='  py-5 flex-row justify-between items-center'>
                    <View>
                        <View className='flex-row justify-between items-center'>
                            <Text className='text-base font-normal text-gray-800 capitalize'>Help</Text>


                        </View>

                        <View className='flex-row space-x-2 mt-0.5'>
                            <Text className='text-xs  text-gray-500 '>FAQs & Links</Text>
                        </View>
                    </View>
                    <ChevronRightIcon size={20} color='gray' />

                </View>

            </SafeAreaView>







            <Text className=' px-4 text-xs text-gray-600 mb-3'>PAST ORDERS</Text>

            {!ordersData ? <View className=' px-4 bg-white  '>
                <View className=' py-3.5 '>
                    <Text className='text-sm text-gray-600'>No orders</Text>
                    </View>
                    </View>:
            <>
            {ordersData?.map((item) => {

                return <OrderCard restaurant={item?.restaurant} date={item.date} dish={item.objects?.map(n => `${n.name} (${n.quantity}) | `)} price={item.objects?.reduce((total, item) =>
                    total += item.price * item.quantity, 0)} />

            })}
            </>
}

            <View className=' py-6 px-4 bg-white'>
                <TouchableOpacity className='border border-[#FB6E3B] w-1/2' onPress={() => signout()}>
                    <Text className='uppercase text-center py-2 px-4 font-bold text-[#FB6E3B]'>Logout</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

export default MyAccountscreen