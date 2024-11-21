// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Table from './components/Table';
import Convertor from './components/Converter';
import Gold from './components/Gold';

/* npm install
@expo/ngrok@^4.1.0
@react-navigation/native
@react-navigation/native-stack
react-native-screens
*/

const Stack = createNativeStackNavigator();

// TODO: index is the home page. this'll have information and navigation to the program's functions.

// navbar.
function Index({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Welcome to Currency Exchange!</Text>
      
      <Button
        title="Table"
        onPress={() => navigation.navigate("Table")}
      />

      <Button
        title="Convertor"
        onPress={() => navigation.navigate("Convertor")}
      />

      <Button
        title="Gold"
        onPress={() => navigation.navigate("Gold")}
      />
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

// stack navigation.
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Index">
      <Stack.Screen name="Index" component={Index}/>
      <Stack.Screen name="Table" component={Table}/>
      <Stack.Screen name="Convertor" component={Convertor}/>
      <Stack.Screen name="Gold" component={Gold}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/*TODO:.
API: https://api.nbp.pl/en.html
more than three screens.
stack navigation.
redux data store.
animation API and gestures.
styling.
error handling.

table/index.
convertor.
gold.
*/