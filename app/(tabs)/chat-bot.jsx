import { View, Text } from 'react-native'
import {GiftedChat} from 'react-native-gifted-chat'
import axios from 'axios'
import { useEffect , useState} from 'react'
import { Bubble,InputToolbar  } from 'react-native-gifted-chat'
import { Button, Icon } from 'react-native-elements'


const ChatBot = () => {

  const [messages, setMessages] = useState([])


  const handleSend = async (newMessages = []) =>{
    try{
      const userMessage = newMessages[0]

      setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages))
      const messageText = userMessage.text
      

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'message': `${messageText}`, 'lang':'en'})
      };
      const response = await fetch(
        'http://172.232.110.71:5000/api/chat',
        requestOptions
      );
      const data = await response.json();
      const botMessage = {
        _id: new Date().getTime()+1,
        text: data.body,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Growa Ai'
        },
      }
      setMessages((previousMessages) => GiftedChat.append(previousMessages, botMessage))
      console.log(data);


    }catch(err){
      console.log(err)
    } 


    
  }

  const handleMicrophonePress = async() => {

  };
  const renderInputToolbar = (props) => {
    return (
      <View>
        <InputToolbar {...props} />
        <Icon
          name="microphone"
          type="font-awesome"
          color="#54b949"
          onPress={handleMicrophonePress}
          containerStyle={{ alignSelf: 'center', margin: 10, left: 100 }}
        />
      </View>
    );
  };


  return (
    <View style={{flex:1}} className="bg-white">

        <GiftedChat
          messages={messages}
          onSend={newMessages => handleSend(newMessages)}
          user={{ _id: 1}}
          renderBubble={props => {
            return (
              <Bubble
                {...props}
      
                textStyle={{
                  right: {
                    color: 'white',
                  },
                  left: {
                    color: 'white',
                  },
                }}
                wrapperStyle={{
                  left: {
                    backgroundColor: '#54b949',
                    textColor: '#fff',
                  },
                  right: {
                    backgroundColor: "#54b949",
                  },
                }}
              />
            );
          }}                
          renderInputToolbar={renderInputToolbar}
        />
    </View>
  )
}

export default ChatBot