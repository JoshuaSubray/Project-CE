import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../App';

const Table = ({ navigation, route }) => {
  const [table, setTable] = useState('A');
  const [rates, setRates] = useState([]);
  const [inputDate, setInputDate] = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRates = async () => {
    setLoading(true);
    try {
      const url = inputDate
        ? `https://api.nbp.pl/api/exchangerates/tables/${table}/${inputDate}/?format=json`
        : `https://api.nbp.pl/api/exchangerates/tables/${table}/?format=json`;
      const response = await fetch(url);
      const data = await response.json();

      if (data && data[0]) {
        setRates(data[0].rates);
        setAvailableDates(data.map(item => item.effectiveDate));
        if (!inputDate) setInputDate(data[0].effectiveDate);
      } else {
        setRates([]);
      }
    } catch (error) {
      console.error(error);
      setRates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, [table, inputDate]);

  const filteredRates = rates.filter(rate =>
    rate.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rate.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Currency Table Viewer</Text>
      <Picker
        selectedValue={table}
        onValueChange={(value) => setTable(value)}
        style={styles.picker}
      >
        <Picker.Item label="Table A" value="A" />
        <Picker.Item label="Table B" value="B" />
        <Picker.Item label="Table C" value="C" />
      </Picker>
      <TextInput
        style={styles.searchBar}
        placeholder="YYYY-MM-DD"
        value={inputDate}
        onChangeText={(value) => setInputDate(value)}
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Search by currency or code"
        value={searchTerm}
        onChangeText={(value) => setSearchTerm(value)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={filteredRates}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.listText}>{`Currency: ${item.currency}`}</Text>
              <Text style={styles.listText}>{`Code: ${item.code}`}</Text>
              {table === 'C' ? (
                <>
                  <Text style={styles.listText}>{`Bid Rate: ${item.bid}`}</Text>
                  <Text style={styles.listText}>{`Ask Rate: ${item.ask}`}</Text>
                </>
              ) : (
                <Text style={styles.listText}>{`Rate: ${item.mid}`}</Text>
              )}
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No data found for the selected date or search term.</Text>}
        />
      )}
    </View>
  );
};

export default Table;
