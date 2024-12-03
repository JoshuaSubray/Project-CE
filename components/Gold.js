import { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, FlatList } from 'react-native';
import { styles } from '../App';
/*TODO:
this'll display the current rate of gold and the historical prices of it. If possible, a graph will display this data, easily visualizing the data for the user. If graphing is possible, then a graph will be displayed on all pages with applicable data.
*/

const Gold = ({navigation, route}) => {
    const [urlData, setUrlData] = useState('')
    const [goldData, setGoldData] = useState([])
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const url = `https://api.nbp.pl/api/${urlData}`
    const dataFromApi = async() => {
        //const url = `https://api.nbp.pl/api/${urlData}`
        // try {
        //     const response = await fetch(url)
        //     console.log("url: "+url)
        //     if (!response.ok) {
        //         throw new Error(response.status);
        //     }
        //     const data = response.json()
        //     setGoldData(data)
        //     return data
        // } catch (error) {
        //     console.log("Error: "+error)
        // }
    }
    const generate = () => {
        console.log("url: "+url)
        navigation.navigate('Gold')
        //console.log("data "+urlData)
        //navigation.navigate('GoldList', {api: url})
    }
    // useEffect(() => {
    //     dataFromApi()
    // }, [])
    return (
        <View style={styles.container}>
            <Text>Gold</Text>
            <Text>You can use this form to get gold prices from to dates that you want (dates must be entered in a YYYY-MM-DD format for example 1999-01-01 for January 1st, 1999)</Text>
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
            <Text>You can press this button to get the gold prices from today</Text>
            <Button
            title='Get gold prices form today'
            onPress={() => {
                setUrlData("cenyzola/today")
                generate()
            }}
            ></Button>
            <Button
            title='Get gold'
            onPress={() => {
                generate()
            }}
            ></Button>
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

export default Gold;