import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const SekreterScreen = () => {
  const [announcement, setAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState([]);

  const addAnnouncement = () => {
    if (announcement.trim() === '') {
      Alert.alert('Hata', 'Lütfen bir duyuru girin.');
      return;
    }
    setAnnouncements([...announcements, announcement]);
    setAnnouncement('');
  };

  const removeAnnouncement = (index) => {
    const updatedAnnouncements = announcements.filter((_, i) => i !== index);
    setAnnouncements(updatedAnnouncements);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sekreter Duyuruları</Text>
      <TextInput
        style={styles.input}
        placeholder="Duyuru Girin"
        value={announcement}
        onChangeText={setAnnouncement}
      />
      <Button title="Duyuru Ekle" onPress={addAnnouncement} color="#00796b" />
      <FlatList
        data={announcements}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.announcementContainer}>
            <Text style={styles.announcementText}>{item}</Text>
            <TouchableOpacity onPress={() => removeAnnouncement(index)}>
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
  announcementContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  announcementText: { fontSize: 18 },
  deleteText: { color: 'red', fontWeight: 'bold' },
});

export default SekreterScreen;
