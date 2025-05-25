import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import { mainSplashIcon } from '../../../../utils/Images';
import { AppColors } from '../../../../utils/DesignSystem';
const Splash = () => {
  return (
    <View style={[styles.container,{backgroundColor:AppColors.themeColor}]}>
      <View style={styles.logoContainer}>
        <Image resizeMode="contain" source={mainSplashIcon} style={styles.icon} />
        <Text style={{color:'#FFFFFF', marginTop:10,fontSize:28}}>Friends Loan Manager</Text>
      </View>

      <ActivityIndicator style={styles.loader} size="large" color="#FFFFFF" />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.themeColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 200,
    height: 100,
    tintColor: 'white',
  },
  loader: {
    position: 'absolute',
    bottom: 30, // Adjust as needed
    alignSelf: 'center',
  },
});
