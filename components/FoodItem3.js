import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import * as Animatable from 'react-native-animatable'
// import { Animated } from 'react-native';
import { urlFor } from '../Sanity';
import { StarIcon, ViewfinderCircleIcon } from 'react-native-heroicons/solid';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, getCart, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice';
import { MaterialIcons } from '@expo/vector-icons';
import { child, getDatabase, onValue, push, ref, set, update } from 'firebase/database';
import { auth } from '../firebaseConfig';
import Animated, { Extrapolate, interpolate, interpolateColor, interpolateNode, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Button } from 'react-native';

const FoodItem3 = ({ name, description, rating, image, price, id, restaurant, lat, lng }) => {

    const items = useSelector((state) => selectBasketItemsWithId(state, id))
    const itemss = useSelector(selectBasketItems)
    const translation = useRef(new Animated.Value(0)).current;
    // const display = useRef(new Animated.Value('flex')).current;
    const [addState, setaddState] = useState(false)

    const animate = useSharedValue(0)

    const animation = useAnimatedStyle(() => {


        const opacity = interpolate(animate.value,
            [1, 2, 3],
            [-10, 0, -10],
            Extrapolate.CLAMP)




        // display: addState ? 'none' : 'flex',
        // transform: [{ translateY: translation }

        return {
            opacity: opacity
        }



    })

    // const animatedStyle = useAnimatedStyle(() => {
    //     return {
    //       backgroundColor: interpolateColor(
    //         progress.value,
    //         [0, 1],
    //         ['red', 'green']
    //       ),
    //     };
    //   });



    const animat = () => {
        // Animated.timing(translation, {
        //     toValue: -50,
        //     // delay: 2000,
        //     useNativeDriver: true,
        //   }).start();
        animate.value = withTiming(1 + animate.value)
        setTimeout(() => {
            setaddState(true)
        }, 10);

    }



    console.log(itemss, 'items');

    const dispach = useDispatch()
    const db = getDatabase()


    const addToBag = () => {


        dispach(addToBasket({ name, description, price, image, id, restaurant, lat, lng }))


        const cartRef = ref(db, 'users/' + auth.currentUser.uid + '/cart');
        onValue(cartRef, (snapshot) => {
            const data = snapshot.val();

            //  console.log(data,'yyyydata');
            const array = Object.values(data)


            console.log(Object.assign({}, array), 'itemssarauy');
            dispach(getCart(array))
        }, {
            onlyOnce: true
        });

    }
    const removeFromBag = () => {


        if (items.length <= 1) {
            animate.value = 0
            setaddState(false)
            console.log('false');
            

        }
        dispach(removeFromBasket({ id }))
    }

    useEffect(() => {
        if (items.length > 0) {
            setaddState(true)
        }
    }, [])





    const [more, setmore] = useState(false)

    const progress = useSharedValue(items.length > 0? 1:0);

    const animateStyle = useAnimatedStyle(() => {

        
        const translate = withSpring(interpolate(animate.value,
            [1,0],
            [-30, 12],
            Extrapolate.CLAMP),
        )
        const opacity = withSpring(interpolate(animate.value,
            [1,0],
            [ 0, 1],
            Extrapolate.CLAMP),
        )

        return {
            transform: [{ translateY: translate }],
            opacity: opacity
        }

       
    });

  

    const addStyle = useAnimatedStyle(() => {

        
        const translate = withSpring(interpolate(animate.value,
            [1,0],
            [-18, 30],
            Extrapolate.CLAMP),
        )

        const opacity = withSpring(interpolate(animate.value,
            [1,0],
            [1, 0],
            Extrapolate.CLAMP),
        )

        return {
            transform: [{ translateY:  translate }],
            opacity: opacity
        }

       
    });

    // useEffect(() => {
    //   animate.value =  items.length > 0 ? 1 :  0
    // }, [items.length])
    
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


                    <MaterialIcons name="star" size={18} color="#ffb300" />
                    <MaterialIcons name="star" size={18} color="#ffb300" />
                    <MaterialIcons name="star" size={18} color="#ffb300" />
                    <MaterialIcons name="star" size={18} color="#ffb300" />
                    <MaterialIcons name="star-half" size={18} color="#ffb300" />
                    <Text className='ml-1 font-medium text-[#ffb300]'>{rating}</Text>
                    <Text className='ml-1 font-medium text-gray-600'>(18)</Text>
                </View>

                <Text numberOfLines={more ? 3 : 2} onPress={() => setmore(prev => !prev)} className='text-sm w-56   mt-3 text-gray-600'>
                    {description} more
                </Text>

            </View>

            {/* <View>
                <Animated.View style={[{ width: 100, height: 100 }, animatedStyle]} />
                <Button
                    onPress={() => {
                        console.log(progress.value);
                        progress.value = withTiming(1 - progress.value, { duration: 1000 });
                    }}
                    title="run animation"
                />
            </View> */}

            <View className='relative items-center h-36'>

                <Image source={{ uri: urlFor(image.asset._ref).url() }}
                    resizeMode='contain' className='h-36 w-40 rounded-xl' />
                {/* <View className='bg-white h-10  justify-center  w-32 absolute -bottom-3 shadow-md border border-gray-100 rounded-lg shadow-black'  >
                    <TouchableOpacity onPress={() => animat() + addToBag()}>
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
                </View> */}




                <View className='bg-white h-10  justify-center  w-32 absolute -bottom-3 shadow-md border border-gray-100 rounded-lg shadow-black'  >
                {/* <Animated.Text className='bg-red-600   px-6 py-2' 
                style={[animateStyle]}>kk</Animated.Text>
                <Animated.Text style={[animateStyle]} className='bg-blue-600 absolute right-0  px-6 py-2'></Animated.Text> */}
     
                    
                        <Animated.Text  onPress={() => {
                        console.log(animate.value);
                        animate.value = withTiming(1 - animate.value)
                        addToBag()}} style={[ animateStyle]}  className='text-base text-center   font-extrabold py-2  w-full rounded-xl text-green-600' >ADD</Animated.Text>
                   

                    <Animated.View style={[addStyle]} className='flex-row relative  justify-around items-center '>
                        
                            <TouchableOpacity onPress={removeFromBag} className=' px-2 '>
                                <Text className='text-xl font-bold text-green-600'>-</Text>
                            </TouchableOpacity>

                            <Text className='text-xl font-bold text-green-600'>{items.length}</Text>
                            <TouchableOpacity onPress={addToBag} className='px-2 '>
                                <Text className='text-xl font-bold text-green-600'>+</Text>
                            </TouchableOpacity>
                        </Animated.View>


                    {addState &&
                        <View className='flex-row  justify-around items-center'>
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