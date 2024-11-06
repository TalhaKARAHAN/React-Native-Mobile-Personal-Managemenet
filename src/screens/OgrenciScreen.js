import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const OgrenciScreen = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === '') {
      Alert.alert('Hata', 'Lütfen bir görev girin.');
      return;
    }
    setTasks([...tasks, { id: Date.now().toString(), title: task, completed: false }]);
    setTask('');
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Öğrenci Görevleri</Text>
      <TextInput
        style={styles.input}
        placeholder="Görev Girin"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Görev Ekle" onPress={addTask} color="#00796b" />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
              <Text style={[styles.taskText, item.completed && styles.completedTask]}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeTask(item.id)}>
              <Text style={styles.deleteText}>Sil</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 8 },
  taskContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  taskText: { fontSize: 18 },
  completedTask: { textDecorationLine: 'line-through', color: 'gray' },
  deleteText: { color: 'red', fontWeight: 'bold' },
});

export default OgrenciScreen;
