import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AppColors, AppFont } from '../../utils/DesignSystem';

const HomeCard = ({ name, cuisine, location, rating }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        <Text style={styles.label}>Restaurant name: </Text>
        <Text style={styles.value}>{name}</Text>
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Cuisine: </Text>
        <Text style={styles.value}>{cuisine}</Text>
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Location: </Text>
        <Text style={styles.value}>{location}</Text>
      </Text>
      <Text style={styles.rating}>⭐ {rating || 'N/A'}</Text>
    </View>
  );
};

export default HomeCard;
const styles = StyleSheet.create({
  card: {
    // backgroundColor: AppColors.white,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: AppColors.disabledGreen,
  },
  title: {
    fontSize: 16,
    fontFamily: AppFont.primaryFont,
    marginBottom: 4,
  },
  detail: {
    fontSize: 14,
    fontFamily: AppFont.secondaryFont,
    color: AppColors.textDark,
    marginBottom: 4,
  },
  label: {
    color: AppColors.grayDark, // for labels like "Restaurant name:"
  },
  value: {
    color: AppColors.blue, // different color for values like "KFC"
  },
  rating: {
    fontSize: 14,
    fontFamily: AppFont.medium,
    color: AppColors.orange,
    marginTop: 6,
  },
});

