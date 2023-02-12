import { View, Text } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';

const Loader = () => {
  return (
    <View className='flex-1 justify-center items-center'>
                <Progress.Circle size={40} color={'#FB6E3B'} indeterminate={true} borderWidth={2} />
            </View>
  )
}

export default Loader