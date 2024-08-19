import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const TransactionForm = ({ onDeposit, onWithdrawal }) => {
  const [amount, setAmount] = useState('');

  const handleSubmitDeposit = () => {
    const value = parseFloat(amount);
    if (!isNaN(value) && value > 0) {
      onDeposit(value);
      setAmount('');
    }
  };

  const handleSubmitWithdrawal = () => {
    const value = parseFloat(amount);
    if (!isNaN(value) && value > 0) {
      onWithdrawal(value);
      setAmount('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="Valor"
        placeholderTextColor="#999"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSubmitDeposit} style={styles.button}>
          <Text style={styles.buttonText}>Depositar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmitWithdrawal} style={styles.button}>
          <Text style={styles.buttonText}>Sacar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    width: '80%',
    paddingHorizontal: 10,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    backgroundColor: '#e60012',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransactionForm;
