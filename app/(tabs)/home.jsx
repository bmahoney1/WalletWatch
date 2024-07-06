import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { fetchMonthlyExpenses, fetchSalary } from '../../lib/appwrite';

const HomePage = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [yearlySalary, setYearlySalary] = useState(0);
  const [netAmountNextYear, setNetAmountNextYear] = useState(0);

  useEffect(() => {
    const calculateReports = async () => {
      const expenses = await fetchMonthlyExpenses();
      const salary = await fetchSalary();

      const totalExpenses = expenses
      const yearlyExpenses = totalExpenses * 12;
      const netAmount = (salary*1000) - yearlyExpenses;

      setMonthlyExpenses(totalExpenses);
      setYearlySalary(salary*1000);
      setNetAmountNextYear(netAmount);
    };

    calculateReports();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.mainTitle}>Here is your <Text style = {styles.wallet}>WalletWatch</Text></Text>
        
        <View style={styles.reportBox}>
          <Text style={styles.reportTitle}>Monthly Expenses</Text>
          <Text style={styles.reportValue}>${monthlyExpenses}</Text>
        </View>

        <View style={styles.reportBox}>
          <Text style={styles.reportTitle}>Yearly Salary</Text>
          <Text style={styles.reportValue}>${yearlySalary}</Text>
        </View>

        <View style={styles.reportBox}>
          <Text style={styles.reportTitle}>Net Amount Next Year</Text>
          <Text style={styles.reportValue}>${netAmountNextYear}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  reportBox: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reportValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  wallet: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  mainTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default HomePage;
