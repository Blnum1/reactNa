import React from 'react';
import { View, Text, Button, StyleSheet,TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation, handleLogout }) => {
  return (
    <View style={styles.authContainer}>

      <Text style={styles.title}>Ku music</Text>

      <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.bookingButton}
        onPress={() => navigation.navigate('Booking')}
      >
        <Text style={styles.buttonText}>Go to Booking</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={styles.borrowButton}
          onPress={() => navigation.navigate('Borrow')}
        >
          <Text style={styles.buttonText}>Borrow</Text>
        </TouchableOpacity>
        </View>
      
        <TouchableOpacity
          style={[styles.logoutButton]} // Optional styling for logout button
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        
      
    </View>
  );
};

const styles = StyleSheet.create({
    authContainer: {
      flex: 1,
      justifyContent: 'flex-start',
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
    buttonContainer: {
        flexDirection: 'row', // Align buttons horizontally
        justifyContent: 'space-between', // Space between buttons
        
        marginBottom: 10, // Space below the button container
      },
      bookingButton: {
        flex: 1, // Take equal space
        height: 100,
        paddingLeft: 16,
        paddingTop: 16,
        backgroundColor: '#3498db',
        borderRadius: 4,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginRight: 10, // Increased space between booking and borrow buttons
    },
    
    borrowButton: {
        flex: 1, // Take equal space
        height: 100,
        paddingLeft: 16,
        paddingTop: 16,
        backgroundColor: '#2ecc71', // Different color for the borrow button
        borderRadius: 4,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    buttonText: {
      color: '#fff', // Text color
      fontSize: 16, // Font size
    },
    logoutButton: {
        width: '100%', // Full width
        padding: 16, // Padding for the button
        backgroundColor: '#e74c3c', // Background color for Logout button
        borderRadius: 4, // Rounded corners
        alignItems: 'center', // Center align text
      },
  });

export default HomeScreen;