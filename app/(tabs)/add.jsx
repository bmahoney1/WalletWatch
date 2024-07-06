import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView, Text, Button, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { collectData } from "../../lib/appwrite";


const ExcelSheet = () => {
  const [data, setData] = useState(Array(20).fill(['', '']));

  const handleInputChange = (value, rowIndex, colIndex) => {
    const newData = [...data]; // This will copy the first dimension of the array
    newData[rowIndex] = [...newData[rowIndex]]; // This will copy the specific row
    newData[rowIndex][colIndex] = value; // This puts the value in the exact cell
    setData(newData);
  };

  const handleSubmit = async () => {
    firstColumnValues = data.map(row => row[0])
    secondColumnValues = data.map(row => row[1])    
    await collectData(firstColumnValues,secondColumnValues)
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.centerContainer}>
        <Text style={styles.title}>Weekly Expenses</Text>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.headerCell}>
              <Text style={styles.headerText}>Expense</Text>
            </View>
            <View style={styles.headerCell}>
              <Text style={styles.headerText}>Amount</Text>
            </View>
          </View>
          {data.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              <TextInput
                style={styles.cell}
                value={row[0]}
                onChangeText={(text) => handleInputChange(text, rowIndex, 0)}
                placeholder="Enter expense"
              />
              <TextInput
                style={styles.cell}
                value={row[1]}
                onChangeText={(text) => handleInputChange(text, rowIndex, 1)}
                keyboardType="numeric"
                placeholder="Enter amount"
              />
            </View>
          ))}
        </View>
        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  centerContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  container: {
    padding: 10,
    flexDirection: 'column',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  cell: {
    borderWidth: 1,
    borderColor: '#000',
    width: 150,
    height: 40,
    textAlign: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  headerCell: {
    borderWidth: 1,
    borderColor: '#000',
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d0d0d0',
  },
  headerText: {
    fontWeight: 'bold',
  },
});

export default ExcelSheet;
