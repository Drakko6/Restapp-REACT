import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Favorites from '../screens/favorites';

const FavoriteStacks = createStackNavigator();

function createFavoritesStacks() {
    return (
      <FavoriteStacks.Navigator>
       <FavoriteStacks.Screen name="Favorites"  options={{cardStyle:{backgroundColor:"white"}, title:'Favoritos'}} component={Favorites} />    
      </FavoriteStacks.Navigator>
   
     );
   }
   
   export default createFavoritesStacks; 