import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fetchSalary } from '../lib/appwrite'; // Adjust the import based on your project structure
import { router } from 'expo-router'; // Adjust the import based on your project structure

const Income = () => {
  const [salary, setsalary] = useState(0);
  const [yearlySalary, setYearlySalary] = useState(0);
  const [monthlySalary, setMonthlySalary] = useState(0);
  const [weeklySalary, setWeeklySalary] = useState(0);

  useEffect(() => {
    const getSalary = async () => {
      const gotsalary = await fetchSalary();
      const newSalary = 1*gotsalary
      const yearlySalaryAfterTaxes = (gotsalary) * 0.7; // 12 months and 30% tax deduction
      const monthlySalaryAfterTaxes = yearlySalaryAfterTaxes / 12;
      const weeklySalaryAfterTaxes = yearlySalaryAfterTaxes / 52;
      setsalary(newSalary)
      setYearlySalary(yearlySalaryAfterTaxes);
      setMonthlySalary(monthlySalaryAfterTaxes);
      setWeeklySalary(weeklySalaryAfterTaxes);
    };

    getSalary();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Income</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Yearly Salary:</Text>
          <Text style={styles.infoValue}>${salary.toFixed(2)}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Yearly Salary after Taxes:</Text>
          <Text style={styles.infoValue}>${yearlySalary.toFixed(2)}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Monthly Salary after Taxes:</Text>
          <Text style={styles.infoValue}>${monthlySalary.toFixed(2)}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Weekly Salary after Taxes:</Text>
          <Text style={styles.infoValue}>${weeklySalary.toFixed(2)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Income;

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
