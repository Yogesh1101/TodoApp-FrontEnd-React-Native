/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';

function CreateTodoModal({
  createModalVisible,
  setCreateModalVisible,
  getAllTodos,
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCreateButtonClicked, setIsCreateButtonClicked] = useState(false);

  const handleCreateTodo = async () => {
    setIsCreateButtonClicked(true);
    const dateTime = new Date();
    const postDate = `${dateTime.getDate()}-${
      dateTime.getMonth() + 1
    }-${dateTime.getFullYear()}`;
    const postTime = `${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`;
    if (title === '' || description === '') {
      Alert.alert('Please fill all the fields');
      setIsCreateButtonClicked(false);
    } else {
      await fetch('https://react-native-todoapp.onrender.com/todo/create', {
        method: 'POST',
        body: JSON.stringify({
          title,
          description,
          date: postDate,
          time: postTime,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            setTitle('');
            setDescription('');
            setIsCreateButtonClicked(false);
            Alert.alert(data.message);
            getAllTodos();
          } else {
            Alert.alert('Error while fetching...');
          }
          setCreateModalVisible(false);
        });
    }
  };

  return (
    <Modal
      visible={createModalVisible}
      onRequestClose={() => setCreateModalVisible(false)}
      animationType="slide"
      presentationStyle="formSheet"
    >
      <View style={styles.modalContainer}>
        <View>
          <Text style={styles.createModalTitle}>Create New Todo</Text>
        </View>
        <View>
          <TextInput
            style={styles.inputTitle}
            placeholder="Enter Title"
            onChangeText={(val) => setTitle(val)}
            value={title}
          />
          <TextInput
            style={styles.inputDescription}
            placeholder="Enter Description"
            onChangeText={(val) => setDescription(val)}
            value={description}
          />
        </View>
        <View style={styles.createModalSubmit}>
          <Button
            title="Close"
            color={'red'}
            onPress={() => setCreateModalVisible(false)}
          />
          <Button
            title="Submit"
            color={'green'}
            disabled={isCreateButtonClicked}
            onPress={() => handleCreateTodo()}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    backgroundColor: 'lightblue',
  },
  createModalTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  createModalSubmit: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputTitle: {
    borderWidth: 1,
    width: 200,
    padding: 10,
    borderRadius: 10,
    color: 'black',
    marginVertical: 20,
  },
  inputDescription: {
    borderWidth: 1,
    width: 200,
    padding: 10,
    borderRadius: 10,
    color: 'black',
    marginBottom: 20,
  },
});

export default CreateTodoModal;
