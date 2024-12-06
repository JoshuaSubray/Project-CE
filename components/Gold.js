import { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, ActivityIndicator, FlatList } from 'react-native';
import { styles } from '../App';
/*TODO:
this'll display the current rate of gold and the historical prices of it.
If possible, a graph will display this data, easily visualizing the data for the user. If graphing is possible, then a graph will be displayed on all pages with applicable data.
*/

const Gold = ({ navigation, route }) => {
    const [urlData, setUrlData] = useState('')
    const [goldData, setGoldData] = useState([])
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGoldRates = async () => {
            try {
                const response = await fetch('https://api.nbp.pl/api/cenyzlota/?format=json');
                const data = await response.json();
                setGoldData(data[0]);
                console.log(goldData)
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        fetchGoldRates();
    }, []);

    // if data is loading.
    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" />
                <Text>Loading...</Text>
            </View>
        );
    }
    const generate = () => {
        navigation.navigate('GoldList', {start: start, end: end})
    }
    return (
        <View style={styles.container}>
            <Text>Gold</Text>
            <Text>You can use this form to get gold prices from to dates that you want (dates must be entered in a YYYY-MM-DD format). You can not get gold prices from more then 1 year ago</Text>
            <TextInput
                placeholder='Enter start date'
                onChangeText={setStart}
                value={start}
            ></TextInput>
            <TextInput
                placeholder='Enter end date'
                onChangeText={setEnd}
                value={end}
            ></TextInput>
            <Button
                title='Get gold'
                onPress={() => {
                    generate()
                }}
            ></Button>
            <Text>Current gold price</Text>
            <Text>Date: {goldData.data}</Text>
            <Text>Price: {goldData.cena}</Text>
        </View>
    )
}

export default Gold;