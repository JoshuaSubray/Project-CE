import { useState } from 'react';
import { Text, View, Button } from 'react-native';
import { styles } from '../App';
/*TODO:
This will allow a user a select input and output currencies, input the amount, and the converted amount will be output. Since this API also keeps track of the historical exchange rates, the function will also allow a user to select the date of their choice and convert the currencies and have the value at that particular time output.
*/

const Convertor = ({navigation, route}) => {
    return (
        <View style={styles.container}>
            <Text>Convertor</Text>
        </View>
    )
}

export default Convertor;