import React, {useState} from 'react';
import {SocialIcon} from 'react-native-elements';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import {FacebookApi} from '../../utils/social';
import Loading from '../loading';


export default function LoginFacebook(props){

    const {toastRef, navigation} = props;
    const [isLoading, setIsLoading] = useState(false);


    Facebook.initializeAsync(FacebookApi.application_id);
    
    const login = async()=>{
        
        const {type, token} = await Facebook.logInWithReadPermissionsAsync(
                FacebookApi.application_id,
                {permissions: FacebookApi.permissions}
            );

            
            if(type == "success"){
                setIsLoading(true);
                const credentials = firebase.auth.FacebookAuthProvider.credential(token);
                await firebase
                        .auth()
                        .signInWithCredential(credentials)
                        .then(()=>{
                                                            
                            navigation.navigate('Cuenta');
                        })
                        .catch(()=>{
                            toastRef.current.show('Error accediendo con facebook.Intente más tarde');
                        })
                  await firebase.auth().currentUser.reload();

            }
            else if (type === "cancel"){
                toastRef.current.show("Inicio de sesión cancelado");

            }else{
                toastRef.current.show("Error desconocido. Intente más tarde");
            }
            setIsLoading(false);

        };
      
    
    

    return(

        <>
        <SocialIcon
        title="Iniciar sesión con Facebook"
        button
        type="facebook"
        onPress={login}        
        />
        <Loading 
        isVisible={isLoading}
        text="Iniciando sesión"
        />
        </>
        

    );
}