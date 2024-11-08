import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles'; // Stil dosyasını içe aktarın

const YonetimScreen = () => {
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [maas, setMaas] = useState('');
  const [departman, setDepartman] = useState('');
  const [sifre, setSifre] = useState('');
  const [roller, setRoller] = useState([]);
  const [personelList, setPersonelList] = useState([]);
  const [selectedPersonnel, setSelectedPersonnel] = useState(null); // Seçili personeli tutmak için ekledik
  const [groupedPersonnel, setGroupedPersonnel] = useState([]); // Gruplama sonuçları için state

  useEffect(() => {
    fetchRoles();
    fetchPersonnel();
    fetchGroupedPersonnel(); // Gruplama sonuçlarını al
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch('http://192.168.56.1:3000/api/roller'); // API yolu
      const data = await response.json();
      setRoller(data);
    } catch (error) {
      console.error('Roller alınamadı:', error);
    }
  };

  const fetchPersonnel = async () => {
    try {
      const response = await fetch('http://192.168.56.1:3000/api/personel'); // API yolu
      const data = await response.json();
      setPersonelList(data);
    } catch (error) {
      console.error('API’den veriler alınamadı:', error);
    }
  };

  const addPersonnel = async () => {
    if (ad && soyad && departman && sifre) {
      const rol_id = roller.find(rol => rol.rol === departman)?.id;
      if (!rol_id) {
        Alert.alert('Hata', 'Geçerli bir rol seçin.');
        return;
      }

      try {
        const personnelData = { ad, soyad, departman, maas: maas ? parseInt(maas) : null, sifre, rol_id };
        const response = await fetch('http://192.168.56.1:3000/api/personel', { // API yolu
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(personnelData),
        });

        if (response.ok) {
          console.log('Personel API üzerinden eklendi');
          fetchPersonnel();
          clearInputs();
          Alert.alert('Başarılı', 'Personel eklendi.');
        } else {
          Alert.alert('Hata', 'Personel eklenemedi.');
        }
      } catch (error) {
        Alert.alert('Hata', 'API’ye bağlanırken hata oluştu.');
      }
    } else {
      Alert.alert('Hata', 'Tüm alanlar zorunludur.');
    }
  };

  const updatePersonnel = async () => {
    if (selectedPersonnel) {
      const rol_id = roller.find(rol => rol.rol === departman)?.id;
      if (!rol_id) {
        Alert.alert('Hata', 'Geçerli bir rol seçin.');
        return;
      }

      const personnelData = { ad, soyad, departman, maas: maas ? parseInt(maas) : null, sifre, rol_id };
      try {
        const response = await fetch(`http://192.168.56.1:3000/api/personel/${selectedPersonnel}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(personnelData),
        });

        if (response.ok) {
          console.log('Personel güncellendi');
          fetchPersonnel();
          clearInputs();
          setSelectedPersonnel(null); // Seçili personeli sıfırla
          Alert.alert('Başarılı', 'Personel güncellendi.');
        } else {
          Alert.alert('Hata', 'Personel güncellenemedi.');
        }
      } catch (error) {
        Alert.alert('Hata', 'API’ye bağlanırken hata oluştu.');
      }
    }
  };

  const deletePersonnel = async (id) => {
    try {
      const response = await fetch(`http://192.168.56.1:3000/api/personel/${id}`, { method: 'DELETE' }); // API yolu
      if (response.ok) {
        console.log('Personel API üzerinden silindi');
        fetchPersonnel();
        Alert.alert('Başarılı', 'Personel silindi.');
      } else {
        Alert.alert('Hata', 'Personel silinemedi.');
      }
    } catch (error) {
      Alert.alert('Hata', 'API’den silme işlemi yapılamadı.');
    }
  };

  const handleUpdatePersonnel = (personel) => {
    setAd(personel.ad);
    setSoyad(personel.soyad);
    setDepartman(personel.departman);
    setMaas(personel.maas.toString());
    setSifre(''); // Şifre alanını güncelleme için boş bırakıyoruz
    setSelectedPersonnel(personel.id); // Seçili personelin ID'sini kaydedin
  };

  const clearInputs = () => {
    setAd('');
    setSoyad('');
    setDepartman('');
    setMaas('');
    setSifre('');
    setSelectedPersonnel(null); // Seçili personeli sıfırla
  };

  const fetchGroupedPersonnel = async () => {
    try {
      const response = await fetch('http://192.168.56.1:3000/api/personel/group-by-department'); // API yolu
      const data = await response.json();
      console.log('Gruplama Sonuçları:', data); // Gruplama sonuçlarını konsola yazdır
      setGroupedPersonnel(data); // Gruplama sonuçlarını state'e kaydedin
    } catch (error) {
      console.error('Gruplama verileri alınamadı:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personel Yönetimi</Text>

      <TextInput placeholder="Ad" value={ad} onChangeText={setAd} style={styles.input} />
      <TextInput placeholder="Soyad" value={soyad} onChangeText={setSoyad} style={styles.input} />
      
      <Text style={styles.label}>Departman Seçin</Text>
      <Picker selectedValue={departman} onValueChange={(itemValue) => setDepartman(itemValue)} style={styles.picker}>
        <Picker.Item label="Departman Seçin" value="" />
        {roller.map((rol) => (
          <Picker.Item key={rol.id} label={rol.rol} value={rol.rol} />
        ))}
      </Picker>
      
      <TextInput placeholder="Maaş" value={maas} onChangeText={setMaas} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Şifre" value={sifre} onChangeText={setSifre} secureTextEntry style={styles.input} />
      
      <Button title={selectedPersonnel ? "Güncelle" : "Personel Ekle"} onPress={selectedPersonnel ? updatePersonnel : addPersonnel} />
      
      <FlatList
        data={personelList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.personelItem}>
            <Text>{`${item.ad} ${item.soyad} - ${item.departman} - Maaş: ${item.maas}`}</Text>
            <TouchableOpacity onPress={() => handleUpdatePersonnel(item)} style={styles.updateButton}>
              <Text style={styles.updateButtonText}>Güncelle</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deletePersonnel(item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Sil</Text>
            </TouchableOpacity>
          </View>
        )}
      />

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
    </View>
  );
};

export default YonetimScreen;
