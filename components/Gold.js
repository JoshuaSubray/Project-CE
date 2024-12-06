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
    const [loading, setLoading] = useState(true);
    const url = `https://api.nbp.pl/api/${urlData}`

    useEffect(() => {
        const fetchGoldRates = async () => {
            try {
                // console.log("date: "+Intl.DateTimeFormat("ja-jp", {
                //     dateStyle: "short",
                // }).format(new Date()).replace('/', '-').replace('/', '-'))
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

    const dataFromApi = async () => {
        //const url = `https://api.nbp.pl/api/${urlData}`
        console.log("url: " + url)
        try {
            const response = await fetch(url)
            console.log("url: " + url)
            if (!response.ok) {
                throw new Error(response.status);
            }
            const data = response.json()
            setGoldData(data)
            setloading(false)
            console.log(data)
            //console.log(data.CenaZlota.date)
            return data
        } catch (error) {
            console.log("Error: " + error)
        }
    }
    const generate = () => {
        fetchGoldTimeline();
        // const fetchGoldTimeline = async() => {
        //     try {
        //     const response = await fetch(`https://api.nbp.pl/api/cenyzlota/${start}/${end}/?format=json`);
        //     const data = await response.json();
        //     setGoldData(data);
        //         console.log(goldData)
        //         setLoading(false);
        //     } catch (error) {
        //         console.error(error);
        //         setLoading(false);
        //     }
        // }
        //fetchGoldTimeline()
        // return(
        //     <View style={styles.container}>
        //         <Text>Date: {goldData.data}</Text>
        //         <Text>Price: {goldData.cena}</Text>
        //     </View>
        // )
        //console.log("url: "+url)
        //navigation.navigate('Gold')
        //console.log("data "+urlData)
        // navigation.navigate('GoldList', { start: start, end: end })
    }
    // const list = () => {
    //     return (
    //         <View style={styles.container}>
    //             <FlatList
    //                 data={goldData}
    //                 keyExtractor={({ data }) => data.toString()}
    //                 renderItem={({ item }) => (
    //                     <View>
    //                         <Text>Date: {item.CenaZlota.data}</Text>
    //                         <Text>Price for 1 gram of gold: {item.CenaZlota.cena}</Text>
    //                     </View>
    //                 )}
    //             ></FlatList>
    //         </View>
    //     )
    // }
    // useEffect(() => {
    //     dataFromApi()
    //     list()
    // }, [urlData])

    const fetchGoldTimeline = async () => {
        console.log("start: " + start)
        console.log("end: " + end)
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
            {/* <Text>You can press this button to get the gold prices from today</Text> */}
            {/* <Button
                title='Get gold prices form today'
                onPress={() => {
                    setUrlData("cenyzlota/today")
                    generate()
                }}
            ></Button> */}
            <Button
                title='Get gold'
                onPress={() => {
                    generate()
                }}
            ></Button>
            <Text>Current gold price</Text>
            <Text>Date: {goldData.data}</Text>
            <Text>Price: {goldData.cena}</Text>
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

export default Gold;