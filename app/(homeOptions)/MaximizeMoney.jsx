import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router'; // Adjust the import based on your project structure

const MaxMoney = () => {

  return (
    <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Select an option</Text>
            <TouchableOpacity onPress={() => router.back()} style={styles.infoBox}>
                <Text style={styles.infoTitle}>Invest In Stock Market</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.back()} style={styles.infoBox}>
                <Text style={styles.infoTitle}>High Yield Savings Options</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.back()} style={styles.infoBox}>
                <Text style={styles.infoTitle}>Debt Payment Options</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.back()} style={styles.infoBox}>
                <Text style={styles.infoTitle}>Invest In Stock Market</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.back()} style={styles.infoBox}>
                <Text style={styles.infoTitle}>Invest In Stock Market</Text>
            </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  );
};

export default MaxMoney;

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
