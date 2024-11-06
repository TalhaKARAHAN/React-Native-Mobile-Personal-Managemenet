import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const users = {
    sekreter: '123',
    hoca: '123',
    ogrenci: '123',
    yonetim: '123'
  };

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Hata', 'Kullanıcı adı ve şifre alanları boş olamaz.');
      return;
    }

    if (users[username] === password) {
      navigation.navigate(username.charAt(0).toUpperCase() + username.slice(1)); // Yönetim için yönlendirme
    } else {
      Alert.alert('Hata', 'Geçersiz kullanıcı adı veya şifre.');
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
