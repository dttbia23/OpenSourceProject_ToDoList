import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, Modal, Pressable} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function DateHead({date, completion}) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const {top} = useSafeAreaInsets();

  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  const onFilter = () => {
    setModalVisible(!modalVisible);
    navigation.navigate('Filter');
  }

  const onDelete = () => {
    setModalVisible(!modalVisible);
    navigation.navigate('Delete');
  }

  const onCategory = () => {
    setModalVisible(!modalVisible);
    navigation.navigate('Category');
  }


  return (
    <>
      <View style={[styles.statusBarPlaceholder, {height: top}]} />
      <StatusBar backgroundColor="#26a69a" barStyle="light-content" />
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Image source = {require('../assets/outline_close_black_24dp.png')}/>
            </Pressable>

            <Pressable
              onPress={onFilter}
            >
              <Text style={styles.modalText}>Filter</Text>
            </Pressable>

            <Pressable
              onPress={onDelete}
            >
              <Text style={styles.modalText}>Delete</Text>
            </Pressable>

            <Pressable
              onPress={onCategory}
            >
              <Text style={styles.modalText}>Category</Text>
            </Pressable>


          </View>
        </View>
      </Modal>

      
      <View style={styles.block}>
        <Text style={styles.dateText}>
          {year} / {month} / {day}
        </Text>
        <Text style={styles.dateText}>{completion}%</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={() => setModalVisible(true)}>
          <View styles ={styles.buttonStyle}>
            <Image source = {require('../assets/outline_density_small_white_24dp.png')}/>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  statusBarPlaceholder: {
    backgroundColor: '#26a69a',
  },
  block: {
    padding: 16,
    backgroundColor: '#26a69a',
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 24,
    color: 'white',
  },
  buttonStyle: {
    alignItems:'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 20,
  },
});

export default DateHead;