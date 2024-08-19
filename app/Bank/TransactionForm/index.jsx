import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

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
      />
      <View style={styles.buttonContainer}>
        <Button title="Depositar" onPress={handleSubmitDeposit} />
        <Button title="Sacar" onPress={handleSubmitWithdrawal} />
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
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '80%',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default TransactionForm;
