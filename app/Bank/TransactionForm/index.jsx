import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, Modal } from 'react-native';

const TransactionForm = ({ onDeposit, onWithdrawal, balance = 0 }) => {
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const [finalBalance, setFinalBalance] = useState(balance);

  const handleTransaction = (type) => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) return;

    setTransactionType(type);
    if (type === 'deposit') {
      const bonus = value * 0.01;
      setFinalBalance(balance + value + bonus);
    } else if (type === 'withdrawal' && value <= balance) {
      const newBalance = balance - value;
      const fine = newBalance * 0.025;
      setFinalBalance(newBalance - fine);
    }
    setShowModal(true);
  };

  const confirmTransaction = () => {
    if (transactionType === 'deposit') {
      onDeposit(parseFloat(amount));
    } else if (transactionType === 'withdrawal') {
      onWithdrawal(parseFloat(amount));
    }
    setShowModal(false);
    setAmount('');
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
        <Pressable onPress={() => handleTransaction('deposit')} style={styles.button}>
          <Text style={styles.buttonText}>Depositar</Text>
        </Pressable>
        <Pressable onPress={() => handleTransaction('withdrawal')} style={styles.button}>
          <Text style={styles.buttonText}>Sacar</Text>
        </Pressable>
      </View>

      <Modal
        visible={showModal}
        transparent
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable onPress={() => setShowModal(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </Pressable>
            <Text style={styles.modalText}>Deseja finalizar essa operação?</Text>
            <Text style={styles.modalText}>Saldo Atual: R$ {balance.toFixed(2)}</Text>
            <Text style={styles.modalText}>Saldo Final: R$ {finalBalance.toFixed(2)}</Text>
            <Pressable onPress={confirmTransaction} style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>Confirmar Transação</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e60012',
  },
  modalText: {
    fontSize: 16,
    marginVertical: 10,
  },
  confirmButton: {
    backgroundColor: '#e60012',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  confirmButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TransactionForm;
