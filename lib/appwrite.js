import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";
import {Alert} from "react-native";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.walletwatch",
  projectId: "6685dc4b003008e0e4b3",
  storageId: "6685de9a0008a2a07aa8",
  databaseId: "6685dd7a00103c8e00b3",
  userCollectionId: "6685dd990031e4506e25",
  weeklyExpensesCollectionId:"6686cc080021b4549ede",
  financesCollectionId:"66881759001a083521ff"
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// This function gets the salary from the backend
export async function fetchSalary() {
  const user = await account.get(); // this gets the current user

  try {
    const userId = user.$id; // this gets the users id
    const response = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.financesCollectionId, [
        Query.equal("account", userId)
    ]); // this gets all the documents in the finances collection that has an "account" value the same as userId
    return response.documents[0].salary; // this then indexed into those list of collections, taking the first one and then returning the value associated with salary
  } catch (error) {
    console.error('Error fetching salary:', error);
  }
}

export async function fetchSavings() {
  const user = await account.get(); // this gets the current user

  try {
    const userId = user.$id; // this gets the users id
    const response = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.financesCollectionId, [
        Query.equal("account", userId)
    ]); // this gets all the documents in the finances collection that has an "account" value the same as userId
    return response.documents[0].savings; // this then indexed into those list of collections, taking the first one and then returning the value associated with salary
  } catch (error) {
    console.error('Error fetching savings:', error);
  }
}

export async function fetchRent() {
  const user = await account.get(); // this gets the current user

  try {
    const userId = user.$id; // this gets the users id
    const response = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.financesCollectionId, [
        Query.equal("account", userId)
    ]); // this gets all the documents in the finances collection that has an "account" value the same as userId
    return response.documents[0].rent; // this then indexed into those list of collections, taking the first one and then returning the value associated with salary
  } catch (error) {
    console.error('Error fetching rent:', error);
  }
}

export async function fetchDebt() {
  const user = await account.get(); // this gets the current user

  try {
    const userId = user.$id; // this gets the users id
    const response = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.financesCollectionId, [
        Query.equal("account", userId)
    ]); // this gets all the documents in the finances collection that has an "account" value the same as userId
    return response.documents[0].debt; // this then indexed into those list of collections, taking the first one and then returning the value associated with salary
  } catch (error) {
    console.error('Error fetching debt:', error);
  }
}

// This will be used to make the add tab able to save an incomplete entry. I was thinking adding an atribute of "save" and setting it to one if the user clicked save instead of submit
export async function fetchSavedWeekly() {
  const user = await account.get(); // this gets the current user

  try {
    const userId = user.$id; // this gets the users id
    const response = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.weeklyExpensesCollectionId, [
        Query.equal("account", userId)
    ]); // this gets all the documents in the finances collection that has an "account" value the same as userId
    return response.documents[0].debt; // this then indexed into those list of collections, taking the first one and then returning the value associated with salary
  } catch (error) {
    console.error('Error fetching debt:', error);
  }
}

// Find out how much is spent on each expense
export async function fetchIndivExpenses() {
  const user = await account.get(); // this gets the current user

  try {
    const userId = user.$id; // this gets the user's id
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.weeklyExpensesCollectionId,
      [Query.equal("account", userId)]
    ); // this gets all the documents in the weeklyExpenses collection that has an "account" value the same as userId

    const aggregatedExpenses = {}; // this creates a key value object

    // Iterate through each document to aggregate expenses
    for (let i = 0; i < response.documents.length; i++) {
      const expenseArray = response.documents[i].expense; // Assuming this is an array of expense types
      const amountArray = response.documents[i].amount; // Assuming this is an array of amounts as strings

      for (let j = 0; j < expenseArray.length; j++) {
        const expenseType = expenseArray[j];
        const amount = parseFloat(amountArray[j]);
        if (expenseType != ""){
          if (!aggregatedExpenses[expenseType]) {
            aggregatedExpenses[expenseType] = 0;
          }

          aggregatedExpenses[expenseType] += amount;
        }
      }
    }

    // Convert the aggregated expenses object to a 2D array
    const resultArray = Object.entries(aggregatedExpenses);

    resultArray.sort((a, b) => b[1] - a[1]); // This goes through and compares each of the second elements in the 2d array, which are the amounts for the expenses

    return resultArray;

  } catch (error) {
    console.error('Error fetching individual expenses:', error);
    return [];
  }
}


// This collects the data for the weekly expenses and then submits the document to the weekly expenses collection along with the corresponding userId
export async function collectData(expense, amount) {
  const user = await account.get(); // Gets the current user account
  try {
    // Create a document in the Appwrite database
    const response = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.weeklyExpensesCollectionId,
      ID.unique(),
      { expense:expense,
        amount:amount,
        account:user.$id
      }
    );
    console.log('Document created:', response);
    Alert.alert('Success', 'Expenses saved successfully'); // This pops up when done
  } catch (error) {
    console.error('Error creating document:', error);
    Alert.alert('Error', 'Failed to save expenses');
  }
};

// This is used to originally create the finances for the user, setting it to blank (need to do the same for the weekly expenses)
export async function createFinances(salary, savings, rent, debt) {
  const user = await account.get();
  try {
    // Create a document in the Appwrite database
    const response = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.financesCollectionId,
      ID.unique(),
      { salary:salary,
        savings:savings,
        rent:rent,
        debt:debt,
        account:user.$id
      }
    );
    console.log('Document created:', response);
    Alert.alert('Success', 'Finances saved successfully');
  } catch (error) {
    console.error('Error creating document:', error);
    Alert.alert('Error', 'Failed to save finances');
  }
};

export async function collectFinances(salary, savings, rent, debt) {
  const user = await account.get(); //this gets the current user
  
  try {
    const userId = user.$id; // gets the id

    // This gets the document already there
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.financesCollectionId,
      [Query.equal('account', userId)]
    );

    if (response.documents.length > 0) { // makes to sure there is more than one document
      const documentId = response.documents[0].$id; // Gets the document ID

      // Updates the existing document
      const updateResponse = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.financesCollectionId,
        documentId,
        { salary: salary, savings:savings, rent:rent, debt: debt }
      );

      console.log('Document updated:', updateResponse);
      Alert.alert('Success', 'Finances updated successfully');
    } else {
      console.log('No document found for this user.');
      Alert.alert('Error', 'No existing finances document found for this user.');
    }
  } catch (error) {
    console.error('Error updating document:', error);
    Alert.alert('Error', 'Failed to update finances');
  }
}

// Register user
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    salary = ''
    savings = ''
    rent = ''
    debt = ''
    createFinances(salary, savings, rent, debt)

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export async function fetchTotalExpenses() {
  const user = await account.get(); // this gets the current user

  try {
    const userId = user.$id; // this gets the users id
    const response = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.weeklyExpensesCollectionId, [
        Query.equal("account", userId)
    ]); // this gets all the documents in the finances collection that has an "account" value the same as userId

    let totalExpenses = 0;
    for (let i = 0; i < response.documents.length; i++) {
      const amountsArray = response.documents[i].amount; // Assuming this is an array of strings
      for (let j = 0; j < amountsArray.length; j++) {
        if (amountsArray[j] != ""){
          totalExpenses += parseFloat(amountsArray[j]);
        }
      }
    }

    return totalExpenses;
  } catch (error) {
    console.error('Error fetching expenses:', error);
  }
  
}

// Use this to calculate the avg monthly expenses
export async function fetchTotalWeeklySubmitted() {
  const user = await account.get(); // this gets the current user

  try {
    const userId = user.$id; // this gets the users id
    const response = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.weeklyExpensesCollectionId, [
        Query.equal("account", userId)
    ]); // this gets all the documents in the finances collection that has an "account" value the same as userId

    return response.documents.length
  } catch (error) {
    console.error('Error fetching documents:', error);
  }
}


