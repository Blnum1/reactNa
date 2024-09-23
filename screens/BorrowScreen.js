import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BorrowScreen = () => {
    return (
      <View style={styles.authContainer}>
        <Text style={styles.title}>Borrow Here</Text>
        {/* Booking system will go here */}
      </View>
    );
  };
  const styles = StyleSheet.create({
    authContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  });

  export default BorrowScreen;