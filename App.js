import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import BorrowScreen from './screens/BorrowScreen';
import ProfileScreen from './screens/ProfileScreen';
import NontiScreen from './screens/NontiScreen';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbMY99C-WlWulAhEfp2nN2VzYo2L-5Tmc",
  authDomain: "reactna-bdde6.firebaseapp.com",
  projectId: "reactna-bdde6",
  storageBucket: "reactna-bdde6.appspot.com",
  messagingSenderId: "575880627115",
  appId: "1:575880627115:web:09b1d41b24b80a1ccf48ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
      </View>
      <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
      </Text>
    </View>
  );
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Define BottomTabs for Home, Booking, Profile
const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="black" />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Nonti"
        component={NontiScreen}
        options={{
          tabBarLabel: "Nonti",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="notifications-sharp" size={24} color="black" />
            ) : (
              <Ionicons name="notifications-outline" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color="black" />
            ) : (
              <Ionicons name="person-outline" size={24} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

// Main App Component
export default App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    try {
      if (user) {
        await signOut(auth);
      } else {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // Show BottomTabs when user is logged in
          <>
            <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
            <Stack.Screen name="Home">
              {(props) => <HomeScreen {...props} handleLogout={handleLogout} />}
            </Stack.Screen>
            <Stack.Screen name="Booking" component={BookingScreen} />
            <Stack.Screen name="Borrow" component={BorrowScreen} />
          </>
        ) : (
          // Show AuthScreen when user is not logged in
          <Stack.Screen name="Auth">
            {(props) => (
              <AuthScreen
                {...props}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                handleAuthentication={handleAuthentication}
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
  
};



const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
    marginTop: 10,
  },
});
