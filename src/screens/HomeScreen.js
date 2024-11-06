import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ route, navigation }) => {
  const { role } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hoşgeldiniz, {role}!</Text>
      
      <Button
        title={`${role} Ekranına Git`}
        onPress={() => navigation.navigate(role)}
      />
      
      <View style={styles.buttonSpacing} />

      {role === 'Sekreter' && (
        <Button
          title="Personel Yönetimine Git"
          onPress={() => navigation.navigate('Personel')}
        />
      )}

      {role === 'Yonetim' && (
        <Text style={styles.adminText}>Yönetim Paneline Hoşgeldiniz!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, marginBottom: 20 },
  adminText: { fontSize: 18, marginTop: 20, color: 'blue' },
  buttonSpacing: { height: 20 },
});

export default HomeScreen;
