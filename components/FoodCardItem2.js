import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { HeartIcon } from 'react-native-heroicons/outline';
import { StarIcon } from 'react-native-heroicons/solid';
import { MaterialIcons } from '@expo/vector-icons';
import { urlFor } from '../Sanity'
import { useNavigation } from '@react-navigation/native';
import loadingImage from '../assets/takeout-food.png'
import { useDispatch, useSelector } from 'react-redux';
import { addToFav, removeFromFav, selectFavItems } from '../features/favSlice';

const FoodCardItem2 = ({ dark, id, name, rating, Rimage = 'image-f50a941355d269c41c7d444ce512065775b077f2-800x533-webp', lat,lng,offername, offertype, offer, time, reviews, address, category }) => {
    console.log(dark, 'ffddd', dark ? 'white' : 'text-black', name, Rimage, id);

    const [first, setfirst] = useState(false)

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const favItems = useSelector(selectFavItems)
    const onpress = () => {
        if (addedTofav) {
            dispatch(removeFromFav({ id }))
        } else {
            dispatch(addToFav({ id, name, rating, Rimage }))
        }
        console.log('tttttttttttttttt', favItems, name);
    }
    console.log(favItems, 'wwwwwwwwwwwww');

    const [addedTofav, setaddedTofav] = useState(false)
    return (

        <View>
            <TouchableOpacity activeOpacity={1} onPressIn={() => setfirst(true)} onPressOut={() => setfirst(false)} className={`mr-4 mb-2 flex-row transition-transform ${first && 'scale-95'}`} onPress={() => navigation.navigate('RestaurantScreen', { id, name })}>
                <View className='relative  shadow-black shadow-4xl  rounded-xl'
                 style={{ elevation: 6 }}
                 >
                    <Image source={{
                        uri: urlFor(Rimage).url()
                    }}
                        resizeMode='center' className='h-44 w-36 rounded-xl ' />
                    <LinearGradient
                        // Background Linear Gradient
                        colors={['rgba(0,0,0,0.6)', 'transparent']}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: '100%',
                            transform: ([{ rotateZ: '180deg' }]),
                            borderRadius: 12
                        }}

                    />
                    <TouchableOpacity className='absolute right-1 top-1 ' onPress={() => onpress() + setaddedTofav(prev => !prev)}>
                        <HeartIcon width={29} height={26} fill={addedTofav == true ? '#FB6E3B' : 'transparent'} color='white' />
                    </TouchableOpacity>
                    <View className='absolute bottom-1 left-2 flex-1 '>
                    <Text className='text-sm tracking-tighter text-white font-bold'>{offername}</Text>
                      {offer?  <Text className='text-xl uppercase -my-1 text-white font-[900]'>{offer}</Text>:''}
                      {offertype?  <Text className='text-xs tracking-tighter text-white/80 font-semibold'>{offertype}</Text>:''}
                    </View>

                </View>
            </TouchableOpacity>
            <View className='items-start'>
                <Text style={{ fontSize: 15, lineHeight: 20, fontWeight: '900' }}
                    className={`text-lg font-extrabold capitalize  ${dark ? 'text-white' : 'text-black'}`}>
                    {name}
                </Text>
                <View className='flex-row space-x-2  items-center '>
                    <View className='flex-row space-x-1  '>

                        <MaterialIcons name="stars" size={19} color="green" />

                        <Text style={{ fontSize: 14, lineHeight: 20, fontWeight: '700' }} className={`${dark ? 'text-white' : 'text-gray-800/80'}  font-bold text-sm `}>
                            {rating}
                        </Text>
                    </View>

                    <Text className={`${dark ? 'bg-white' : 'bg-gray-700'} h-1 w-1 rounded-full`}> </Text>
                    <Text style={{ fontSize: 14, lineHeight: 20, fontWeight: '700' }} className={`${dark ? 'text-white' : 'text-gray-800/80'}  font-bold text-sm `}>
                       {time}
                    </Text>

                </View>
            </View>
        </View>
    )
}





export default FoodCardItem2