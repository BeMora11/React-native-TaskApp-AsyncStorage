import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, ScrollView, StyleSheet, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import TaskCard from './components/TaskCard';
import TitleTask from './components/TitleTask';

interface ITask {
  id: string;
  task: string;
  completed: boolean;
}

const TaskScreen = () => {

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [task, setTask] = useState<string>('');

  const handleTask = () => {
    if (task === "") {
      return;
    }

    setTasks([...tasks, {
      id: uuid(),
      task: task,
      completed: false
    }]);

    setTask('');

  }

  const handleUpdateTask = (id: string) => {
    const taskCompleted = tasks.find((taskOne: ITask) => taskOne.id === id);

    setTasks([...tasks.filter((taskFilter: ITask) => taskFilter.id !== id),
    {
      ...taskCompleted,
      completed: !taskCompleted?.completed
    }]);
  }

  useEffect(() => {
    getTaskFromStorage();
  }, []);

  useEffect(() => {
    setTaskToStorage();
  }, [tasks]);

  const getTaskFromStorage = async () => {
    const tasksStorage = await AsyncStorage.getItem('tasks');

    if(tasksStorage !== null){
      setTasks(JSON.parse(tasksStorage));
    }
    
  }
  const setTaskToStorage = async () => {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks))
  }

  const handleDelTask = async () => {
    await AsyncStorage.removeItem('tasks');
    setTasks([]);
    setTask('');
  }

  return (
    <ScrollView>

      <View style={styles.container}>
        <View>
          <Button title='Limpiar tareas' color="red" onPress={() => handleDelTask()} />
        </View>
        <TextInput onChangeText={(value) => setTask(value)} value={task} placeholder='Escriba tarea a realizar' style={styles.TextInput} />
        <Button onPress={() => handleTask()} title='Registrar tarea' />
        <TitleTask title={'Tareas pentientes'} />
        {tasks.map((item: ITask, index: number) => !item.completed && (
          <TaskCard handleUpdateTask={handleUpdateTask} key={index} {...item} />
        ))}

        <TitleTask title={'Tareas completadas'} />
        {tasks.map((item: ITask, index: number) => item.completed && (
          <TaskCard handleUpdateTask={handleUpdateTask} key={index} {...item} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginHorizontal: 20
  },
  TextInput: {
    marginVertical: 30,
    borderBottomColor: 'black',
    borderBottomWidth: 1
  }
});

export default TaskScreen;
