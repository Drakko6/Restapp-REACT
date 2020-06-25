import { createStackNavigator } from '@react-navigation/stack';
import MyAccount from "../screens/Account/MyAccount";
import React from 'react';
import Login from '../screens/Account/login';
import Register from '../screens/Account/register';



const MyAccountStacks = createStackNavigator();

function createMyAccountStacks() {
 return (
   <MyAccountStacks.Navigator>
    <MyAccountStacks.Screen name="Cuenta"  options={{cardStyle:{backgroundColor:"white"}}} component={MyAccount} />   
    <MyAccountStacks.Screen name="Login" options={{cardStyle:{backgroundColor:"white"}}} component={Login} />   
    <MyAccountStacks.Screen name="Registro" title="Registro" options={{cardStyle:{backgroundColor:"white"}}} component={Register} />  

   </MyAccountStacks.Navigator>

  );
}

export default createMyAccountStacks; 