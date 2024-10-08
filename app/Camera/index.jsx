import { useState, useRef, useEffect } from 'react';
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as linking from 'expo-linking';
import { Ionicons } from '@expo/vector-icons';

export default function Camera() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);
  const [sideCamera, setSideCamera] = useState('back');
  const [zoom, setZoom] = useState(0);
  const [scanned, setScanned] = useState(false);

  const qrCodeHandle = async ({ data }) => {
    if (scanned) return; // Se já foi escaneado, não faz nada
    setScanned(true); // Marca como escaneado para evitar leituras repetidas

    if (await linking.canOpenURL(data)) {
      await linking.openURL(data); // Abre o link se for válido
      console.log('validate URL:', data);  // Log a URL validada
    } else {
      console.log('Cannot read the code:', data); // Log se o código não pôde ser lido
    }
  };

  // Solicita permissão para acessar a câmera e a biblioteca de mídia
  useEffect(() => {
    // Solicita permissão para a biblioteca de mídia na montagem do componente
    (async () => {
      if (mediaPermission?.status !== 'granted') {
        const { status } = await requestMediaPermission(); // Solicita permissão para a biblioteca de mídia

        if (status !== 'granted') {
          console.log('MediaLibrary permission not granted'); // Log se a permissão não for concedida
        }
      }
    })();
  }, [mediaPermission, requestMediaPermission]);
  // Executa sempre que as permissões mudam

  if (!cameraPermission) {
    return <View></View>;  // Retorna um view vazia enquanto aguarda permissões
  }
  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.textpermission}>Você precisa da permissão para utilizar a câmera</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestCameraPermission}>
          <Text style={styles.buttonText}>Ask Camera Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!mediaPermission || mediaPermission.status !== 'granted') {
    return (
      <View style={styles.container}>
        <Text style={styles.textpermission}>Você precisa da permissão para acessar a biblioteca de mídia</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestMediaPermission}>
          <Text style={styles.buttonText}>Ask Media Permission</Text>
        </TouchableOpacity>
      </View>
      // Mensagem informando que é necessário conceder permissões
    );
  }

  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePictureAsync({
      quality: 0.5,
      base64: true,
    });
    setPhoto(photo);
  };

  const flipSideCamera = () => {
    setSideCamera(sideCamera === 'back' ? 'front' : 'back');
  };

  const adjustZoom = (direction) => {
    setZoom((prevZoom) => Math.min(Math.max(prevZoom + direction, 0), 1));
  };

  const savePhoto = async () => {
    await MediaLibrary.saveToLibraryAsync(photo.uri);
    setPhoto(null);
  };

  return (
    <View style={styles.container}>
      {photo ? (
        <View style={styles.photoContainer}>
          <Image style={styles.image} source={{ uri: photo.uri }} />
          <View style={styles.photoControls}>
            <TouchableOpacity style={styles.button} onPress={() => setPhoto(null)}>
              <Ionicons name="trash" size={24} color="white" />
              <Text style={styles.buttonText}>Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={savePhoto}>
              <Ionicons name="save" size={24} color="white" /> 
              {/* encontrei arquivos de ícones do próprio expo */}
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <CameraView
          facing={sideCamera}
          zoom={zoom}
          style={styles.camera}
          ref={cameraRef}
          onBarcodeScanned={qrCodeHandle}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        >
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.controlButton} onPress={flipSideCamera}>
              <Ionicons name="camera-reverse" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={takePhoto}>
              <Ionicons name="camera" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={() => adjustZoom(0.1)}>
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={() => adjustZoom(-0.1)}>
              <Ionicons name="remove" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  textpermission: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    margin: 10,
  },
  permissionButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  photoContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '80%',
    borderRadius: 10,
  },
  photoControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 10,
  },
  controlButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 10,
    borderRadius: 30,
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
});
