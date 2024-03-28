/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import TodoList from './assets/components/TodoList';
import CreateTodoModal from './assets/components/CreateTodoModal';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  useEffect(() => {
    getAllTodos();
  }, []);

  const getAllTodos = async () => {
    const response = await fetch(
      'https://react-native-todoapp.onrender.com/todo/all',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();
    setTodos(data.data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.topSection}>
          <Text style={styles.topSectionTitle}>Todo's List</Text>
          <Button
            title="Create"
            onPress={() => setCreateModalVisible(true)}
            style={styles.addButton}
          />
          <CreateTodoModal
            createModalVisible={createModalVisible}
            setCreateModalVisible={setCreateModalVisible}
            getAllTodos={getAllTodos}
          />
        </View>
        {todos.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 20 }}>
            No Todo's to Display, Create
          </Text>
        ) : (
          <View style={styles.todoItems}>
            {todos.map((todo, index) => {
              return (
                <TodoList todo={todo} key={index} getAllTodos={getAllTodos} />
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    flexDirection: 'column',
    gap: 30,
    marginTop: StatusBar.currentHeight,
    marginBottom: StatusBar.currentHeight,
    paddingVertical: 50,
  },
  topSection: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  topSectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  addButton: {},
  todoItems: {},
});
