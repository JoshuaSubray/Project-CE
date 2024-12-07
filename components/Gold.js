import { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, ActivityIndicator, FlatList } from 'react-native';
import { styles } from '../App';
/*TODO:
the current price of gold is displayed here.
historical prices can also be searched by inputting dates in two fields.
    if one param, return that specific day.
    if two params, return a range.
this'll display the current rate of gold and the historical prices of it.
*/

const Gold = ({ navigation, route }) => {
    const [urlData, setUrlData] = useState('')
    const [goldData, setGoldData] = useState([])
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [singleDate, setSingleDate] = useState('')
    const [state, setState] = useState(true)
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
        if (state === true) {
            fetchGoldTimeline();
        } else {
            fetchGoldFromDate();
        }
    }

    const fetchGoldTimeline = async () => {
        try {
            const response = await fetch(`https://api.nbp.pl/api/cenyzlota/${start}/${end}/?format=json`);
            const data = await response.json();
            setGoldData(data);
            console.log("Data "+goldData)
        } catch (error) {
            console.error(error);
        }
    }
    const fetchGoldFromDate = async () => {
        try {
        const response = await fetch(`https://api.nbp.pl/api/cenyzlota/${singleDate}/?format=json`)
        const data = await response.json();
        setGoldData(data);
        } catch (error) {
            console.log(error)
        }
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
                    setState(true)
                    generate()
                }}
            ></Button>
            <Text>You can use this form to get gold prices from a specific date</Text>
            <TextInput
            placeholder='Enter date'
            onChangeText={setSingleDate}
            value={singleDate}
            ></TextInput>
            <Button
            title='Get gold'
            onPress={() => {
                setState(false)
                generate()
            }}
            ></Button>
            <Text>Current gold price</Text>
            <Text>Date: {goldData.data}</Text>
            <Text>Price: {goldData.cena}</Text>
            <FlatList
                data={goldData}
                keyExtractor={({ data }) => data.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>Date: {item.data}</Text>
                        <Text>Price for 1 gram of gold: {item.cena}</Text>
                    </View>
                )}
            ></FlatList>
        </View>
    )
}

export default Gold;