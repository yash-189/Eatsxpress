import { View, Text, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { Animated } from 'react-native';
import { urlFor } from '../Sanity';
import { StarIcon, ViewfinderCircleIcon } from 'react-native-heroicons/solid';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from '../features/basketSlice';
import { MaterialIcons } from '@expo/vector-icons'; 

const FoodItem3 = ({name,description,rating,image,price,id,restaurant,lat,lng}) => {

    const items = useSelector((state) => selectBasketItemsWithId(state, id))
    const translation = useRef(new Animated.Value(0)).current;
    // const display = useRef(new Animated.Value('flex')).current;
    const [addState, setaddState] = useState(false)
    const animat = () => {
        // Animated.timing(translation, {
        //     toValue: -50,
        //     // delay: 2000,
        //     useNativeDriver: true,
        //   }).start();

        setTimeout(() => {
            setaddState(true)
        }, 10);

    }


   
    console.log(items, 'items');

    const dispach = useDispatch()

    const addToBag = () => {
        dispach(addToBasket({name,description,price,image, id,restaurant,lat,lng}))
    }
    const removeFromBag = ()=>{
        if(!items.length){
             setaddState(false)
             console.log('false');
             return
          
        }
        dispach(removeFromBasket({id}))
    }

    console.log(lat,lng,'jjj');

    const [more, setmore] = useState(false)
  return (
        <View className='border-t border-gray-200 mt-6 flex-row pt-6 pb-4'>
            <View className='flex-1 pr-2 '>
                <ViewfinderCircleIcon size={20} color='green' />
                <Text className='text-lg font-semibold mt-0.5 text-gray-700'>
                    {name}
                </Text>
                <Text className='text-base font-medium my-1.5 text-gray-600'>
                    ₹{price}
                </Text>
                <View className='flex-row'>

                    
                    <MaterialIcons name="star" size={18}  color="#ffb300" />
                    <MaterialIcons name="star" size={18}  color="#ffb300" />
                    <MaterialIcons name="star" size={18}  color="#ffb300" />
                    <MaterialIcons name="star" size={18}  color="#ffb300" />
                    <MaterialIcons name="star-half" size={18} color="#ffb300" />
                    <Text className='ml-1 font-medium text-[#ffb300]'>{rating}</Text>
                    <Text className='ml-1 font-medium text-gray-600'>(18)</Text>
                </View>
    
                <Text numberOfLines={more?3:2} onPress={()=>setmore(prev=>!prev)} className='text-sm w-56   mt-3 text-gray-600'>
                    {description} more
                </Text>
    
            </View>


            <View className='relative items-center h-36'>
                <Image source={{ uri: urlFor(image.asset._ref).url() }}
                    resizeMode='contain' className='h-36 w-40 rounded-xl' />
                <View className='bg-white h-10  justify-center  w-32 absolute -bottom-3 shadow-md border border-gray-100 rounded-lg shadow-black'  >
                    <TouchableOpacity onPress={() => animat()+ addToBag()}>
                        <Animated.Text className='text-base text-center  font-extrabold text-green-600' style={{
                            display: addState ? 'none' : 'flex',
                            transform: [{ translateY: translation }]
                        }}>ADD</Animated.Text>
                    </TouchableOpacity>
                    {addState &&
                        <View className='flex-row justify-around items-center'>
                            <TouchableOpacity onPress={removeFromBag} className=' px-2'>
                                <Text className='text-xl font-bold text-green-600'>-</Text>
                            </TouchableOpacity>
    
                            <Text className='text-xl font-bold text-green-600'>{items.length}</Text>
                            <TouchableOpacity onPress={addToBag} className='px-2'>
                                <Text className='text-xl font-bold text-green-600'>+</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
    
            </View>
        </View>
    
    
  )
}

export default FoodItem3