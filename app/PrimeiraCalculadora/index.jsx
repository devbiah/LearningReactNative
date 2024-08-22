import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

export default function App() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculation = (operation) => {
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);

    if (isNaN(num1) || isNaN(num2)) {
      setResult('Insira valores válidos');
      return;
    }

    let calculation;
    switch (operation) {
      case 'add':
        calculation = num1 + num2;
        break;
      case 'subtract':
        calculation = num1 - num2;
        break;
      case 'multiply':
        calculation = num1 * num2;
        break;
      case 'divide':
        calculation = num2 !== 0 ? num1 / num2 : 'Erro: Divisão por zero';
        break;
      default:
        return;
    }
    setResult(calculation.toString());
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        inputMode="numeric"
        placeholder="Digite o primeiro valor"
        value={value1}
        onChangeText={setValue1}
      />
      <TextInput
        style={styles.input}
        inputMode="numeric"
        placeholder="Digite o segundo valor"
        value={value2}
        onChangeText={setValue2}
      />

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => handleCalculation('add')}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handleCalculation('subtract')}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handleCalculation('multiply')}>
          <Text style={styles.buttonText}>*</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handleCalculation('divide')}>
          <Text style={styles.buttonText}>/</Text>
        </Pressable>
      </View>

      <Text style={styles.resultText}>Resultado: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
