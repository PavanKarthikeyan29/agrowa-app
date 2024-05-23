import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from '../../components/Card';
import mqtt from 'mqtt-browser';
import { images } from '../../constants';
import CustomButton from '../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
const Recommendation = () => {

  const [isFertilizer, setIsFertilizer] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [nitrogen, setNitrogen] = useState('0');
  const [phosphorus, setPhosphorus] = useState('0');
  const [potassium, setPotassium] = useState('0');
  const [ph, setPH] = useState('0');
  const [cropName, setCropName] = useState('');
  const [wateringLevel, setWateringLevel] = useState('No Water');

  const [fertilizerName, setFertilizerName] = useState('');
  const [fertilizerDescription, setFertilizerDescription] = useState('');

  const [clearBtn, setClearBtn] = useState(false);

  const [cropName1, setCropName1] = useState('');
  const [cropName2, setCropName2] = useState('');
  const [cropName3, setCropName3] = useState('');
  const [cropName4, setCropName4] = useState('');
  const [cropName5, setCropName5] = useState('');

  const [viewCrops, setViewCrops] = useState(false);

  const client = mqtt.connect('wss://test.mosquitto.org:8081/');
  client.subscribe("agrowa/factors");
  client.on('connect', () => {
    console.log("connected");
  });

  client.on('message', (topic, message) => {
    var obj = JSON.parse(message.toString());

    setNitrogen(obj.nitrogen);
    setPhosphorus(obj.phosphorus);
    setPotassium(obj.potassium);
    setPH(obj.soilPH);
  });

  const handlePress = () => {
    setModalVisible(true);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectFertilizer = () => {
    setIsFertilizer(true);
    setDropdownVisible(false);
  };

  const selectCrop = () => {
    setIsFertilizer(false);
    setDropdownVisible(false);
  };

  const handleSubmitFertilizer = async () => {
    console.log('Crop Name:', cropName);
    setModalVisible(false);
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'nitrogen': nitrogen, 'phosphorus': phosphorus, 'potassium': potassium, 'ph': ph, 'type': 'dont know', "crop": cropName, "base64": "", lang: "english", place: "tamilnadu" })
      };
      const response = await fetch(
        'http://172.232.110.71:5000/api/fertilizer/suggester',
        requestOptions
      );
      const data = await response.json();
      let raw = data.body.split(/,(.+)/);
      setFertilizerName(raw[0]);
      setFertilizerDescription(raw[1].trim());
      setClearBtn(true)
      console.log(data.body);
    } catch (error) {
      console.error(error);
    }

  };

  const handleSubmitCrop = async () => {
    console.log('Watering Level:', wateringLevel);
    setModalVisible(false);
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'nitrogen': nitrogen, 'phosphorus': phosphorus, 'potassium': potassium, 'ph': ph, 'type': 'dont know', "water_availability": wateringLevel, "crop_numbers": "5", lang: "english", place: "tamilnadu", "temperature": "30", "light_intensity": "N/A" })
      };
      const response = await fetch(
        'http://172.232.110.71:5000/api/crop/suggester',
        requestOptions
      );
      const data = await response.json();
      let raw = data.body.split(',');
      setViewCrops(true);
      setClearBtn(true);
      setCropName1(raw[0]);
      setCropName2(raw[1]);
      setCropName3(raw[2]);
      setCropName4(raw[3]);
      setCropName5(raw[4]);

    } catch (error) {
      console.error(error);
    }

  };

  return (
    <SafeAreaView className="bg-white h-full">
        <View style={styles.container} className="bg-white flex justify-center items-center h-full">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[180px] h-[60px] bottom-36"
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: isFertilizer ? '#54b949' : '#54b949' }]}
            onPress={handlePress}
          >
            <Text style={styles.buttonText}>
              {isFertilizer ? 'Fertilizer Recommendation' : 'Crop Recommendation'}
            </Text>
            <TouchableOpacity onPress={toggleDropdown} style={styles.iconContainer}>
              <Icon name="arrow-drop-down" size={24} color="white" />
            </TouchableOpacity>
          </TouchableOpacity>

          {dropdownVisible && (
            <View style={styles.dropdown}>
              <TouchableOpacity style={styles.dropdownItem} onPress={selectFertilizer}>
                <Text style={styles.dropdownText}>Fertilizer Recommendation</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={selectCrop}>
                <Text style={styles.dropdownText}>Crop Recommendation</Text>
              </TouchableOpacity>
            </View>
          )}

          {
            viewCrops && (
              <View className="mt-5 top-10">
                <Card title={cropName1} />
                <Card title={cropName2} />
                <Card title={cropName3} />
                <Card title={cropName4} />
                <Card title={cropName5} />
              </View>
            )
          }
          <Text  style={{color: "#54b949"}} className="text-3xl font-psemibold w-full text-center w-96 mt-10">{fertilizerName}</Text>
          <Text style={{color: "#54b949"}} className="text-secondary-200 text-1xl w-80 text-center">{fertilizerDescription}</Text>
          {clearBtn &&
            <CustomButton
              title='Clear'
              visible={false}
              handlePress={() => {
                setCropName1('');
                setCropName2('');
                setCropName3('');
                setCropName4('');
                setCropName5('');
                setFertilizerName('');
                setFertilizerDescription('');
                setViewCrops(false);
                setClearBtn(false);

              }}
              containerStyles={"w-36 top-5"}
            />
          }

          <Modal visible={modalVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {isFertilizer ? (
                  <View>
                    <Text style={styles.modalTitle}>Enter Crop Name</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Crop Name"
                      value={cropName}
                      onChangeText={setCropName}
                    />
                    <TouchableOpacity style={styles.modalButton} onPress={handleSubmitFertilizer}>
                      <Text style={styles.modalButtonText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.modalTitle}>Select Watering Level</Text>
                    <Picker
                      selectedValue={wateringLevel}
                      style={styles.picker}
                      onValueChange={(itemValue) => setWateringLevel(itemValue)}
                    >
                      <Picker.Item label="No Water" value="No Water" />
                      <Picker.Item label="Low Water" value="Low Water" />
                      <Picker.Item label="Normal Water" value="Normal Water" />
                      <Picker.Item label="High Water" value="High Water" />
                    </Picker>
                    <TouchableOpacity style={styles.modalButton} onPress={handleSubmitCrop}>
                      <Text style={styles.modalButtonText}>Submit</Text>

                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </Modal>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
  },
  iconContainer: {
    padding: 5,
  },
  dropdown: {
    marginTop: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Recommendation;
