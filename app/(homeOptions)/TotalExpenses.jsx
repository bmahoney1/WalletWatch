import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fetchIndivExpenses } from '../../lib/appwrite'; // Adjust the import based on your project structure
import { router } from "expo-router";



const TotalExpenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const getExpenses = async () => {
      const fetchedExpenses = await fetchIndivExpenses();
      setExpenses(fetchedExpenses);
    };

    getExpenses();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Total Expenses Breakdown</Text>
        {expenses.map(([expenseType, amount], index) => (
          <View key={index} style={styles.expenseRow}>
            <Text style={styles.expenseType}>{expenseType}</Text>
            <Text style={styles.expenseAmount}>${amount}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TotalExpenses;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: '#007BFF',
  },
  expenseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  expenseType: {
    fontSize: 18,
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});
