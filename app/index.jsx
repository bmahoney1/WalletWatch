import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView style = {styles.background}>
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View style = {styles.logo_back}>
          <Text style = {styles.logo}>
              WW
          </Text>
        </View>
        <View style = {styles.container}>
          
          <Text style = {styles.title}>
            Welcome to <Text style = {styles.wallet}>WalletWatch</Text>
          </Text>

          <Text style = {styles.subtitle}>
            It is time you become financially free using WalletWatch!
          </Text>

          <CustomButton
            title="Continue to Sign In"
            handlePress={() => router.push("/sign-in")}
            containerStyles= {styles.button_container}
            textStyles = {styles.button_text}
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  logo_back:{
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    backgroundColor:'gray',
    width:150,
    height:150,
    borderRadius: '50%',
    marginTop:50,
  },
  logo:{
    color:'green',
    textAlign:'center',
    fontSize:75
  },
  container:{
    marginTop:100,
  },  
  background:{
    backgroundColor: "black",
  },
  title:{
    fontSize: 50,
    color:"gray",
    textAlign:"center",
  },
  subtitle:{
    fontSize:20,
    color:"gray",
    textAlign:"center",
    marginTop:40,
  },
  wallet:{
    color:"green",
  },
  button_container:{
    alignSelf:'center',
    backgroundColor:"green",
    width: 300,
    alignItems:'center',
    marginTop:40,
    borderRadius:10,
    height:50,
    justifyContent:'center'
  },
  button_text:{
    color:"black",
    fontSize:30,
  }

})
