import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import  RestaurantsStacks from "./restaurantsStacks";
import TopRestaurantsStacks from "./topRestaurantsStacks";
import SearchStacks from "./searchStacks";
import MyAccountStacks from "./MyAccountStacks";
import FavoriteStacks from "./FavoritesStacks";

import React from 'react';
import { MaterialCommunityIcons } from 'react-native-vector-icons';





const Tabs = createMaterialBottomTabNavigator(
  );
  
  export default function Nav() {
    return (
      
      <Tabs.Navigator
      barStyle={{ backgroundColor: '#ffffff' }} 
      inactiveColor= "#646464"
      activeColor= "#00a680"
      initialRouteName="Restaurantes"
      labeled = {true}
      shifting={false}
      >
    
        <Tabs.Screen name="Restaurantes" component={RestaurantsStacks}
        options={{
          tabBarLabel: 'Restaurantes',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="compass-outline" color={color} size={26} />
          ),
          
          }}
        />

        <Tabs.Screen name="Favorites" component={FavoriteStacks}
          options={{ 
            tabBarLabel: 'Favoritos',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="heart-outline" color={color} size={26} />
            ),
    
                }}        
        />

        
    
       <Tabs.Screen name="Ranking" component={TopRestaurantsStacks} 
        options={{
          tabBarLabel: 'Ranking',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="star-outline" color={color} size={26} />
          ), }}     
    
        />
       
        <Tabs.Screen name="Buscar" component={SearchStacks} 
         options={{ 
          tabBarLabel: 'Buscar',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
    
              }}    
        />
        
        <Tabs.Screen name="Cuenta" component={MyAccountStacks}
          options={{ 
            tabBarLabel: 'Cuenta',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home-outline" color={color} size={26} />
            ),
    
                }}        
        /> 

      
        
      
      </Tabs.Navigator>
    
  
    );
  }