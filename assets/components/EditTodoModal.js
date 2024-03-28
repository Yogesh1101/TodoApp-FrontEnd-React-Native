/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
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

function EditTodoModal({
  todo,
  editModalVisible,
  setEditModalVisible,
  getAllTodos,
}) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [isUpdateButtonClicked, setIsUpdateButtonClicked] = useState(false);

  const handleEditTodo = async () => {
    setIsUpdateButtonClicked(true);
    const dateTime = new Date();
    const postDate = `${dateTime.getDate()}-${
      dateTime.getMonth() + 1
    }-${dateTime.getFullYear()}`;
    const postTime = `${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`;
    await fetch(
      `https://react-native-todoapp.onrender.com/todo/update/${todo._id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          title,
          description,
          date: postDate,
          time: postTime,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setIsUpdateButtonClicked(false);
          Alert.alert(data.message);
          getAllTodos();
        } else {
          Alert.alert(data.error);
        }
        setEditModalVisible(false);
      });
  };

  return (
    <Modal
      visible={editModalVisible}
      onRequestClose={() => setEditModalVisible(false)}
      animationType="slide"
      presentationStyle="formSheet"
    >
      <View style={styles.modalContainer}>
        <View>
          <Text style={styles.editModalTitle}>Edit Todo Data</Text>
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
            onPress={() => setEditModalVisible(false)}
          />
          <Button
            title="Update"
            color={'green'}
            disabled={isUpdateButtonClicked}
            onPress={() => handleEditTodo()}
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
  editModalTitle: {
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

export default EditTodoModal;
