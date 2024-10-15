import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter, Link } from 'expo-router'; 

export default function AddMemory() {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const router = useRouter(); 

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permissão para acessar a galeria é necessária!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permissão para acessar a câmera é necessária!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const saveMemory = async () => {
    if (!title || !year || !image) {
      Alert.alert('Preencha todos os campos!', 'É necessário adicionar um título, um ano e uma imagem.');
      return;
    }

    const newMemory = {
      id: Date.now().toString(),
      title,
      year,
      city,
      description,
      image,
    };

    try {
      const storedMemories = await AsyncStorage.getItem('memories');
      const memories = storedMemories ? JSON.parse(storedMemories) : [];
      memories.push(newMemory);
      await AsyncStorage.setItem('memories', JSON.stringify(memories));
      router.push('/Memories');
    } catch (error) {
      console.log('Erro ao salvar a memória:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="/Memories">
          <Ionicons name="arrow-back" size={24} color="white" />
        </Link>
        <Text style={styles.headerText}>Adicionar Nova Memória</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Ano"
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Conte sobre sua memória"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <View style={styles.imagePickerContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
          <Ionicons name="image" size={24} color="#6200ee" />
          <Text style={styles.imageButtonText}>Escolher Imagem</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={takePhoto} style={styles.imageButton}>
          <Ionicons name="camera" size={24} color="#6200ee" />
          <Text style={styles.imageButtonText}>Tirar Foto</Text>
        </TouchableOpacity>
      </View>
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.imageThumbnail} />
          <TouchableOpacity onPress={removeImage} style={styles.removeImageButton}>
            <Text style={styles.removeImageText}>X</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.saveButton} onPress={saveMemory}>
        <Text style={styles.saveButtonText}>Salvar Memória</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    padding: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    marginTop: 20,
    margin: 20,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  imagePickerContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  imageButtonText: {
    marginLeft: 5,
    color: '#6200ee',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'flex-start',
    margin: 20,
  },
  imageThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'white',
  },
  removeImageButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: 'white',
    fontSize: 12,
  },
  saveButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    margin: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});