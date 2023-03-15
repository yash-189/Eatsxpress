import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
import Page from '../components/Page'
import { ScrollView } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'

const words = ['hey 1',' second here', 'me third']

const Test = () => {

    const translateX = useSharedValue(0)

const scrollHandler = useAnimatedScrollHandler((event)=>{
    console.log(event.contentOffset.x);
    translateX.value = event.contentOffset.x
})


  return (
    <Animated.ScrollView style={[styles.container]} onScroll={scrollHandler} horizontal pagingEnabled={true}  showsHorizontalScrollIndicator={false}>

     {words.map((title, index)=>{
        return <Page key={index.toString()} title={title} index={index} translateX={translateX} />
     })}
    </Animated.ScrollView>
  )
}


const styles = StyleSheet.create({
    container:{
       flex:1,
        backgroundColor:'#fff'
    }
})
export default Test


