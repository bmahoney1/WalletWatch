import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, TouchableOpacity, StyleSheet, TextInput, Button, Text} from "react-native";
import { useState , useEffect} from "react";

import { icons } from "../../constants";
import { collectFinances, signOut, fetchSalary, fetchRent, fetchDebt } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { InfoBox } from "../../components";

const Profile = () => {
  const [placeholder1, setPlaceholder1] = useState('Enter salary');
  const [placeholder2, setPlaceholder2] = useState('Enter debt');
  const [placeholder3, setPlaceholder3] = useState('Enter rent');
  const [salary, setSalary] = useState('');
  const [rent, setRent] = useState('');
  const [debt, setDebt] = useState('');

  useEffect(() => {
    const getSalary = async () => {
      const fetchedSalary = await fetchSalary();
      if (fetchedSalary !== null) {
        setPlaceholder1(fetchedSalary);
        setSalary(fetchedSalary)
      }
    };

    getSalary();
  }, []);

  useEffect(() => {
    const getRent = async () => {
      const fetchedRent = await fetchRent();
      if (fetchedRent !== null) {
        setPlaceholder3(fetchedRent);
        setRent(fetchedRent)
      }
    };

    getRent();
  }, []);

  useEffect(() => {
    const getDebt = async () => {
      const fetchedDebt = await fetchDebt();
      if (fetchedDebt !== null) {
        setPlaceholder2(fetchedDebt);
        setDebt(fetchedDebt)
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

  //const [salary, setSalary] = useState(placeholder1);
  // const [rent, setRent] = useState('');
  // const [debt, setDebt] = useState('');

  const handleSalaryChange = (value_salary) => {
    //const newSalary = [...salary]; // This will copy the first dimension of the array
    newSalary= value_salary; // This puts the value in the exact cell
    setSalary(newSalary);
  };
  const handleRentChange = (value_rent) => {
    //const newSalary = [...salary]; // This will copy the first dimension of the array
    newRent= value_rent; // This puts the value in the exact cell
    setRent(newRent);
  };
  const handleDebtChange = (value_debt) => {
    //const newDebt = [...debt]; // This will copy the first dimension of the array
    newDebt= value_debt; // This puts the value in the exact cell
    setDebt(newDebt);
  };

  const handleSubmit = async () => {   
    await collectFinances(salary, rent, debt)
  };

  return (
    <SafeAreaView style = {{backgroundColor:"white", height:'100%'}}>
      <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
        <TouchableOpacity
          onPress={logout}
          className="flex w-full items-end mb-10"
        >
          <Image
            source={icons.logout}
            resizeMode="contain"
            className="w-6 h-6"
          />
        </TouchableOpacity>

        <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
          <Image
            source={{ uri: user?.avatar }}
            resizeMode="cover"
            style = {{width:125, height:125, borderRadius:10, marginBottom:10}}
          />
        </View>

        <InfoBox
          title={user?.username}
          containerStyles="mt-5"
          titleStyles={{color:"black", fontSize:40, fontWeight: '700', paddingTop:20}}
        />

        <View >
          <View  style = {styles.sub}>
            <Text style = {styles.subtitle1} >
              Salary:
            </Text>
            <TextInput
              style={styles.cell}
              value={salary}
              onChangeText={(text) => handleSalaryChange(text)}
              eyboardType="numeric"
              placeholder= {placeholder1+'k'}
            />
          </View>
          <View  style = {styles.sub}>
            <Text style = {styles.subtitle2} >
              Rent:
            </Text>
            <TextInput
              style={styles.cell}
              value={rent}
              onChangeText={(text) => handleRentChange(text)}
              eyboardType="numeric"
              placeholder= {placeholder3+'k'}
            />
          </View>
          <View style = {styles.sub}>
            <Text style = {styles.subtitle2}>
              Debt:
            </Text>
            <TextInput
              style={styles.cell}
              value={debt}
              onChangeText={(text) => handleDebtChange(text)}
              keyboardType="numeric"
              placeholder={placeholder2 +'k'}
            />
          </View>
        </View>
      </View>
      <Button title="Update" onPress={handleSubmit} />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle1:{
    color: 'green',
    fontSize:30,
    textAlign:'center',
    paddingTop:10,
    paddingBottom:2,
  },
  subtitle2:{
    color: 'red',
    fontSize:30,
    textAlign:'center',
    paddingTop:10,
    paddingBottom:2,
  },
  container: {
    padding: 10,
    flexDirection: 'column',
    alignSelf: 'center',
  },
  cell: {
    borderWidth: 1,
    borderColor: '#000',
    width: 200,
    height: 50,
    textAlign: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
    fontSize:25
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


