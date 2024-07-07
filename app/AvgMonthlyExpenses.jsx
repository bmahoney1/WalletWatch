import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fetchTotalWeeklySubmitted, fetchTotalExpenses } from '../lib/appwrite'; // Adjust the import based on your project structure
import { router } from 'expo-router'; // Adjust the import based on your project structure

const AvgMonthlyExpenses = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [numDocuments, setNumDocuments] = useState(0);

  useEffect(() => {
    const getExpensesData = async () => {
      const totalDocs = await fetchTotalWeeklySubmitted();
      const totalAmount = await fetchTotalExpenses();
      setNumDocuments(totalDocs);
      setTotalExpenses(totalAmount);
    };

    getExpensesData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Average Monthly Expenses</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Number of Weekly Expenses Submissions:</Text>
          <Text style={styles.infoValue}>{numDocuments}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Total Amount of Expenses:</Text>
          <Text style={styles.infoValue}>${totalExpenses.toFixed(2)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AvgMonthlyExpenses;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: '#007BFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoBox: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    color: '#333',
  },
  infoValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});
