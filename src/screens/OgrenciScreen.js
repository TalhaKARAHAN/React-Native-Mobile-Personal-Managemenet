import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const OgrenciScreen = ({ navigation }) => {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [sum, setSum] = useState(0);

  const calculateSum = () => {
    const total = parseFloat(firstNumber) + parseFloat(secondNumber);
    setSum(total);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toplama İşlemi</Text>
      <TextInput
        style={styles.input}
        placeholder="Birinci Sayı"
        keyboardType="numeric"
        value={firstNumber}
        onChangeText={setFirstNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="İkinci Sayı"
        keyboardType="numeric"
        value={secondNumber}
        onChangeText={setSecondNumber}
      />
      <Button title="Topla" onPress={calculateSum} color="#00796b" />
      <Text style={styles.result}>Toplam: {sum}</Text>
      <Button title="İkinci Sayfaya Git" onPress={() => navigation.navigate('Ikinci')} color="#00796b" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', marginBottom: 15, padding: 10, borderRadius: 5 },
  result: { fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center' },
});

export default OgrenciScreen;
