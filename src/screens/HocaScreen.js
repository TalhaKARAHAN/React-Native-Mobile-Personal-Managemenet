import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ana Ekran</Text>
      <Button
        title="Hoca Ekranına Git"
        onPress={() => navigation.navigate('Hoca')}
      />
      <Button
        title="Öğrenci Ekranına Git"
        onPress={() => navigation.navigate('Ogrenci')}
      />
      <Button
        title="Sekreter Ekranına Git"
        onPress={() => navigation.navigate('Sekreter')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default HomeScreen;
