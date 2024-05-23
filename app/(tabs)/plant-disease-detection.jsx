import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Button, TouchableOpacity, Image } from "react-native";
import { CameraView, Camera } from "expo-camera";
import CustomButton from "../../components/CustomButton";
import ModularButton from "../../components/ModularButton";
import { icons } from "../../constants";
import * as ImagePicker from 'expo-image-picker';
import { Provider, Dialog, Portal, RadioButton, Text } from 'react-native-paper';
import { images } from '../../constants';

import { Linking } from "react-native";

const PlantDiseaseDetection = () => {
  const [selectedValue, setSelectedValue] = useState('organic');
  const [base64, setBase64] = useState('organic');

  const [dieseaseName, setDiseaseName] = useState('');
  const [dieseaseSolution, setDieseaseSolution] = useState('');
  const [clearBtn, setClearBtn] = useState(false);

  const [hasPermission, setHasPermission] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzeFlag, setAnalyzeFlag] = useState(false);
  const [uploadFlag, setUploadFlag] = useState(false);

  const cameraRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState('organic');

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const enter = async (base64) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'base64': base64 })
      };
      const response = await fetch(
        'http://172.232.110.71:5000/api/growa/diseasedetector',
        requestOptions
      );
      const data = await response.json();
      console.log(data.body);
      const raw = data.body.split(',')
      setClearBtn(true);
      setDiseaseName(raw[0]);
      setDieseaseSolution(raw[1]);
    } catch (error) {
      console.error(error);
    }

  }

  const capture = async () => {
    showDialog();
    setAnalyzeFlag(true);


  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const selectImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });

    setBase64(result.assets[0].base64);
    setUploadFlag(true);
    showDialog();

  };


  return (

    <Provider>
      <View className="w-full flex justify-center items-center h-full px-20 my-0 text-white">
      <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[180px] h-[60px] bottom-4"
          />
        < CameraView
          ref={cameraRef}
          style={styles.cameraView}
        />

        <CustomButton
          title='Analyze Image'
          handlePress={capture}
          containerStyles={"w-5/6 mt-7 mb-1"}
        />

        <CustomButton
          title='Upload Image'
          handlePress={selectImage}
          containerStyles={"w-5/6 mt-7 mb-7"}
        />
        <Text className="text-secondary-200 text-3xl font-psemibold w-full text-center w-96">{dieseaseName}</Text>
        <Text className="text-secondary-200 text-1xl w-96 text-center">{dieseaseSolution}</Text>
        {clearBtn &&
          <CustomButton
            title='Clear'
            visible={false}
            handlePress={() => {
              setClearBtn(false);
              setDiseaseName('');
              setDieseaseSolution('');

            }}
            containerStyles={"w-1/2 mt-7 mb-7"}
          />
        }
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Select Type</Dialog.Title>
            <Dialog.Content>
              <RadioButton.Group onValueChange={newValue => setChecked(newValue)} value={checked}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton value="organic" />
                  <Text>Organic</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton value="synthetic" />
                  <Text>Synthetic</Text>
                </View>
              </RadioButton.Group>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={async () => {
                hideDialog();
                if (analyzeFlag) {
                  const { base641 } = await cameraRef.current.takePictureAsync(options = { base64: true, quality: 0 });
                  enter(base641);
                }
                if (uploadFlag) {
                  enter(base64);
                }
              }} title="Done" />
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>



    </Provider>


  );

}
const styles = StyleSheet.create({

  cameraView: {
    width: 275,
    height: 275,
  }, radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 6,
    fontSize: 16,
    color: '#333',
  },
});
export default PlantDiseaseDetection