import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StarIcon} from 'react-native-heroicons/solid'
import { LinearGradient } from 'expo-linear-gradient';
import { HeartIcon } from 'react-native-heroicons/outline';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { urlFor } from '../Sanity';
import { useDispatch, useSelector } from 'react-redux';
import { addToFav, removeFromFav, selectFavItems } from '../features/favSlice';

const FoodCard = ({id, name, rating, Rimage = 'image-f50a941355d269c41c7d444ce512065775b077f2-800x533-webp', lat,lng,offername, offertype, offer, time, reviews, address, category}) => {
    const navigation = useNavigation()

    const [scale, setscale] = useState(false)
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
    const [addedTofav, setaddedTofav] = useState(false)
    console.log(offertype,'tttt');



    return (
        <View>
            <TouchableOpacity   activeOpacity={1} onPressIn={()=>setscale(true)} onPressOut={()=>setscale(false)} 
            className={` flex-row py-3 px-4  items-center transition-transform ${scale && 'scale-95'}`}
            onPress={()=>navigation.navigate('RestaurantScreen',{id,name})} >
                <View className='relative shadow-black shadow-4xl  rounded-xl' style={{elevation:6}}>
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
                    <TouchableOpacity className='absolute right-1 top-1'onPress={() => onpress() + setaddedTofav(prev => !prev)}>
                        <HeartIcon width={29} height={26} fill={addedTofav == true ? '#FB6E3B' : 'transparent'} color='white' />
                    </TouchableOpacity>
                    {/* <View className='absolute bottom-1 left-2 flex-1 '>
                        <Text className='text-sm tracking-tighter text-white font-bold'>FLAT DEAL</Text>
                        <Text className='text-xl -my-1 text-white font-[900]'>₹125 OFF</Text>
                        <Text className='text-xs tracking-tighter text-white/80 font-semibold'>ABOVE ₹249</Text>
                    </View> */}
                     <View className='absolute bottom-1 left-2 flex-1 '>
                        <Text className='text-sm tracking-tighter text-white font-bold'>{offername}</Text>
                      {offer?  <Text className='text-xl uppercase -my-1 text-white font-[900]'>{offer}</Text>:''}
                      {offertype?  <Text className='text-xs tracking-tighter text-white/80 font-semibold'>{offertype}</Text>:''}
                    </View>

                </View>
                <View className='flex-1 pl-4  '>
                    <Text style={{fontSize:16, lineHeight:20, fontWeight:'900'}}  className='text-lg font-extrabold capitalize  text-black'>
                        {name}
                    </Text>
                    <View className='flex-row space-x-2 my-0.5 items-center '>
                        <View className='flex-row space-x-1 '>

                        <MaterialIcons name="stars" size={19} color="green" />

                            <Text style={{fontSize:14, lineHeight:20, fontWeight:'800'}}  className='text-black  font-bold text-sm uppercase'>
                                {rating} ({reviews}+)
                            </Text>
                        </View>

                        <Text className='bg-gray-700 h-1 w-1 rounded-full'> </Text>
                        <Text style={{fontSize:14, lineHeight:20, fontWeight:'800'}}  className='text-black text-sm font-bold'>
                            {time}
                        </Text>

                    </View>


                    <Text style={{fontSize:14, lineHeight:20, fontWeight:'100'}} className=' capitalize  font-thin   text-gray-700'>
                        {category?.map((item)=>{
                            return item.name + ', '})}
                       
                    </Text>
                    <View className='flex-row  items-center space-x-2'>
                        <Text style={{fontSize:14, lineHeight:20, fontWeight:'100'}} className='text-sm font-thin   text-gray-700'>
                            {address}
                        </Text>
                        <Text className='bg-gray-500 h-1 w-1 rounded-full'> </Text>
                        <Text style={{fontSize:14, lineHeight:20, fontWeight:'100'}} className='text-sm  font-thin text-gray-700'>
                            0.5 Km
                        </Text>
                    </View>


                </View>

            </TouchableOpacity>
        </View>
    )
}

export default FoodCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orang',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
    },
    button: {
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    text: {
        backgroundColor: 'transparent',
        fontSize: 15,
        color: '#fff',
    },
});