import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Table = ({ navigation, route }) => {
  const [table, setTable] = useState('A');
  const [rates, setRates] = useState([]);
  const [inputDate, setInputDate] = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data based on selected table and date
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

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Currency Table Viewer</Text>

      {/* Table Picker */}
      <Picker
        selectedValue={table}
        onValueChange={(value) => setTable(value)}
        style={styles.picker}
      >
        <Picker.Item label="Table A" value="A" />
        <Picker.Item label="Table B" value="B" />
        <Picker.Item label="Table C" value="C" />
      </Picker>

      {/* Date Input */}
      <TextInput
        style={styles.searchBar}
        placeholder="YYYY-MM-DD"
        value={inputDate}
        onChangeText={(value) => setInputDate(value)}
      />

      {/* Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={rates}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.listText}>{`Currency: ${item.currency}`}</Text>
              <Text style={styles.listText}>{`Code: ${item.code}`}</Text>
              <Text style={styles.listText}>{`Rate: ${item.mid}`}</Text>
            </View>
          )}
          ListEmptyComponent={<Text>No data found for the selected date.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listText: {
    fontSize: 16,
  },
});

export default Table;
