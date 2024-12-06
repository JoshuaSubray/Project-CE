import { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { styles } from '../App';

const GoldList = ({navigation, route}) => {
    const [goldData, setGoldData] = useState([])
    const {start} = route.params
    const {end} = route.params
    console.log("start: "+start)
    console.log("end: "+end)
    const fetchGoldTimeline = async() => {
        console.log("start: "+start)
        console.log("end: "+end)
        try {
            const response = await fetch(`https://api.nbp.pl/api/cenyzlota/${start}/${end}/?format=json`);
            const data = await response.json();
            setGoldData(data);
            console.log(goldData)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchGoldTimeline()
    }, [])
    return(
        <View style={styles.container}>
            <FlatList
            data={goldData}
            keyExtractor={({data}) => data.toString()}
            renderItem={({item}) => (
                <View>
                    <Text>Date: {item.data}</Text>
                    <Text>Price for 1 gram of gold: {item.cena}</Text>
                </View>
            )}
            ></FlatList>
        </View>
    )
}

export default GoldList