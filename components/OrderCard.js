import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { CheckCircleIcon, ChevronRightIcon, StarIcon } from 'react-native-heroicons/solid'

const OrderCard = ({date, restaurant, location,dish,quantity, price}) => {

    console.log(price);
   
  return (
    <View className=' px-4 bg-white  '>
                <View className='border-b-2 border-gray-500 py-3.5'>
                    <View className='    '>
                        <View className=' border-b border-gray-300 py-3'>
                            <View className='flex-row  justify-between   items-center'>
                                <Text className='text-base font-normal   text-gray-800 capitalize'>{restaurant}</Text>
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
                                <Text className='text-sm  text-gray-500 '>₹{price}</Text>
                                <ChevronRightIcon size={18} color='gray' />

                            </View>

                        </View>


                    </View>


                    <View className='  '>
                        <View className='  pt-3'>
                            <View className='flex-row  justify-between   items-center'>
                                <Text className='text-sm  text-gray-500 capitalize'>{dish}</Text>




                            </View>

                            <View className='flex-row space-x-2 mt-0.5'>
                                <Text className='text-xs  text-gray-500/60 '>{date}</Text>
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
  )
}

export default OrderCard