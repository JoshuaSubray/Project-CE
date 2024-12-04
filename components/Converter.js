import { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../App';
/*TODO:
Since this API also keeps track of the historical exchange rates, the function will also allow a user to select the date of their choice and convert the currencies and have the value at that particular time output.
*/

const Convertor = ({ navigation, route }) => {
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');

    const [inputCurrency, setInputCurrency] = useState('CAD');
    const [outputCurrency, setOutputCurrency] = useState('USD');

    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(true);

    // fetch currency rates from API.
    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await fetch('https://api.nbp.pl/api/exchangerates/tables/A/?format=json');
                const data = await response.json();
                setRates(data[0].rates);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        fetchRates();
    }, []);

    // handle currency conversion.
    const handleConvert = (value) => {
        // find exchange rates for the selected currencies.
        const inputRate = rates.find(rate => rate.code === inputCurrency)?.mid;
        const outputRate = rates.find(rate => rate.code === outputCurrency)?.mid;

        // if found, perform currency conversion.
        if (inputRate && outputRate && inputValue) {
            const convertedValue = ((parseFloat(value) * inputRate) / outputRate).toFixed(2);
            setOutputValue(convertedValue);
        } else { // else, clear output.
            setOutputValue('');
        }
    }

    // if data is loading.
    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" />
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Input: */}
            <Text>Amount to Convert:</Text>
            <TextInput
                placeholder='Enter amount to convert.'
                keyboardType='numeric'
                value={inputValue}
                onChangeText={(value) => {
                    setInputValue(value);
                    handleConvert(value);
                }}
            />

            {/* currency to convert */}
            <Text>Select Input Currency:</Text>
            <Picker
                style={{ height: 75, width: '75%' }}
                selectedValue={inputCurrency}
                onValueChange={(value) => {
                    setInputCurrency(value)
                    handleConvert(inputValue);
                }}
            >
                {/* for-each rate available, create a selectable item. */}
                {rates.map((rate) => (
                    <Picker.Item
                        label={rate.code}
                        key={rate.code}
                        value={rate.code}
                    />
                ))}
            </Picker>

            {/* Output: */}
            <Text>Converted Amount:</Text>
            <TextInput
                placeholder='Converted amount.'
                value={outputValue}
                onChangeText={handleConvert}
                editable={false}
            />

            <Picker
                style={{ height: 75, width: '75%' }}
                selectedValue={outputCurrency}
                onValueChange={(value) => {
                    setOutputCurrency(value)
                    handleConvert(inputValue);
                }}
            >
                {/* for-each rate available, create a selectable item. */}
                {rates.map((rate) => (
                    <Picker.Item
                        label={rate.code}
                        key={rate.code}
                        value={rate.code}
                    />
                ))}
            </Picker>
        </View>
    )
}

export default Convertor;