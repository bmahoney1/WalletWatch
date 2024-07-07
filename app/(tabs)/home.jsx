import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import { fetchTotalExpenses, fetchSalary, fetchTotalWeeklySubmitted } from '../../lib/appwrite';
import { router } from "expo-router";

const HomePage = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [yearlySalary, setYearlySalary] = useState(0);
  const [netAmountNextYear, setNetAmountNextYear] = useState(0);
  const [avgMonthlyExpenses, setAvgMonthlyExpenses] = useState(0);

  useEffect(() => {
    const calculateReports = async () => {
      const expenses = await fetchTotalExpenses();
      const salary = await fetchSalary();
      const weeklyDocs = await fetchTotalWeeklySubmitted();

      const totalExpenses = expenses
      const yearlyExpenses = totalExpenses;
      const netAmount = ((salary*.7)/52)*weeklyDocs - yearlyExpenses;
      
      setAvgMonthlyExpenses((totalExpenses/weeklyDocs)*4)
      setTotalExpenses(totalExpenses);
      setYearlySalary(salary*.7);
      setNetAmountNextYear(netAmount);
    };

    calculateReports();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.mainTitle}>Here is your <Text style = {styles.wallet}>WalletWatch</Text></Text>
        
        <TouchableOpacity style={styles.reportBox} onPress={() => router.push("/TotalExpenses")}>
          <Text style={styles.reportTitle}>Total Expenses</Text>
          <Text style={styles.reportValue}>${totalExpenses.toFixed(2)}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reportBox} onPress={() => router.push("/AvgMonthlyExpenses")}>
          <Text style={styles.reportTitle}>Average Monthly Expenses</Text>
          <Text style={styles.reportValue}>${avgMonthlyExpenses.toFixed(2)}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reportBox} onPress={() => router.push("/Income")}>
          <Text style={styles.reportTitle}>Yearly Salary</Text>
          <Text style={styles.reportValue}>${yearlySalary.toFixed(2)}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reportBox} onPress={() => router.push("/NetMoney")}>
          <Text style={styles.reportTitle}>Net Amount</Text>
          <Text style={styles.reportValue}>${netAmountNextYear.toFixed(2)}</Text>
        </TouchableOpacity>

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
