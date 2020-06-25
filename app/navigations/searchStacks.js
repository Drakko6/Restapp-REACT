import { createStackNavigator } from '@react-navigation/stack';
import Search from "../screens/search";
import React from 'react';

const SearchStacks = createStackNavigator();

function createSearchStacks() {
 return (
   <SearchStacks.Navigator>
    <SearchStacks.Screen name="Buscar" options={{cardStyle:{backgroundColor:"white"}}} component={Search} />   
   </SearchStacks.Navigator>

  );
}

export default createSearchStacks; 