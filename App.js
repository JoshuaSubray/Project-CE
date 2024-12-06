// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Table from './components/Table';
import Convertor from './components/Converter';
import Gold from './components/Gold';
import GoldList from './components/GoldList';

/* npm install
@expo/ngrok@^4.1.0
@react-navigation/native
@react-navigation/native-stack
react-native-screens
@react-native-picker/picker
*/

const Stack = createNativeStackNavigator();

// navbar.
function Index({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to Currency Exchange!</Text>

      <Button
        title="Convertor"
        onPress={() => navigation.navigate("Convertor")}
      />

      <Button
        title="Table"
        onPress={() => navigation.navigate("Table")}
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
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="Table" component={Table} />
        <Stack.Screen name="Convertor" component={Convertor} />
        <Stack.Screen name="Gold" component={Gold} />
        <Stack.Screen name='GoldList' component={GoldList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginRight: 10,
  },
  dateInput: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  textInput: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
  resultText: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
  },
});
