import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '../../components/CustomButton'

const BirdDiterrence = () => {
  return (
    <View style={{backgroundColor:"#ffffff"}} className="w-full flex justify-center items-center h-full px-4">
        <CustomButton
          title='Turn On'
          containerStyles={"w-5/6 mt-7 mb-1"}
        />

        <CustomButton
          title='Turn Off'
          containerStyles={"w-5/6 mt-7 mb-1"}
        />
    </View>
  )
}

export default BirdDiterrence