import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import {  sparkingasia_logo } from '../../../../utils/Images';
import { AppColors } from '../../../../utils/DesignSystem';
import { CustomText } from '../../../../components';
const Splash = () => {
  return (
    <View style={[styles.container,{backgroundColor:AppColors.themeColor}]}>
      <View style={styles.logoContainer}>
        <Image resizeMode="contain" source={sparkingasia_logo} style={styles.icon} />
        <CustomText size={28} color={AppColors.white} textTitle='Sparking Asia'/>
        <CustomText size={30} color={AppColors.white}textTitle='Resturant Management'/>
      
      </View>

      <ActivityIndicator style={styles.loader} size="large" color={AppColors.white} />
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
   
  },
  loader: {
    position: 'absolute',
    bottom: 30, 
    alignSelf: 'center',
  },
});
