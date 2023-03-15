import { View, Text } from 'react-native'
import React from 'react'
import { useWindowDimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';

const { height, width } = Dimensions.get('window')

const Size = width * 0.7
console.log(Size, 'lll');

const IMAGE_WIDTH = 350;
const IMAGE_HEIGHT = 290;




const Page = ({ image, title, subTitle, description, desc2, index, translateX }) => {
    console.log(index, width, [(index - 1) * width, index * width, (index + 1) * width]);
    const rStyle = useAnimatedStyle(() => {

        const scale = interpolate(translateX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0, 1, 0],
            Extrapolate.CLAMP)

        return {
            transform: [{ scale: scale }]
        }
    })


    const iStyle = useAnimatedStyle(() => {

        const scale = interpolate(translateX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0, 2, 1],
            Extrapolate.CLAMP)

        const opacity = interpolate(translateX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0, 1, 0],
            Extrapolate.CLAMP)

        const translate = withSpring(interpolate(translateX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [200, 0, -200],
            Extrapolate.CLAMP),
        )

        return {
            transform: [{ translateX: translate }],
            opacity: opacity
        }
    })

    const textStyle = useAnimatedStyle(() => {
        'worklet';

        const scale = interpolate(translateX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0, 2, 1],
            Extrapolate.CLAMP)

        const opacity = interpolate(translateX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0, 1, 0],
            Extrapolate.CLAMP)

        const translate = withSpring(interpolate(translateX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [100, 0, -100],
            Extrapolate.CLAMP),
        )

        return {
            transform: [{ translateX: translate }],
            opacity: opacity
        }
    })


    const sliderStyle = useAnimatedStyle(() => {
        const opacity = interpolate(translateX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-10, 1, -10],
            Extrapolate.CLAMP)

        return {
            opacity: opacity
        }
    })
    const changePageHandler = () => {
        index += 1
    }



    return (

        <View style={[styles.container,
            // { backgroundColor: `rgba(0,0,256,0.${index + 2})` }
        ]}
        >
            <View className='items-center'>
           

                <Animated.Image style={[styles.image, iStyle]} resizeMode='cover'
                    source={image} />
               
                <Animated.Text style={[textStyle]}
                    className='text-xl mt-6  font-bold text-gray-800'>{title}</Animated.Text>

                <Animated.Text style={[textStyle]}
                    className='text-xl font-bold text-gray-800'>{subTitle}</Animated.Text>
                <Animated.Text style={[textStyle]}
                    className='text-gray-500 mt-2 text-sm font-semibold'>{description}
                </Animated.Text>
                <Animated.Text style={[textStyle]}
                    className='text-gray-500  text-sm font-semibold'>{desc2}</Animated.Text>

            </View>

          

            <Animated.View className='flex-row space-x-1 mt-6' style={[sliderStyle]}>
                <Text className={` h-1 transition-all ${index == 0 ? 'w-8 bg-[#FB6E3B]' : 'w-2 bg-gray-400/60'} rounded-xl`}></Text>
                <Text className={` h-1 transition-all ${index == 1 ? 'w-8 bg-[#FB6E3B]' : 'w-2 bg-gray-400/60'} rounded-xl`}></Text>
                <Text className={` h-1 transition-all ${index == 2 ? 'w-8 bg-[#FB6E3B]' : 'w-2 bg-gray-400/60'} rounded-xl`}></Text>
            </Animated.View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: height,
        width,
        justifyContent: 'center',
        alignItems: 'center'

    },
    square: {
        height: Size,
        width: Size,
        backgroundColor: 'pink'
    },
    image: {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT
    }

})

export default Page


