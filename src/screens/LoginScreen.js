import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { loginUser } from '../../api/auth';  // API'den loginUser fonksiyonunu import edin


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Hata', 'Kullanıcı adı ve şifre alanları boş olamaz.');
      return;
    }

    try {
      const userData = await loginUser(username, password); // loginUser fonksiyonu çağrılıyor
      const userRole = userData.rol;

      // Kullanıcı rolüne göre yönlendirme yapma
      switch (userRole) {
        case 'sekreter':
          navigation.navigate('Sekreter');
          break;
        case 'hoca':
          navigation.navigate('Hoca');
          break;
        case 'ogrenci':
          navigation.navigate('Ogrenci');
          break;
        case 'yonetim':
          navigation.navigate('Yonetim');
          break;
        default:
          Alert.alert('Hata', 'Tanımlanmamış bir rol ile giriş yapıldı.');
          break;
      }
    } catch (error) {
      console.error('Giriş hatası:', error);
      Alert.alert('Hata', error.message || 'Geçersiz kullanıcı adı veya şifre.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kullanıcı Bilgi Sistemi</Text>
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Giriş Yap" onPress={handleLogin} color="#00796b" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 8 },
});

export default LoginScreen;
