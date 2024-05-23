import { View, Text,Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import {icons} from '../../constants';

const TabIcon = ({ icon, color, name, focused, size }) => {
  return (
    <View className="flex items-center justify-center mt-5">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className={size}
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
   <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#54b949",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 54,
          },
        }}
      >
        <Tabs.Screen
          name='home'
          options={{
            title: '',
            headerShown: false,
            tabBarIcon:({color,focused}) => (
              <TabIcon 
                icon={icons.home}
                color={color}
                name=""
                focused={focused}
                size={"w-6 h-6"}
              />
            )
          }}
        />

        <Tabs.Screen
          name='plant-disease-detection'
          options={{
            title: '',
            headerShown: false,
            tabBarIcon:({color,focused}) => (
              <TabIcon 
                icon={icons.plantdiseasedetection}
                color={color}
                name=""
                focused={focused}
                size={"w-8 h-8"}
              />
            )
          }}
        />
        <Tabs.Screen
          name='recommendation'
          options={{
            title: '',
            headerShown: false,
            tabBarIcon:({color,focused}) => (
              <TabIcon 
                icon={icons.fertilizer}
                color={color}
                name=""
                focused={focused}
                size={"w-8 h-8"}
              />
            )
          }}
        />
        <Tabs.Screen
          name='factors'
          options={{
            title: '',
            headerShown: false,
            tabBarIcon:({color,focused}) => (
              <TabIcon 
                icon={icons.factors}
                color={color}
                name=""
                focused={focused}
                size={"w-8 h-8"}
              />
            )
          }}
        />
        <Tabs.Screen
          name='bird-diterrence'
          options={{
            title: '',
            headerShown: false,
            tabBarIcon:({color,focused}) => (
              <TabIcon 
                icon={icons.bird}
                color={color}
                name=""
                focused={focused}
                size={"w-8 h-8"}
              />
            )
          }}
        />
                <Tabs.Screen
          name='chat-bot'
          options={{
            title: '',
            headerShown: false,
            tabBarIcon:({color,focused}) => (
              <TabIcon 
                icon={icons.chatbot}
                color={color}
                name=""
                focused={focused}
                size={"w-11 h-11"}
              />
            )
          }}
        />



      </Tabs>
   </>
  )
  
}

export default TabsLayout