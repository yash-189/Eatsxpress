import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { CheckCircleIcon, ChevronRightIcon, StarIcon } from 'react-native-heroicons/solid'
import { getAuth, signOut } from 'firebase/auth'

const MyAccountscreen = () => {

    const auth = getAuth()
    const [user, setuser] = useState(auth?.currentUser)

    const signout = async () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('outt');
        }).catch((error) => {
            // An error happened.
        });
    }


    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 150 }} className=''>
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
            <View className=' px-4 bg-white  '>
                <View className='border-b-2 border-gray-500 py-3.5'>
                    <View className='    '>
                        <View className=' border-b border-gray-300 py-3'>
                            <View className='flex-row  justify-between   items-center'>
                                <Text className='text-base font-normal   text-gray-800 capitalize'>Restaurant</Text>
                                <View className='flex-row items-center space-x-1'>
                                    <Text className='text-sm  text-gray-500'>Delivered</Text>
                                    <CheckCircleIcon size={20} color='#5cdc00'
                                    />
                                </View>



                            </View>

                            <View className='flex-row space-x-2 mt-0.5'>
                                <Text className='text-xs  text-gray-500/90 '>Location</Text>
                            </View>
                            <View className='flex-row mt-1.5 items-center '>
                                <Text className='text-sm  text-gray-500 '>₹96</Text>
                                <ChevronRightIcon size={18} color='gray' />

                            </View>

                        </View>


                    </View>


                    <View className='  '>
                        <View className='  pt-3'>
                            <View className='flex-row  justify-between   items-center'>
                                <Text className='text-sm  text-gray-500 capitalize'>Dish name (1)</Text>




                            </View>

                            <View className='flex-row space-x-2 mt-0.5'>
                                <Text className='text-xs  text-gray-500/60 '>Date, 9:12 PM</Text>
                            </View>
                            <View className='flex-row  items-center my-4 '>
                                <TouchableOpacity className='border border-gray-900'>
                                    <Text className='uppercase py-2 px-14 font-bold text-gray-800'>reorder</Text>
                                </TouchableOpacity>

                            </View>


                            <View className=' '>
                                <Text className='text-xs  text-gray-500/70 '>Your rating</Text>
                                <View className='flex-row items-center space-x-4 my-1 '>
                                    <View className='flex-row space-x-1'>
                                        <StarIcon size={16} color='orange' />
                                        <Text className='text- font-semibold  text-gray-700 '>5</Text>
                                    </View>

                                    <Text className='text-base font-semibold  text-gray-700 '>|</Text>
                                    <Text className='text- font-semibold  text-gray-700 '>Loved it</Text>

                                </View>

                            </View>

                        </View>


                    </View>
                </View>




            </View>


            <View className=' py-6 px-4 bg-white'>
            <TouchableOpacity className='border border-[#FB6E3B] w-1/2' onPress={()=>signout()}>
                                    <Text className='uppercase text-center py-2 px-4 font-bold text-[#FB6E3B]'>Logout</Text>
                                </TouchableOpacity>
               
            </View>
        </ScrollView>
    )
}

export default MyAccountscreen