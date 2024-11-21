import { useState } from 'react';
import { Text, View, Button } from 'react-native';
import { styles } from '../App';
/*TODO:
this'll display the current rate of gold and the historical prices of it. If possible, a graph will display this data, easily visualizing the data for the user. If graphing is possible, then a graph will be displayed on all pages with applicable data.
*/

const Gold = ({navigation, route}) => {
    return (
        <View style={styles.container}>
            <Text>Gold</Text>
        </View>
    )
}

export default Gold;