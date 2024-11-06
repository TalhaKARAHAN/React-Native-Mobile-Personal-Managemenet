import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const YonetimScreen = () => {
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [departman, setDepartman] = useState('');
  const [maas, setMaas] = useState('');
  const [personelList, setPersonelList] = useState([]);

  useEffect(() => {
    fetchPersonnel(); // İlk yüklemede personel verilerini çek
  }, []);

  // Personel ekleme API çağrısı
  const addPersonnel = async () => {
    if (ad && soyad && departman && maas) {
      try {
        const response = await fetch('http://192.168.56.1:3000/personel', { // IP adresinizi güncelledik
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ad, soyad, departman, maas: parseInt(maas) }),
        });

        if (response.ok) {
          console.log('Personel API üzerinden eklendi');
          fetchPersonnel(); // Güncel personel listesini çek
          clearInputs(); // Girdi alanlarını temizle
        } else {
          console.error('Personel eklenemedi');
        }
      } catch (error) {
        console.error('API’ye bağlanırken hata oluştu: ', error);
      }
    } else {
      alert('Tüm alanlar zorunludur.');
    }
  };

  // Tüm personeli API üzerinden çek
  const fetchPersonnel = async () => {
    try {
      const response = await fetch('http://192.168.56.1:3000/personel'); // IP adresinizi güncelledik
      const data = await response.json();
      setPersonelList(data); // Güncel personel listesini kaydet
    } catch (error) {
      console.error('API’den veriler alınamadı: ', error);
    }
  };

  // Personel silme API çağrısı
  const deletePersonnel = async (id) => {
    try {
      const response = await fetch(`http://192.168.56.1:3000/personel/${id}`, { // IP adresinizi güncelledik
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Personel API üzerinden silindi');
        fetchPersonnel(); // Güncel listeyi tekrar çek
      } else {
        console.error('Personel silinemedi');
      }
    } catch (error) {
      console.error('API’den silme işlemi yapılamadı: ', error);
    }
  };

  // Girdi alanlarını temizle
  const clearInputs = () => {
    setAd('');
    setSoyad('');
    setDepartman('');
    setMaas('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personel Yönetimi</Text>

      <TextInput
        placeholder="Ad"
        value={ad}
        onChangeText={setAd}
        style={styles.input}
      />
      <TextInput
        placeholder="Soyad"
        value={soyad}
        onChangeText={setSoyad}
        style={styles.input}
      />
      <TextInput
        placeholder="Departman"
        value={departman}
        onChangeText={setDepartman}
        style={styles.input}
      />
      <TextInput
        placeholder="Maaş"
        value={maas}
        onChangeText={setMaas}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Personel Ekle" onPress={addPersonnel} />

      <FlatList
        data={personelList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.personelItem}>
            <Text>{`${item.ad} ${item.soyad} - ${item.departman} - Maaş: ${item.maas}`}</Text>
            <TouchableOpacity onPress={() => deletePersonnel(item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Sil</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
  personelItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default YonetimScreen;
