import { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { styles } from '../App';

const GoldList = ({navigation, route}) => {
    const [goldData, setGoldData] = useState([])
    const [loading, setLoading] = useState(true);
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
            //setLoading(false);
        } catch (error) {
            console.error(error);
            //setLoading(false);
        }
    }
    // if (loading) {
    //     return (
    //         <View>
    //             <ActivityIndicator size="large" />
    //             <Text>Loading...</Text>
    //         </View>
    //     );
    // }
    // const {api} = route.params
    // console.log(api)
    // const dataFromApi = async() => {
    //     const url = api
    //     try {
    //         const response = await fetch(url)
    //         console.log("url: "+url)
    //         if (!response.ok) {
    //             throw new Error(response.status);
    //         }
    //         const data = response.json()
    //         setGoldData(data)
    //         return data
    //     } catch (error) {
    //         console.log("Error: "+error)
    //     }
    // }
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