import { useState, useRef } from 'react';
import { Image, View, StyleSheet, Text, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function Camera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  if (!permission) {
    return <View></View>
  }
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.textopermissao}>Você precisa da permissão para utilizar a câmera</Text>
        <Button
          title='Ask Permission'
          onPress={requestPermission} />
      </View>
    )
  }

  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePictureAsync({
      quality: 0.5,
      base64:true
    })
    setPhoto(photo)
    console.log(photo)
  }
  return (
    <CameraView style={styles.camera} facing={'back'} ref={cameraRef}> 
{/* back é para a camera traseira, facing é para frontal */}
      <View>
        <Button title='Take photo' onPress={takePhoto}/>
      </View>
    </CameraView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  textopermissao: {
    textAlign: 'center'
  },
  camera:{
    flex:1
  }
});
