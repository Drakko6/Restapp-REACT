import { createStackNavigator } from '@react-navigation/stack';
import Restaurants from "../screens/RestaurantsFolder/restaurants";
import React from 'react';
import AddRestaurant from '../screens/RestaurantsFolder/addRestaurant';
import Restaurant from '../screens/RestaurantsFolder/restaurant';
import AddReviewRestaurant from '../screens/RestaurantsFolder/addReviewRestaurant';


const RestaurantsStacks = createStackNavigator();

function createRestaurantsStacks(props) {

 return (
   <RestaurantsStacks.Navigator
   initialRouteName="Restaurants"
   >
    <RestaurantsStacks.Screen name="Restaurants" options={{cardStyle:{backgroundColor:"white"}}} component={Restaurants} />   
    <RestaurantsStacks.Screen name="AddRestaurantes" options={{ title: 'Agregar restaurante', cardStyle:{backgroundColor:"white"}}} component={AddRestaurant} />   
    <RestaurantsStacks.Screen name="Restaurant" options= {props=>({ title: props.route.params.restaurant.name, cardStyle:{backgroundColor:"white"}})} component={Restaurant} />   
    <RestaurantsStacks.Screen name="AddReviewRestaurant" options= {{ title:"Nuevo comentario", cardStyle:{backgroundColor:"white"}}} component={AddReviewRestaurant} />   

   </RestaurantsStacks.Navigator>

  );
}

export default createRestaurantsStacks; 