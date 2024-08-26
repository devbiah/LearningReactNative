import React, { useState } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
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
    setBalance((prevBalance) => prevBalance + amount + bonus);
  };

  const handleWithdrawal = (amount) => {
    if (amount <= 0 || amount > balance) {
      Alert.alert('Erro', 'O valor do saque deve ser positivo e não pode exceder o saldo.');
      return;
    }
    const newBalance = balance - amount;
    const fine = newBalance * 0.025;
    setBalance(newBalance - fine);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://www.itapevarec.com.br/Nembus/Images/logo-santander-transparent.png' }}
        style={styles.logo}
      />
      <AccountBalance balance={balance} />
      <TransactionForm
        onDeposit={handleDeposit}
        onWithdrawal={handleWithdrawal}
        balance={balance} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    padding: 16,
  },
  logo: {
    width: 150,
    height: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default App;
