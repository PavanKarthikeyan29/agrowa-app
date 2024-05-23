import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";
import {onAuthStateChanged} from 'firebase/auth'
import { LogBox } from "react-native";
import { auth } from '../firebaseConfig';
const Welcome = () => {

  useEffect(() => {  
    try{
      const unsubscribe = onAuthStateChanged(auth, (user) => {

        if(user){
          router.push('/home')
        }

    })

    return () => {
      unsubscribe()
    }
    }catch(e){}
   },[])

  return (
    <SafeAreaView style={{backgroundColor:"#ffffff"}} className="h-full">
      
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center min-h-[92vh] px-4">
          <Image
            source={images.logo}
            className="w-[180px] h-[60px]"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-black font-bold text-center">
              Discover Endless{"\n"}
              Yeild with{" "}
              <Text style={{color: "#54b949"}}>Agrowa</Text>
            </Text>

          </View>

          <Text className="text-sm font-pregular text-black mt-7 text-center">
            Empowering innvoation by; Harvesting Success!
          </Text>

          <CustomButton
            title='Continue With Email'
            handlePress={()=> {router.push("/sign-in")}}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;