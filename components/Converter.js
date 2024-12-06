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
    const [inputCurrency, setInputCurrency] = useState('');
    const [outputCurrency, setOutputCurrency] = useState('');
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

                // set default inputCurrency and outputCurrency.
                setInputCurrency(data[0].rates[0].code);
                setOutputCurrency(data[0].rates[1].code);

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

            if (response.ok) {
                const data = await response.json();

                // if table for selected date exists, update properties.
                if (data && data[0]) {
                    const ratesData = data[0].rates;
                    setEffectiveDate(value);
                    setRates(data[0].rates)

                } else {
                    // console.error(`ERROR: Invalid date format.`);
                    console.error(`ERROR: Date unavailable.`);
                    setRates([]); // clear rates.
                }
            } else {
                // console.error(`ERROR: API response failed.`);
                console.error(`ERROR: Date unavailable.`);
                setRates([]); // clear rates.
            }
        } catch (error) {
            console.error(error);
            setRates([]); // clear rates.
        }
    }

    // handle currency conversion.
    useEffect(() => {
        const convertCurrency = () => {
            // find exchange rates for the selected currencies.
            const inputRate = rates.find(rate => rate.code === inputCurrency)?.mid;
            const outputRate = rates.find(rate => rate.code === outputCurrency)?.mid;

            // if found, perform currency conversion.
            if (inputRate && outputRate && inputValue) {
                const convertedValue = ((parseFloat(inputValue) * inputRate) / outputRate).toFixed(2);
                setOutputValue(`$${convertedValue}`);
            } else { // else, clear output.
                setOutputValue('');
            }
        }
        convertCurrency();
    }, [inputCurrency, outputCurrency, inputValue, rates]); // refreshes when any value in this array changes.

    // if data is loading.
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Converter:</Text>

            {/* Date: */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Date: </Text>
                <TextInput
                    style={styles.dateInput}
                    placeholder="YYYY-MM-DD"
                    value={inputDate}
                    onChangeText={handleDateChange}
                />
            </View>

            {/* Table: */}
            <Text style={styles.label}>Table ID: {no}</Text>
            <Picker
                style={styles.picker}
                selectedValue={table}
                onValueChange={(value) => setTable(value)}
            >
                <Picker.Item label='Table A' value='A' />
                <Picker.Item label='Table B' value='B' />
                {/* <Picker.Item label='Table C' value='C'/> */}
            </Picker>

            {/* Input: */}
            <TextInput
                style={styles.textInput}
                placeholder='Enter amount to convert.'
                keyboardType='numeric'
                value={inputValue}
                onChangeText={(value) => setInputValue(value)}
            />

            {/* currency to convert */}
            <Text style={styles.label}>Convert From:</Text>
            <Picker
                style={styles.picker}
                selectedValue={inputCurrency}
                onValueChange={(value) => setInputCurrency(value)}
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

            {/* converted currency. */}
            <Text style={styles.label}>Convert To:</Text>
            <Picker
                style={styles.picker}
                selectedValue={outputCurrency}
                onValueChange={(value) => setOutputCurrency(value)}
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
            <TextInput
                style={styles.resultText}
                placeholder='Converted amount.'
                value={outputValue}
                editable={false}
            />

            {/* summary */}
            <Text style={styles.resultText}> {/* only appears when all parameters are present. */}
                {inputValue && inputCurrency && outputValue && outputCurrency ? (
                    `${inputValue} ${inputCurrency} equals ${outputValue} ${outputCurrency}.`) :
                    null}
            </Text>
        </View>
    )
}

export default Convertor;