import { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../App';

const Convertor = ({ navigation, route }) => {
    // component properties.
    const [loading, setLoading] = useState(true);
    // convertor properties.
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');
    const [inputCurrency, setInputCurrency] = useState('CAD');
    const [outputCurrency, setOutputCurrency] = useState('USD');
    // API properties.
    const [no, setNo] = useState('');
    const [rates, setRates] = useState([]);
    const [table, setTable] = useState('A');
    const [effectiveDate, setEffectiveDate] = useState('');
    const [availableDates, setAvailableDates] = useState([]);
    const [inputDate, setInputDate] = useState('');

    // fetch currency rates from API.
    useEffect(() => {
        const fetchRates = async () => {
            setLoading(true);
            try {
                // fetch API data.
                const response = await fetch(`https://api.nbp.pl/api/exchangerates/tables/${table}/?format=json`);
                const data = await response.json();

                // get available dates.
                const dates = data.map(item => item.effectiveDate);
                setAvailableDates(dates);

                // set default date to latest date from API.
                setEffectiveDate(dates[0]);
                setInputDate(dates[0]); // default date for TextInput.

                // API properties.
                setNo(data[0].no);
                setRates(data[0].rates);

                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        fetchRates();
    }, [table]); // refreshes when any value in this array changes.

    // whenever date changes, update the properties.
    const handleDateChange = async (value) => {
        setInputDate(value);

        try { // check if date is available within the API.
            const response = await fetch(`https://api.nbp.pl/api/exchangerates/tables/${table}/${value}/?format=json`);
            const data = await response.json();

            // if table for selected date exists, update properties.
            if (data && data[0]) {
                const ratesData = data[0].rates;
                setEffectiveDate(value);
                setRates(data[0].rates)
            } else {
                console.log("ERROR: Date not found.");
                setRates([]); // clear rates.
            }
        } catch (error) {
            console.error(error);
            console.log("ERROR: Invalid date format.");
            setRates([]); // clear rates.
        }
    }

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
            {/* select date */}
            <Text>Date Selected:</Text>
            <TextInput
                placeholder="YYYY-MM-DD"
                value={inputDate}
                onChangeText={handleDateChange}
            />

            {/* <Text>Date: {effectiveDate}</Text> */}
            <Text>Table ID: {no}</Text>

            {/* Body: */}
            {/* select table. */}
            <Text>Table Selected:</Text>
            <Picker
                style={{ height: 75, width: '75%' }}
                selectedValue={table}
                onValueChange={(value) => setTable(value)}
            >
                <Picker.Item
                    label='Table A'
                    value='A'
                />

                <Picker.Item
                    label='Table B'
                    value='B'
                />

                <Picker.Item
                    label='Table C'
                    value='C'
                />
            </Picker>


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
                        label={`${rate.code} ($${rate.mid}) - ${rate.currency}`}
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
                        label={`${rate.code} ($${rate.mid}) - ${rate.currency}`}
                        key={rate.code}
                        value={rate.code}
                    />
                ))}
            </Picker>
        </View>
    )
}

export default Convertor;