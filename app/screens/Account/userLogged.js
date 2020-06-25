import React, {useState, useEffect, useRef} from 'react';
import {View,  StyleSheet } from 'react-native';
import {Button} from 'react-native-elements';
import * as firebase from 'firebase';
import InfoUser from "../../components/Account/infoUser";
import Toast from 'react-native-easy-toast';
import Loading from "../../components/loading";
import AccountOptions from "../../components/Account/accountOptions";


export default function UserLogged(){

    const [userInfo, setUserInfo] = useState();
    const [reloadData, setReloadData] = useState(false);
    const[isLoading, setIsLoading] =useState(false);
    const[textLoading, setTextLoading]= useState("");
    const toastRef = useRef();

    useEffect(()=>{
        ( ()=>{

                firebase.auth().currentUser.reload();
                const user = firebase.auth().currentUser;  
                const userInfo2= user.providerData[0];
                setUserInfo(userInfo2);              

        })();

        setReloadData(false);
    

    }, [reloadData])


    return (
        <View style ={styles.viewUserInfo}>
            <InfoUser userInfo={userInfo} setReloadData ={setReloadData} toastRef={toastRef} 
            setIsLoading= {setIsLoading}
            setTextLoading={setTextLoading}
            />
            <AccountOptions userInfo={userInfo} setReloadData={setReloadData} toastRef={toastRef} />
            <Button 
            buttonStyle= {styles.btnCloseSession}
            titleStyle={styles.btnCloseSessionText}
            title="Cerrar sesión"
            onPress={()=> firebase.auth().signOut()}
            
            />
            <Toast ref={toastRef} position='center' opacity={0.5}
            fadeOutDuration = {3000}
            />
            <Loading text={textLoading} isVisible={isLoading} />
        </View>

    )
}

const styles = StyleSheet.create(
    {
        viewUserInfo:{
            minHeight:"100%",
            backgroundColor: "#f2f2f2",
        },
        btnCloseSession: {
            marginTop:30,
            borderRadius:0,
            backgroundColor:"#fff",
            borderTopWidth:1,
            borderTopColor: "#e2e3e3",
            borderBottomWidth: 1,
            borderBottomColor:"#e3e3e3",
            paddingTop:10,
            paddingBottom: 10
        },
        btnCloseSessionText:{
            color: "#00a680"

        }

    }
)