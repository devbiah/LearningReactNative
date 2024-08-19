import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import AccountBalance from './accountBalance/index';
import TransactionForm from './TransactionForm/index';

const App = () => {
  const [balance, setBalance] = useState(7320.92);

  const handleDeposit = (amount) => {
    if (amount <= 0) {
      Alert.alert('Erro', 'O valor do depósito deve ser positivo.');
      return;
    }
    const bonus = amount * 0.01;
    setBalance(prevBalance => prevBalance + amount + bonus);
  };

  const handleWithdrawal = (amount) => {
    if (amount <= 0 || amount > balance) {
      Alert.alert('Erro', 'O valor do saque deve ser positivo e não pode exceder o saldo.');
      return;
    }
    const fine = (balance - amount) * 0.025;
    setBalance(prevBalance => prevBalance - amount - fine);
  };

  return (
    <View style={styles.container}>
      <AccountBalance balance={balance} />
      <TransactionForm onDeposit={handleDeposit} onWithdrawal={handleWithdrawal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default App;
