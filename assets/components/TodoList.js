/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import EditTodoModal from './EditTodoModal';

function TodoList({ todo, getAllTodos }) {
  const [isDeleteButtonClicked, setIsDeleteButtonClicked] = useState(false);
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isDoneButtonClicked, setIsDoneButtonClicked] = useState(false);

  const handleUpdateStatus = async (id) => {
    setIsDoneButtonClicked(true);
    await fetch(`https://react-native-todoapp.onrender.com/todo/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: 'Completed' }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          getAllTodos();
        } else {
          Alert.alert(data.error);
        }
        setIsDoneButtonClicked(false);
      });
  };

  const handleDeleteTodo = async (id) => {
    await fetch(`https://react-native-todoapp.onrender.com/todo/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          getAllTodos();
        }
        setIsDeleteButtonClicked(false);
      });
  };
  return (
    <View
      style={{
        flexDirection: 'column',
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 10,
        marginVertical: 10,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          paddingVertical: 9,
          flexDirection: 'row',
          justifyContent: 'center',
          borderBottomWidth: 1,
          backgroundColor: '#FC4445',
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
          {todo.title}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingVertical: 10,
        }}
      >
        <Text style={{ fontSize: 18 }}>{todo.description}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 18 }}>
          Status:{' '}
          <Text
            style={{
              color: todo.status === 'Completed' ? 'green' : 'red',
            }}
          >
            {todo.status.toUpperCase()}
          </Text>
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <Text style={{ fontSize: 17 }}>DATE: {todo.date}</Text>
        <Text style={{ fontSize: 17 }}>TIME: {todo.time}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 25,
          paddingVertical: 10,
          borderTopWidth: 1,
        }}
      >
        <View>
          {todo.status === 'Completed' ? null : (
            <Button
              onPress={() => handleUpdateStatus(todo._id)}
              color="green"
              title="MARK AS DONE"
              disabled={isDoneButtonClicked}
            />
          )}
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Button
            color="orange"
            title="EDIT"
            onPress={() => setEditModalVisible(true)}
          />
          <EditTodoModal
            todo={todo}
            editModalVisible={editModalVisible}
            setEditModalVisible={setEditModalVisible}
            getAllTodos={getAllTodos}
          />
          <Button
            onPress={() => {
              handleDeleteTodo(todo._id);
              setIsDeleteButtonClicked(true);
            }}
            disabled={isDeleteButtonClicked}
            color="red"
            title="DELETE"
          />
        </View>
      </View>
    </View>
  );
}

export default TodoList;
