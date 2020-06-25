import React, {useState, useEffect} from 'react';
import {View, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import ListRestaurants from '../../components/Restaurants/listRestaurants';


import {firebaseApp} from '../../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
const db = firebase.firestore(firebaseApp);


export default function Restaurants({navigation}){
    
    const [user, setUser]= useState(null);
    const [restaurants, setRestaurants] =useState([]);
    const [startRestaurants, setStartRestaurants] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [totalRestaurants, setTotalRestaurants]= useState(0);
    const [isReloadRestaurants, setIsReloadRestaurants] =useState(false);

    const limitRestaurants = 8;

    
    useEffect(()=>{
        firebase.auth().onAuthStateChanged(userInfo =>{
            setUser(userInfo);
        });}, [])

    useEffect(()=>{
        db.collection("restaurants").get().then((snap)=>{
            setTotalRestaurants(snap.size);  
        });

        ( ()=>{
            const resultRestaurants = [];
            const restaurants = db.collection('restaurants').orderBy('createAt', 'desc').limit(limitRestaurants);
            
             restaurants.get().then(response =>{
                setStartRestaurants(response.docs[response.docs.length -1]);
                response.forEach(doc =>{
                    let restaurant = doc.data();
                    restaurant.id = doc.id;
                    resultRestaurants.push({restaurant})
                });
                setRestaurants(resultRestaurants);
            })
        })()
        setIsReloadRestaurants(false);
    }, [isReloadRestaurants]);

    const handleLoadMore = async () =>{
        
        const resultRestaurants =[];
        restaurants.length < totalRestaurants && setIsLoading(true);

        const restaurantsDB = db.collection('restaurants')
        .orderBy("createAt", "desc").startAfter(startRestaurants.data().createAt)
        .limit(limitRestaurants);

        await restaurantsDB.get().then(response =>{
            if(response.docs.length > 0){
                setStartRestaurants(response.docs[response.docs.length -1]);
            }else{
                setIsLoading(false);
            }

            response.forEach(doc =>{
                let restaurant = doc.data();
                restaurant.id = doc.id;
                resultRestaurants.push({restaurant});
            });

            setRestaurants([...restaurants, ...resultRestaurants]);
            
        });
    };

    return(

        <View style={styles.viewBody}>
            <ListRestaurants navigation={navigation} restaurants={restaurants}  isLoading={isLoading} handleLoadMore={handleLoadMore} />
           {user && <AddRestaurantButton navigation={navigation}
                     setIsReloadRestaurants={setIsReloadRestaurants} />
 }

        </View>
    );

}

function AddRestaurantButton({navigation, setIsReloadRestaurants}){

    
    return(
        <ActionButton 
        buttonColor="#00a680"
        onPress= {()=>{navigation.navigate('AddRestaurantes', {setIsReloadRestaurants});}}        />
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1}

})