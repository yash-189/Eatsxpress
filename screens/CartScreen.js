import { View, Text, SafeAreaView, Button, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { ArrowLeftIcon, StopCircleIcon, PlusIcon, MinusIcon, ArrowRightIcon, ChevronRightIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import { ViewfinderCircleIcon } from 'react-native-heroicons/solid'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import EmptyCart from '../components/EmptyCart'

const CartScreen = ({ route }) => {
    // const {lat,lng} = route.params

    console.log(route,'carscren');
    const navigation = useNavigation()
    useLayoutEffect(() => {

        navigation.setOptions({
            headerShown: false
        })
       
    }, [])


    const items = useSelector(selectBasketItems)
    const totalPrice = useSelector(selectBasketTotal)
    console.log(items, 'caritems');

    const dispach = useDispatch()

    const addToBag = (name, description, price, image, id, restaurant) => {
        dispach(addToBasket({ name, description, price, image, id, restaurant }))
    }
    const removeFromBag = (id) => {
        if (!items.length) {
            setaddState(false)
            console.log('false');
            return

        }
        dispach(removeFromBasket({ id }))
    }



    const result = Object.values(items.reduce((acc, cv) => {
        let i = `${cv.id}`;
        if (!acc[i]) acc[i] = { ...cv, quantity: 1 }
        else acc[i].quantity += 1;
        return acc;
    }, {}))

    console.log(result,'result')

    if (!items.length) {
        return <EmptyCart />
    }
    return (
        <SafeAreaView className='bg-slate-200/50 flex-1' >
            <View className='pt-14 bg-white pb-5 flex-row px-4 space-x-4 items-center'>
                <ArrowLeftIcon onPress={() => navigation.goBack()} size={24} color={'gray'} />
                <Text className='text-gray-800 font-bold '>{items[0]?.restaurant}</Text>
                

            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 130 }}>

                <View className='bg-white  shadow-md shadow-black/50   mt-8 mx-4 rounded-xl '>
                    {result?.map((item) =>

                        <View className='flex-row justify-between px-3.5  py-5 space-x-3 items-center'>
                            <View className='flex-row w-[170] '>
                                <ViewfinderCircleIcon size={18} color='green' />
                                <Text className='text-gray-500/90 ml-1.5 ' style={{ fontSize: 13, lineHeight: 18, fontWeight: "600" }}>
                                    {item.name}
                                </Text>

                            </View>
                            <View className='border border-gray-300 px-2 py-2 rounded-lg flex-row items-center space-x-2'>
                                <TouchableOpacity onPress={() => removeFromBag(item.id)}>
                                    <MinusIcon size={18} color='green' />
                                </TouchableOpacity>
                                <Text className='text-green-700 text-xs font-bold'>{item.quantity}</Text>
                                <TouchableOpacity onPress={() => addToBag(item.name, item.description, item.price, item.image, item.id)}>
                                    <PlusIcon size={18} color='green' />

                                </TouchableOpacity>


                            </View>
                            <Text className='text-gray-600 text-sm font-semibold'>
                                ₹{item.price}
                            </Text>
                        </View>
                    )

                    }

                </View>




                {/* <View className='bg-white flex-row shadow-md shadow-black/50 items-center justify-between space-x-3 py-5 mt-8 mx-4 rounded-xl px-3.5'>
                    <View className='flex-row w-[170] '>
                        <ViewfinderCircleIcon size={18} color='green' />
                        <Text className='text-gray-500/90 ml-1.5 
                    ' style={{ fontSize: 13, lineHeight: 18, fontWeight: "600" }}>
                            2 Whopper Jr Veg + 1 King Fries + 1 Veggie strips
                        </Text>

                    </View>
                    <View className='border border-gray-300 px-2 py-2 rounded-lg flex-row items-center space-x-2'>
                        <MinusIcon size={18} color='green' />
                        <Text className='text-green-700 text-xs font-bold'>1</Text>
                        <PlusIcon size={18} color='green' />


                    </View>
                    <Text className='text-gray-600 text-sm font-semibold'>
                        ₹466
                    </Text>
                </View> */}

                <Text className='text-gray-600 text-base font-bold my-5 px-4'>Offers & Benifits</Text>
                <View className='bg-white  shadow-md shadow-black/50  mx-4 rounded-xl  '
                //  style={{ borderStyle: 'dashed', borderWidth: 1, borderColor: '#000', margin: -2, marginBottom: 0}}
                >
                    <View className='flex-row  justify-between space-x-3  border-b border-gray-300 px-3.5 py-5'>
                        <ViewfinderCircleIcon size={18} color='green' />
                        <View className=' flex-1'>

                            <Text className='text-gray-800/90 ml-1.5 
                    ' style={{ fontSize: 15, lineHeight: 18, fontWeight: "bold" }}>
                                STEALDEAL
                            </Text>
                            <Text className='text-gray-500/90 ml-1.5 
                    ' style={{ fontSize: 13, lineHeight: 18, fontWeight: "600" }}>
                                Save another ₹120 on this order
                            </Text>

                        </View>


                        <Text className='text-[orange] text-sm font-semibold'>
                            Apply
                        </Text>
                    </View>
                    <View className=' flex-row justify-center  items-center  py-4 '>
                        <Text className='text-gray-500  
                    ' style={{ fontSize: 13, lineHeight: 18, fontWeight: "600" }}>
                            View more coupons
                        </Text>
                        <ChevronRightIcon size={14} color={'black'} />
                    </View>
                </View>



                <View>
                    <Text className='text-gray-600 text-base font-bold my-5 px-4'>Bill Details</Text>
                    <View className='bg-white  shadow-md shadow-black/50  mx-4 rounded-xl  '
                    //  style={{ borderStyle: 'dashed', borderWidth: 1, borderColor: '#000', margin: -2, marginBottom: 0}}
                    >
                        <View className='  border-b border-gray-300 px-3.5 py-5'>

                            <View className=' flex-row justify-between'>

                                <Text className='text-gray-500/90 ' style={{ fontSize: 13, lineHeight: 18, fontWeight: "600" }}>
                                    Item Total
                                </Text>
                                <Text className='text-gray-600 text-sm font-semibold'>
                                    ₹{totalPrice}
                                </Text>


                            </View>
                            <View className=' flex-row justify-between mt-1 pb-3 border-b border-gray-300'>

                                <Text className='text-gray-500/90  ' style={{ fontSize: 13, lineHeight: 18, fontWeight: "600" }}>
                                    Delivery Fee | 5.7 kms
                                </Text>

                                <Text className='text-gray-600 text-sm font-semibold'>
                                    ₹19
                                </Text>
                            </View>
                            <View className=' flex-row justify-between mt-3 pb-3 border-b border-gray-300'>

                                <Text className='text-gray-500/90 ' style={{ fontSize: 13, lineHeight: 18, fontWeight: "600" }}>
                                    Govt Taxes & Other Charges
                                </Text>

                                <Text className='text-gray-600 text-sm font-semibold'>
                                    ₹46.6
                                </Text>
                            </View>

                            <View className=' flex-row justify-between mt-3 '>

                                <Text className='text-gray-800 text-sm font-semibold'>
                                    To Pay
                                </Text>

                                <Text className='text-gray-800  text-sm font-semibold'>
                                    ₹{Math.floor(totalPrice + 46.6 + 19)}
                                </Text>
                            </View>
                        </View>

                    </View>
                </View>
            </ScrollView>


            <View className='bg-white flex-row justify-between items-center  shadow-md shadow-black/50   px-4 pt-5 pb-7 absolute bottom-0 right-0 left-0 rounded-xl z-50' style={{ elevation: 5 }}>
                <View>
                    <Text className='text-gray-800 -mb-1  text-base font-semibold'>
                        ₹{Math.floor(totalPrice + 46.6 + 19)}
                    </Text>
                    <Text className='text-green-600  text-sm font-semibold'>
                        View Detailed Bill
                    </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('PreparingOrder',{lat:route?.params?.lat,lng:route?.params?.lng,name: route?.params?.name})} className=' rounded-xl bg-green-600/90'>
                    <Text className='text-white text-lg font-semibold px-12 py-2.5'>Proceed to Pay</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default CartScreen


