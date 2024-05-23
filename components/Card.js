// Card.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ title }) => {
  return (
    <View style={styles.card} className="w-72">
      <Text className="text-center text-secondary font-pbold mt-1.5" style={styles.cardTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 1,
    margin: 10,
    height: 40,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
  },
});

export default Card;
