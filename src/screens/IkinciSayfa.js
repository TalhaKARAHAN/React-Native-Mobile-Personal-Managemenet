import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';

const IkınciSayfa = ({ navigation }) => {
  const showAlert = () => {
    Alert.alert('Uyarı', 'Bu bir uyarıdır!');
  };

  const showPopup = () => {
    Alert.alert('Popup', 'Bu bir popuptır!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>İkinci Sayfa</Text>
      <Button title="Uyarı Göster" onPress={showAlert} color="#00796b" />
      <Button title="Popup Göster" onPress={showPopup} color="#00796b" />
      <Button title="Geri Dön" onPress={() => navigation.goBack()} color="#00796b" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
});

export default IkınciSayfa;
