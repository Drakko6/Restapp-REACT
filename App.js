import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {firebaseApp} from "./app/utils/firebase"

import Nav from "./app/navigations/navigation"
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
])
YellowBox.ignoreWarnings(['Setting a timer']);


export default function App() {



  return (
    
<NavigationContainer>
  
 <Nav></Nav>
  
</NavigationContainer>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
