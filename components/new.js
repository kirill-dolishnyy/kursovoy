import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

export default function New()  {
    const [modalVisible, setModalVisible] = useState(false);
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.modalText}>Be carefull, don't compare stocks which sectors are different, it will cause inapropriate results.</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Ok!</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Help</Text>
        </Pressable>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 0,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20
    },
    modalView: {
      marginTop: 50,
      backgroundColor: "#7F8C8D",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 1,
      elevation: 2
    },
    button: {
      borderRadius: 5,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#007AFF",
    },
    buttonClose: {
      backgroundColor: "#007AFF",
    },
    textStyle: {
      color: "white",
      textAlign: "center",
      fontFamily: "Roboto"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      color: 'white',
      fontSize: 25
    }
  });