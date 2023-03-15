import { View, Text,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { urlFor } from '../../Sanity'
import { BookmarkIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { ShoppingBagIcon, HandThumbUpIcon, MinusCircleIcon } from 'react-native-heroicons/outline'
import { useDispatch, useSelector } from 'react-redux'
import { selectBasketItems, addToBasket, selectBasketItemsWithId, removeFromBasket } from '../../features/basketSlice'
import { getFav } from '../../features/favSlice'
import { getAuth } from 'firebase/auth'
import { onValue, ref } from 'firebase/database'

const RestaurantFoodCard = ({name,description,price,image, id}) => {
    // console.log(
    //     image,'mage'
    // );

    const items = useSelector((state) => selectBasketItemsWithId(state, id))
    console.log(items, 'items');

    const dispach = useDispatch()
    const auth = getAuth()
    const db = getDatabase()

    const addToBag = () => {
        dispach(addToBasket({name,description,price,image, id}))


        const favRef = ref(db, 'users/' + auth.currentUser.uid+'/favorite');
        onValue(favRef, (snapshot) => {
                const data = snapshot.val();
              
            //  console.log(data,'yyyydata');
             const array = Object.values(data)
         

             console.log( Object.assign({}, array),'itemssfav');
             dispach(getFav(array))
          }, {
            onlyOnce: true
          });
    }
    const removeFromBag = ()=>{
        if(!items.length) return
        dispach(removeFromBasket({id}))
    }
  return (
    <View className='mt-3 flex-row   '>
    <Image source={{
        uri: urlFor(image).url(),
    }} resizeMode={'contain'}
        className=' rounded-lg w-[30%] mr-3' />
    <View className='relative flex-row'>
        <View className='w-9/12 '>
            <Text className='font-bold  text-lg'>{name}</Text>
            <Text className='font-bold  text-xs text-gray-400'>{description}</Text>

            <View className='mt-1 justify-between   flex-row space-x-3 items-center'>
                <View className='flex-row space-x-3 items-center'>
                    <Text className='font-bold  text-base text-[#FB5F26]'>{price}
                    </Text>
                    <Text className='text-gray-400'> |

                    </Text>
                    <ShoppingBagIcon size={20} color='gray' />
                    <Text className='text-gray-400'> |
                    </Text>
                    <HandThumbUpIcon size={20} color='gray' />
                </View>
                <View className='flex-row items-center'>
                    <TouchableOpacity onPress={removeFromBag} disabled={!items.length} >
                        <MinusCircleIcon size={26} color='#FB5F26' />

                    </TouchableOpacity>
                    <Text className='mx-1 font-semibold  text-sm'>{items.length}</Text>
                </View>
            </View>

        </View>


        <View className=' justify-between '>
            <BookmarkIcon size={26} color='#FB5F26' />
            <TouchableOpacity onPress={() => addToBag()}>
                <PlusCircleIcon size={26} color='#FB5F26' />

            </TouchableOpacity>
        </View>
    </View>
</View>
  )
}

export default RestaurantFoodCard