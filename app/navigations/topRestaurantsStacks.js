import { createStackNavigator } from '@react-navigation/stack';
import TopRestaurants from "../screens/topRestaurants";
import React from 'react';





const TopRestaurantsStacks = createStackNavigator();

function createTopRestaurantsStacks() {
 return (
   <TopRestaurantsStacks.Navigator>
    <TopRestaurantsStacks.Screen name="Ranking" options={{cardStyle:{backgroundColor:"white"}}} component={TopRestaurants} />   
   </TopRestaurantsStacks.Navigator>

  );
}

export default createTopRestaurantsStacks; 