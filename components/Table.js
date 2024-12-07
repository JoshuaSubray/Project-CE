import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f8f9fa',
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#212529',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   picker: {
//     height: 50,
//     marginBottom: 20,
//     backgroundColor: '#e9ecef',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//   },
//   searchBar: {
//     height: 40,
//     borderColor: '#ced4da',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     backgroundColor: '#ffffff',
//   },
//   listItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#dee2e6',
//     backgroundColor: '#f8f9fa',
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   listText: {
//     fontSize: 16,
//     color: '#495057',
//   },
//   emptyText: {
//     textAlign: 'center',
//     fontSize: 16,
//     color: '#6c757d',
//     marginTop: 20,
//   },
// });

export default Table;
