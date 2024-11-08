import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

const GruplamaScreen = ({ navigation }) => {
  const [groupedPersonnel, setGroupedPersonnel] = useState([]);

  useEffect(() => {
    fetchGroupedPersonnel();
  }, []);

  const fetchGroupedPersonnel = async () => {
    try {
      const response = await fetch('http://192.168.56.1:3000/api/personel/group-by-department'); // API yolu
      const data = await response.json();
      setGroupedPersonnel(data);
    } catch (error) {
      console.error('Gruplama verileri alınamadı:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gruplama Sonuçları</Text>
      <FlatList
        data={groupedPersonnel}
        keyExtractor={(item) => item.departman}
        renderItem={({ item }) => (
          <View style={styles.groupItem}>
            <Text>{`${item.departman} - Çalışan Sayısı: ${item.toplam_personel} - Toplam Maaş: ${item.totalSalary || 0}`}</Text>
          </View>
        )}
      />
      <Button title="Geri Dön" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  groupItem: { padding: 15, marginVertical: 5, backgroundColor: '#fff', borderRadius: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1, elevation: 2 }
});

export default GruplamaScreen;
