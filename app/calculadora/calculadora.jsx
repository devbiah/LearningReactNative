import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';

const Calculator = () => {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [resultado, setResultado] = useState('');

  const soma = () => {
    setResultado(Number(number1) + Number(number2));
  };

  const subtracao = () => {
    setResultado(Number(number1) - Number(number2));
  };

  const multiplicacao = () => {
    setResultado(Number(number1) * Number(number2));
  };

  const divisao = () => {
    if (Number(number2) !== 0) {
      setResultado(Number(number1) / Number(number2));
    } else {
      setResultado('Erro: Divisão por zero');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CALCULADORA</Text>
      
      <TextInput   
        style={styles.input}
        onChangeText={setNumber1} 
        value={number1}
        placeholder='Insira um número'
        keyboardType='numeric'
      />
      <TextInput   
        style={styles.input}
        onChangeText={setNumber2} 
        value={number2}
        placeholder='Insira outro número'
        keyboardType='numeric'
      />

      <View style={styles.buttonContainer}>
        <Button title='+' onPress={soma} />
        <Button title='-' onPress={subtracao} />
        <Button title='x' onPress={multiplicacao} />
        <Button title=':' onPress={divisao} />
      </View>

      <Text style={styles.result}>O valor é {resultado}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  result: {
    fontSize: 18,
  },
});

export default Calculator;
