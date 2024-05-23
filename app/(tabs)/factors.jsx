import { View, Text, ScrollView , Image} from 'react-native'
import React from 'react'
import RNSpeedometer from 'react-native-speedometer'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useContext } from 'react'
import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mqtt from 'mqtt-browser';
import { useEffect } from 'react';
import {images} from '../../constants';
const Factors = () => {

  const [nitrogenValue, setNitrogenValue] = useState(51);
  const [potassiumValue, setPotassiumValue] = useState(187);
  const [phosphorusValue, setPhosphorusValue] = useState(156);
  const [PhValue, setPhValue] = useState(7);

  
useEffect(() => {
  const client = mqtt.connect('wss://test.mosquitto.org:8081/');
  client.subscribe("agrowa/factors");
  client.on('connect', () => {
    console.log("connected");
  });

  client.on('message', (topic, message) => {
    var obj = JSON.parse(message.toString());
    setNitrogenValue(obj.nitrogen);
    setPhosphorusValue(obj.phosphorus);
    setPotassiumValue(obj.potassium);
    setPhValue(obj.soilPH);
  });

})


  return (
    <SafeAreaView className="w-full h-full">
      <ScrollView className="bg-white">
        
        <View className="w-full flex justify-center items-center h-full px-4 my-0 bg-white">
        <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[180px] h-[60px] "
          />
          <View className="w-full flex justify-center items-center mb-16">
            <Text style={{color: "#54b949"}} className="text-2xl font-pbold l-20 mr-1">Nitrogen (In mg/kg)</Text>
            <RNSpeedometer
              value={nitrogenValue}
              size={200}
              minValue={0}
              maxValue={300}
              allowedDecimals={1}
              labels={[
                { name: 'Low', labelColor: 'red', activeBarColor: 'red' },
                { name: 'Average', labelColor: 'yellow', activeBarColor: 'yellow' },
                { name: 'Normal', labelColor: 'green', activeBarColor: 'green' },
                { name: 'At the risk', labelColor: 'yellow', activeBarColor: 'yellow' },
                { name: 'High', labelColor: 'red', activeBarColor: 'red' }
              ]}
              labelStyle={{
                margin: -8,
                color: '#000'
              }}
            />
          </View>


          <View className="w-full flex justify-center items-center mb-16">
            <Text style={{color: "#54b949"}} className="text-2xl font-pbold l-20 mr-1">Phosphorus (In mg/kg)</Text>
            <RNSpeedometer
              value={phosphorusValue}
              size={200}
              minValue={0}
              maxValue={300}
              allowedDecimals={1}
              labels={[
                { name: 'Low', labelColor: 'red', activeBarColor: 'red' },
                { name: 'Average', labelColor: 'yellow', activeBarColor: 'yellow' },
                { name: 'Normal', labelColor: 'green', activeBarColor: 'green' },
                { name: 'At the risk', labelColor: 'yellow', activeBarColor: 'yellow' },
                { name: 'High', labelColor: 'red', activeBarColor: 'red' }
              ]}
              labelStyle={{
                margin: -8,
                color: '#000'
              }}
            />
          </View>
          <View className="w-full flex justify-center items-center mb-16">
            <Text style={{color: "#54b949"}} className="text-2xl font-pbold l-20 mr-1">Potassium (In mg/kg)</Text>
            <RNSpeedometer
              value={potassiumValue}
              size={200}
              minValue={0}
              maxValue={300}
              allowedDecimals={1}
              labels={[
                { name: 'Low', labelColor: 'red', activeBarColor: 'red' },
                { name: 'Average', labelColor: 'yellow', activeBarColor: 'yellow' },
                { name: 'Normal', labelColor: 'green', activeBarColor: 'green' },
                { name: 'At the risk', labelColor: 'yellow', activeBarColor: 'yellow' },
                { name: 'High', labelColor: 'red', activeBarColor: 'red' }
              ]}
              labelStyle={{
                margin: -8,
                color: '#000'
              }}
            />
          </View>
          < View className="w-full flex justify-center items-center mb-16">
            <Text style={{color: "#54b949"}} className="text-2xl font-pbold  l-20 mr-1">PH (Potential Hydrogen)</Text>
            <RNSpeedometer
              value={PhValue}
              size={200}
              minValue={0}
              maxValue={15}
              allowedDecimals={1}
              labels={[
                { name: 'Low', labelColor: 'red', activeBarColor: 'red' },
                { name: 'Normal', labelColor: 'green', activeBarColor: 'green' },
                { name: 'High', labelColor: 'red', activeBarColor: 'red' }
              ]}
              labelStyle={{
                margin: -8,
                color: '#000'
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Factors