import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';


export default function InfoUser(props){
    const {userInfo} = props;
    const {setReloadData} = props;
    const {toastRef}=props;
    const {setIsLoading}=props;
    const {setTextLoading}=props;

    var photoURL;
    if(userInfo){
        if(userInfo.photoURL){
            photoURL= userInfo.photoURL;
        }
        else{
            photoURL= "https://api.adorable.io/avatars/200/abott@adorable"
        } 
    }
    var displayName;
    if(userInfo){

        if(userInfo.displayName){
            displayName= userInfo.displayName;
        }
        else{
            displayName= "Anónimo";
        } 
    }
    var email;
    if(userInfo){

        if(userInfo.email){
            email= userInfo.email;
        }
        else{
            displayName= "Social Login";
        } 
    }

    
    
  const changeAvatar = async() =>{
      const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;
      
      if(resultPermissionCamera==="denied"){
        toastRef.current.show("Es necesario aceptar los permisos de la galería");

      }else{
          const result = await ImagePicker.launchImageLibraryAsync({
              allowsEditing: true,
              aspect: [4, 3],
              quality: 0.6
          });
          if(result.cancelled){
            toastRef.current.show("Has cerrado la galería sin seleccionar una imagen");    
          }else{
              uploadImage(result.uri, userInfo.uid).then(()=>{
                  updatePhotoURL(userInfo.uid);
              });
          }
      }
  };

  const uploadImage = async (uri, nameImage) =>{
    setTextLoading("Actualizando Avatar");
    setIsLoading(true);
        const response = await fetch(uri);
      const blob = await response.blob();
      const ref = firebase.storage().ref().child('avatar/'+(nameImage));
      return ref.put(blob);
  }


  const updatePhotoURL = (uid)=>{
      firebase
      .storage()
      .ref('avatar/'+uid)
      .getDownloadURL()
      .then(async result =>{

        const update = {
            photoURL: result
        }
        await firebase.auth().currentUser.updateProfile(update);
        setReloadData(true);
        setIsLoading(false);

      }).catch(()=>{
        toastRef.current.show('Error al recuperar el avatar del servidor');

      })
  }


    return(
        <View
        style={styles.viewUserInfo}       
        >

        <Avatar 
        rounded
        size ="large"
        showEditButton
        onEditPress={changeAvatar}
        containerStyle = {styles.userInfoAvatar}
        source= {{
            uri: photoURL 
        }}
        />

        <View>
            <Text style={styles.displayName}>
            {displayName}
            </Text>
            <Text>{email}</Text>
        </View>

        </View>


    );
}

const styles= StyleSheet.create({
    viewUserInfo:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30,

    },
    userInfoAvatar:{
        marginRight:20,
    },
    displayName:{
        fontWeight: 'bold',
    }


})