import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Alert, Text, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import {Image, Icon, Button} from 'react-native-elements';
import Loading from '../components/loading';
import Toast from 'react-native-easy-toast';

import {firebaseApp} from '../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
const db = firebase.firestore(firebaseApp);


export default function Favorites({navigation}){
    
    const [restaurants, setRestaurants] = useState([]);
    const [reloadRestaurants, setReloadRestaurants] =useState(false);
    const [isVisibleLoading, setIsVisibleLoading] =useState(false);
    const [userLogged, setUserLogged] = useState(false);
    const toastRef= useRef();


    firebase.auth().onAuthStateChanged(user =>{
        user ? setUserLogged(true) : setUserLogged(false);
    })


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setReloadRestaurants(true);
        });
    
        return unsubscribe;

      }, [navigation]);
      
    
    useEffect(()=>{
        if(userLogged){
        
            const idUser = firebase.auth().currentUser.uid;
            db.collection('favorites')
            .where('idUser', '==', idUser)
            .get()
            .then(response=>{
                const idRestaurantsArray = [];
                response.forEach(doc =>{
                    idRestaurantsArray.push(doc.data().idRestaurant)
                });
            
                getDataRestaurants(idRestaurantsArray).then(response =>{
                    const restaurants = [];
                    response.forEach(doc =>{
                        let restaurant = doc.data();
                        restaurant.id = doc.id;
                        restaurants.push(restaurant);
                    });
                    setRestaurants(restaurants);
                })
            });
    }    
    setReloadRestaurants(false);

    }, [reloadRestaurants]);

    const getDataRestaurants = idRestaurantsArray =>{
        const arrayRestaurants = [];

        idRestaurantsArray.forEach( idRestaurant =>{
            let result =  db.collection("restaurants").doc(idRestaurant).get();
            arrayRestaurants.push(result);
        });

        return Promise.all(arrayRestaurants);
    } 
   
    
    
    
 /*
    useFocusEffect(
        React.useCallback(() => {
                
         setReloadRestaurants(true);
        
        return()=>{
            

        }
    
      }, [navigation])
    );
    */
    

  
    if(!userLogged){
        return(
            <UserNotLogged setReloadRestaurants={setReloadRestaurants}
            navigation= {navigation} 
            />
        )
    }
    
    if(restaurants.length === 0) {return(
        <NotFoundRestaurants />

    )}


    return(
        <View style={styles.viewBody}>
            {restaurants ? (
                <FlatList
                    data ={restaurants}
                    renderItem={restaurant=>(
                    <Restaurant 
                    restaurant={restaurant}
                     navigation={navigation}
                     setIsVisibleLoading={setIsVisibleLoading}
                     setReloadRestaurants={setReloadRestaurants}
                     toastRef={toastRef}  
                     reloadRestaurants={reloadRestaurants}
                     />
                     )}
                    keyExtractor={(item, index)=>index.toString()}
                />
            ): (
                <View style={styles.loaderRestaurants}>
                    <ActivityIndicator size="large" />
                    <Text>Cargando restaurantes</Text>
                </View>

            )}
            <Toast ref={toastRef} position="center" opacity={1}/>
            
            <Loading  text="Eliminando Restaurante"  isVisible={isVisibleLoading} />
        
        
        </View>

    );

 

    
}

function Restaurant({restaurant, navigation, setIsVisibleLoading, setReloadRestaurants, toastRef, reloadRestaurants}){
  
    const {name, images, id} = restaurant.item;
    const [imageRestaurant, setImageRestaurant] = useState(null);

    useEffect(()=>{
        const image = images[0];
        firebase.storage().
        ref('restaurant-images/'+image)
        .getDownloadURL()
        .then(response=>{
            setImageRestaurant(response);
        });
        setReloadRestaurants(false);

    }, [reloadRestaurants])

    const confirmRemoveFavorite = ()=>{
        
        Alert.alert(
            "Eliminar de Favoritos",
            "¿Estás seguro de querer eliminar el restaurante de favoritos?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"

                },
                {   text: "Eliminar",
                    onPress:removeFavorite

                }
            ],
            {cancelable: false}
        )


    };

    const removeFavorite = () =>{

        setIsVisibleLoading(true);

        db.collection("favorites")
        .where("idRestaurant", "==", id )
        .where("idUser", "==", firebase.auth().currentUser.uid)
        .get()
        .then(response=>{
            response.forEach(doc=>{
                const idFavorite = doc.id;
                db.collection('favorites').doc(idFavorite).delete().then(()=>{
                    setIsVisibleLoading(false);
                    setReloadRestaurants(true);
                    toastRef.current.show("Restaurante eliminado correctamente");

                }).catch(()=>{
                    toastRef.current.show("Error al eliminar. Intente más tarde");
                    setIsVisibleLoading(false);
                })
            })
        })

    }

    return(
        <View style={styles.restaurant}>
           <TouchableOpacity onPress={()=>navigation.navigate("Restaurant",{restaurant: restaurant.item})} >
                <Image 
                    resizeMode="cover"
                    source={{uri: imageRestaurant}}
                    style= {styles.image}
                    PlaceholderContent={<ActivityIndicator color="#fff" />}
                />

           </TouchableOpacity>
           <View style={styles.info}>
               <Text style={styles.name}> {name}</Text>
                <Icon 
                    type="material-community"
                    name= "heart"
                    color="#00a680"
                    containerStyle={styles.favorite}
                    onPress={confirmRemoveFavorite}
                    size= {40}
                    underlayColor= "transparent"
                />

           </View>
        

        </View>
    )
}

function NotFoundRestaurants(){
    return(
        <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
            <Icon 
                type="material-community"
                name="alert-outline"
                size={50}
            />
            <Text style={{fontSize:20, fontWeight: 'bold'}}>No tienes restaurantes en tu lista</Text>

        </View>
    )
}


function UserNotLogged({navigation, setReloadRestaurants}){
    return(
        <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
            <Icon 
                type="material-community"
                name="alert-outline"
                size={50}
            />
            <Text style={{fontSize:20, fontWeight: 'bold', textAlign:'center'}}>Necesitar ingresar a tu cuenta para ver esta sección </Text>
            <Button 
                title="Ingresar a cuenta"
                onPress={()=>navigation.navigate("Login")}
                containerStyle={{marginTop:20, width:"80%"}}
                buttonStyle={{backgroundColor:"#00a680"}}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    loaderRestaurants:{
        marginTop:10,
        marginBottom: 10
    },
    viewBody:{
        flex:1,
        backgroundColor: "#f2f2f2",
    },
    restaurant:{
        margin: 10,
    },
    image:{
        width: "100%",
        height: 180
    },
    info:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight:20,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: -30,
        backgroundColor: '#fff'
    },
    name:{
        fontWeight: 'bold',
        fontSize: 20
    },
    favorite:{
        marginTop: -35,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 100
    }



})