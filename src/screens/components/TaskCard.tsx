import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ITask {
  id: string;
  task: string;
  completed: boolean;
  handleUpdateTask: (id: string) => void
}

const TaskCard = ({ id, task, completed, handleUpdateTask }: ITask) => {
  return (
    <TouchableOpacity onPress={() => handleUpdateTask(id)} style={{ flexDirection: 'row', marginHorizontal: 20, justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 15 }}>{task.toUpperCase()}</Text>
      <Ionicons name="checkmark-circle" size={30} color={completed ? 'green' : 'gray'} />
    </TouchableOpacity>
  );
};

export default TaskCard;
