import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AccountBalance = ({ balance }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Saldo Atual:</Text>
      <Text style={styles.balance}>R$ {balance.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  balance: {
    fontSize: 24,
    color: 'green',
  },
});

export default AccountBalance;
