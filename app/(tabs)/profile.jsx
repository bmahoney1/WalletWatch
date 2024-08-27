import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, TouchableOpacity, StyleSheet, TextInput, Button, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState, useEffect } from "react";
import { icons } from "../../constants";
import { collectFinances, signOut, fetchSalary, fetchRent, fetchDebt, fetchSavings } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { InfoBox } from "../../components";

const Profile = () => {
  const [placeholder1, setPlaceholder1] = useState('Enter salary');
  const [placeholder2, setPlaceholder2] = useState('Enter debt');
  const [placeholder3, setPlaceholder3] = useState('Enter rent');
  const [placeholder4, setPlaceholder4] = useState('Enter savings');
  const [salary, setSalary] = useState('');
  const [rent, setRent] = useState('');
  const [debt, setDebt] = useState('');
  const [savings, setSavings] = useState('');

  useEffect(() => {
    const getSalary = async () => {
      const fetchedSalary = await fetchSalary();
      if (fetchedSalary !== null) {
        setPlaceholder1(fetchedSalary);
        setSalary(fetchedSalary);
      }
    };

    getSalary();
  }, []);

  useEffect(() => {
    const getSavings = async () => {
      const fetchedSavings = await fetchSavings();
      if (fetchedSavings !== null) {
        setPlaceholder4(fetchedSavings);
        setSavings(fetchedSavings);
      }
    };

    getSavings();
  }, []);

  useEffect(() => {
    const getRent = async () => {
      const fetchedRent = await fetchRent();
      if (fetchedRent !== null) {
        setPlaceholder3(fetchedRent);
        setRent(fetchedRent);
      }
    };

    getRent();
  }, []);

  useEffect(() => {
    const getDebt = async () => {
      const fetchedDebt = await fetchDebt();
      if (fetchedDebt !== null) {
        setPlaceholder2(fetchedDebt);
        setDebt(fetchedDebt);
      }
    };

    getDebt();
  }, []);

  const { user, setUser, setIsLogged } = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  const handleSalaryChange = (value) => {
    setSalary(value);
  };

  const handleSavingsChange = (value) => {
    setSavings(value);
  };

  const handleRentChange = (value) => {
    setRent(value);
  };

  const handleDebtChange = (value) => {
    setDebt(value);
  };

  const handleSubmit = async () => {
    await collectFinances(salary, savings, rent, debt);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Image source={icons.logout} resizeMode="contain" style={styles.logoutIcon} />
          </TouchableOpacity>
          <Image source={{ uri: user?.avatar }} style={styles.avatar} />
          <InfoBox
            title={user?.username}
            containerStyles={styles.infoBox}
            titleStyles={styles.infoBoxTitle}
          />
        </View>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Salary:</Text>
            <TextInput
              style={styles.input}
              value={salary}
              onChangeText={handleSalaryChange}
              keyboardType="numeric"
              placeholder={`${placeholder1}`}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Savings:</Text>
            <TextInput
              style={styles.input}
              value={savings}
              onChangeText={handleSavingsChange}
              keyboardType="numeric"
              placeholder={`${placeholder4}`}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Rent:</Text>
            <TextInput
              style={styles.input}
              value={rent}
              onChangeText={handleRentChange}
              keyboardType="numeric"
              placeholder={`${placeholder3}`}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Debt:</Text>
            <TextInput
              style={styles.input}
              value={debt}
              onChangeText={handleDebtChange}
              keyboardType="numeric"
              placeholder={`${placeholder2}`}
            />
          </View>
          <Button title="Update" onPress={handleSubmit} color="#4CAF50" />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logoutButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  logoutIcon: {
    width: 24,
    height: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  infoBox: {
    marginTop: 10,
  },
  infoBoxTitle: {
    color: '#000',
    fontSize: 24,
    fontWeight: '700',
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    backgroundColor: '#f9f9f9',
  },
});
