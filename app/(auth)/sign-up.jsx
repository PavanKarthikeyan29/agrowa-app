import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants";
import { Image } from 'react-native';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link,router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
const SignUp = () => {

  const [form, setForm] = useState({
    email:'',
    password:'',
    first_name:''
  })

  const [isSubmitting, setSubmitting] = useState(false)

  const submit = async() => {
    
    const user = await createUserWithEmailAndPassword(auth, form.email, form.password)
    router.push('/sign-in')
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full flex justify-center items-center min-h-[92vh] px-4 my-0">
        <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[180px] h-[60px] "
          />
        <Text className="text-2xl font-semibold text-white mt-10 font-psemibold mb-10">
            Log in to 
            Agrowa
        </Text>
        <FormField
          title='Full Name'
          value={form.first_name}
          handleChangeText={(e) => setForm({...form, first_name: e})}
          otherStyles="mb-5 "
          KeyboardType="email-adress"
        />
        <FormField
          title='Email'
          value={form.email}
          handleChangeText={(e) => setForm({...form, email: e})}
          otherStyles="mb-5 "
          KeyboardType="email-adress"
        />
        <FormField
          title='Password'
          value={form.password}
          handleChangeText={(e) => setForm({...form, password: e})}
          otherStyles="mb-10"
          KeyboardType="password"
        />
        <FormField
          title='Confirm Password'
          otherStyles="mb-10"
          KeyboardType="password"
        />
        
        <CustomButton
          title = 'Sign Up'
          handlePress={submit}
          containerStyles={"w-full mt-7 mb-7"}
          isLoading={isSubmitting}
        />

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp