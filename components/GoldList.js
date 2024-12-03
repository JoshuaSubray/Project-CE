import { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, FlatList } from 'react-native';
import { styles } from '../App';

const GoldList = ({navigation, route}) => {
    const [goldData, setGoldData] = useState([])
    const {api} = route.params
    console.log(api)
    const dataFromApi = async() => {
        const url = api
        try {
            const response = await fetch(url)
            console.log("url: "+url)
            if (!response.ok) {
                throw new Error(response.status);
            }
            const data = response.json()
            setGoldData(data)
            return data
        } catch (error) {
            console.log("Error: "+error)
        }
    }
    useEffect(() => {
        dataFromApi()
    }, [])
    return(
        <View style={styles.container}>
            <FlatList
            data={goldData}
            keyExtractor={({data}) => data.toString()}
            renderItem={({item}) => (
                <View>
                    <Text>Date: {item.CenaZlota.data}</Text>
                    <Text>Price for 1 gram of gold: {item.CenaZlota.cena}</Text>
                </View>
            )}
            ></FlatList>
        </View>
    )
}

export default GoldList