import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function Memories() {
    const [memories, setMemories] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [memoryToDelete, setMemoryToDelete] = useState(null);

    useEffect(() => {
        loadMemories();
    }, []);

    const loadMemories = async () => {
        try {
            const storedMemories = await AsyncStorage.getItem('memories');
            if (storedMemories) {
                setMemories(JSON.parse(storedMemories));
            }
        } catch (error) {
            console.log('Error loading memories:', error);
        }
    };

    const openModal = (image) => {
        setSelectedImage(image);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedImage(null);
    };

    const confirmDeleteMemory = (id) => {
        setMemoryToDelete(id);
        setDeleteModalVisible(true);
    };

    const deleteMemory = async () => {
        try {
            const storedMemories = await AsyncStorage.getItem('memories');
            const memories = storedMemories ? JSON.parse(storedMemories) : [];
            const updatedMemories = memories.filter(memory => memory.id !== memoryToDelete);
            await AsyncStorage.setItem('memories', JSON.stringify(updatedMemories));
            setDeleteModalVisible(false);
            loadMemories();
        } catch (error) {
            console.log('Error deleting memory:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Memórias</Text>
            </View>
            <FlatList
                data={memories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.memoryContainer}>
                        <TouchableOpacity onPress={() => openModal(item.image)}>
                            <Image 
                                source={{ uri: item.image }} 
                                style={styles.memoryImage} 
                                resizeMode="cover" 
                            />
                        </TouchableOpacity>
                        <Text style={styles.memoryTitle}>{item.title}</Text>
                        <Text style={styles.memoryDetails}>
                            {item.year} - {item.city}
                        </Text>
                        <Text style={styles.memoryDescription}>{item.description}</Text>
                        <TouchableOpacity onPress={() => confirmDeleteMemory(item.id)} style={styles.deleteButton}>
                            <Ionicons name="trash" size={20} color="red" />
                        </TouchableOpacity>
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
            />
            <Link href="/Memories/AddMemory" style={styles.addButton}>
                <Ionicons name="add" size={30} color="white" />
            </Link>

            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                        <Ionicons name="close" size={30} color="white" />
                    </TouchableOpacity>
                    {selectedImage && (
                        <Image 
                            source={{ uri: selectedImage }} 
                            style={styles.modalImage} 
                            resizeMode="contain" 
                        />
                    )}
                </View>
            </Modal>

            <Modal visible={deleteModalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.confirmDeleteContent}>
                        <Text style={styles.confirmDeleteText}>Você tem certeza que deseja excluir essa memória?</Text>
                        <View style={styles.confirmDeleteButtonContainer}>
                            <TouchableOpacity onPress={deleteMemory} style={styles.confirmButton}>
                                <Text style={styles.confirmButtonText}>Sim</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setDeleteModalVisible(false)} style={styles.cancelButton}>
                                <Text style={styles.cancelButtonText}>Não</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        backgroundColor: '#6200ee',
        padding: 15,
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    memoryContainer: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden', 
    },
    memoryImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 10,
    },
    memoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    memoryDetails: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    memoryDescription: {
        fontSize: 14,
    },
    deleteButton: {
        marginTop: 10,
        alignItems: 'flex-end',
    },
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#6200ee',
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        alignSelf: 'center', 
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 30,
        zIndex: 1,
    },
    modalImage: {
        width: '100%',
        height: '80%',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 8,
    },
    confirmDeleteContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
    },
    confirmDeleteText: {
        marginBottom: 20,
        fontSize: 16,
        textAlign: 'center',
    },
    confirmDeleteButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    confirmButton: {
        backgroundColor: '#6200ee',
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    confirmButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});