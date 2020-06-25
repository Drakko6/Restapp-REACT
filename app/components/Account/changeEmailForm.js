import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import * as firebase from 'firebase';
import {reAunthenticate} from '../../utils/api';


export default function ChangeEmailForm(props){

    const {email, setIsVisibleModal, setReloadData, toastRef }= props;
    const [newEmail, setnewEmail]= useState("");
    const [password, setPassword]= useState("");
    const[error, setError]= useState({});
    const [hidePassword, sethidePassword]= useState(true);
    const [isLoading, setisLoading] =useState(false);
    

    const updateEmail = () =>{
        setError({});

        if(!newEmail || email ===newEmail){
            setError({email:"El email no puede ser igual o estar vacío"})
        }else{
            setisLoading(true);

            reAunthenticate(password).
            then(()=>{
                firebase
                .auth()
                .currentUser
                .updateEmail(newEmail).then(()=>{
                    setisLoading(false);
                    setReloadData(true);
                    toastRef.current.show("Email actualizado correctamente");
                    setIsVisibleModal(false);

                }).catch(()=>{
                    setError({email:"Error al actualizar el email"});
                    setisLoading(false);
                })
            })
            .catch(()=>{
                setError({password:"La contraseña no es correcta"})
                setisLoading(false);
            })
        }

    }


    
    return(
        <View style={styles.view}>
            <Input
            placeholder="Correo electronico"
            containerStyle={styles.input}
            defaultValue={email && email}
            onChange={e=> setnewEmail(e.nativeEvent.text)}
            rightIcon={{
                type: "material-community",
                name: "at",
                color: "#c2c2c2"
            }}
            errorMessage={error.email}
            />
            <Input 
            placeholder="Contraseña"
            containerStyle={styles.input}
            password = {true}
            secureTextEntry={hidePassword}
            onChange={e=>setPassword(e.nativeEvent.text)}
            rightIcon={{
                type:"material-community",
                name: hidePassword ? "eye-outline" : "eye-off-outline",
                color: "#c2c2c2",
                onPress: ()=> sethidePassword(!hidePassword)
            }}
            errorMessage= {error.password}
            />
            <Button 
                title= "Cambiar email"
                containerStyle={styles.btnContainer}
                buttonStyle= {styles.btn}
                onPress= {updateEmail}
                loading={isLoading}
            />



        </View>

    )
}


const styles =  StyleSheet.create(
    {
        view:{
            alignItems: 'center',
            paddingTop:10,
            paddingBottom:10,
        },
        input:{
            marginBottom: 10,
            marginTop:10,   
        },
        btnContainer:{
            marginTop: 20,
            width: "95%"
        },
        btn:{
            backgroundColor: "#00a680"
        }
    }
)
