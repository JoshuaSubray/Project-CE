// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Linking, Button, Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Table from './components/Table';
import Converter from './components/Converter';
import Gold from './components/Gold';
import Ticker from './components/Ticker';

/* npm install
@expo/ngrok@^4.1.0
@react-navigation/native
@react-navigation/native-stack
react-native-screens
@react-native-picker/picker
*/

// stack navigation.
const Stack = createNativeStackNavigator();

// URL opener.
const openURL = (url) => {
  Linking.openURL(url).catch((error) => console.error("ERROR: ", error));
}

function Index({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header: */}
      <Text style={styles.title}>JAJ Currencies</Text>
      <Ticker />

      {/* Navigation Bar: */}
      <View style={styles.navbar}>
        <Button
          title="Converter"
          onPress={() => navigation.navigate("Converter")}
        />

        <Button
          title="Table"
          onPress={() => navigation.navigate("Table")}
        />

        <Button
          title="Gold"
          onPress={() => navigation.navigate("Gold")}
        />

        <Button
          title="API"
          onPress={() => openURL("https://api.nbp.pl/en.html")}
        />

        <Button
          title="GitHub"
          onPress={() => openURL("https://github.com/JoshuaSubray/Project-CE")}
        />
      </View>

      {/* Body: */}
      <View styles={styles.bodyContainer}>
        <Text style={styles.label}>Welcome to JAJ Currencies!</Text>
        <Text style={styles.label}>
          Powered by the NBP Web API, this is an application that allows you to view the latest data from the National Bank of Poland.
        </Text>

        {/* <Text style={styles.label}>
          Hold down on any button in the navigation bar to read what it's for and do.
        </Text> */}
      </View>
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
        <Stack.Screen name="Converter" component={Converter} />
        <Stack.Screen name="Gold" component={Gold} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 40, // padding to center content.
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20, // space under title.
  },
  navbar: {
    flexDirection: 'row', // arrange in a horizontal row.
    justifyContent: 'space-evenly', // distribute elements evenly.
    width: '100%', // container spans the screen width.
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row', // arrange in a horizontal row.
    alignItems: 'center', // align vertically and centered in the container.
    marginBottom: 15,
    width: '100%', // container spans the screen width.
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
    marginRight: 10,
  },
  dateInput: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    borderWidth: 1, // border width.
    borderColor: '#cccccc',
    borderRadius: 5, // rounded corners.
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '100%', // container spans the screen width.
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5, // rounded corners.
    backgroundColor: '#ffffff',
  },
  textInput: {
    height: 50,
    width: '100%', // container spans the screen width.
    borderWidth: 1, // border width.
    borderColor: '#cccccc',
    borderRadius: 5, // rounded corners.
    paddingLeft: 10,
    backgroundColor: '#ffffff',
    fontSize: 16,
    marginBottom: 15,
  },
  resultText: {
    height: 50,
    width: '100%', // container spans the screen width.
    borderWidth: 1, // border width.
    borderColor: '#cccccc',
    borderRadius: 5, // rounded corners.
    paddingLeft: 10,
    backgroundColor: '#ffffff',
    fontSize: 16,
    color: '#333333',
    textAlign: 'center', // center text in the middle.
    marginTop: 10,
  },
});
