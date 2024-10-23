import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
/* dependencies.

*/

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Testing.</Text>
      <StatusBar style="auto" />
    </View>
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

/*TODO:
API: https://api.nbp.pl/en.html
more than three screens.
stack navigation.
redux data store.
animation API and gestures.
styling.
error handling.
*/