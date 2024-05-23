import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants";
import { Image } from 'react-native';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const SignIn = () => {


  const [form, setForm] = useState({
    email:'',
    password:''
  })

  const [isSubmitting, setSubmitting] = useState(false)

  const submit = async () => {
    signInWithEmailAndPassword(auth, form.email, form.password)
    .then((userCredential) => {
        const user = userCredential.user;
        router.push("/home")
    })
    .catch((error) => {
        Alert.alert('Error', "Incorrect email or password. Please try again")
    });
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
            Log in to Agrowa
        </Text>
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
        
        <CustomButton
          title = 'Sign In'
          handlePress={submit}
          containerStyles={"w-full mt-7 mb-7"}
          isLoading={isSubmitting}
        />
        <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-black-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold"
              style={{color: "#54b949"}}
            >
              Signup
            </Link>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn