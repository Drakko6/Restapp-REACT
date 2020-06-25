import React, {useRef} from 'react';
import {StyleSheet, View, ScrollView, Text, Image} from 'react-native';
import {Divider} from 'react-native-elements';
import LoginForm from '../../components/Account/loginForm';
import LoginFacebook from '../../components/Account/loginFacebook';
import Toast from 'react-native-easy-toast';

export default function Login({navigation}){

    const toastRef = useRef();
    return (
      <ScrollView>
        <Image
          source={require("../../../assets/image/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.viewContainer}>
          <LoginForm toastRef= {toastRef}/>

          <CreateAccount 
          navigation={navigation}></CreateAccount>

        </View>
        <Divider style={styles.divider} />
        <View style={styles.viewContainer}>
        <LoginFacebook toastRef={toastRef} navigation={navigation} />
        </View>
        <Toast ref={toastRef} 
        position ='center' opacity={0.5}/>
      </ScrollView>
    );
}


function CreateAccount({navigation}){
    
    
    return(
        <Text
        style={styles.textRegister}>

            ¿Aún no tienes una cuenta? {""}
            <Text style ={styles.btnRegister} 
            onPress={()=>navigation.navigate('Registro')}>
                Regístrate
            </Text>

        </Text>
    )
}

const styles = StyleSheet.create(
    {
        logo:{
            width:"100%",
            height: 150,
            margin: 20,

        },
        viewContainer:{
            marginRight: 40,
            marginLeft: 40,
        },
        divider:{
            backgroundColor: "#00a680",
            margin: 40,
        },
        textRegister:{
            marginTop:15,
            marginLeft:10,
            marginRight:10,
        },
        btnRegister:{
            color:"#00a680",
            fontWeight: "bold",
        }

    }
)