import { StyleSheet, Text, TouchableOpacity, View, Image,Alert } from 'react-native';
import React from 'react';
import { AppColors, AppFont } from '../../utils/DesignSystem';
import { LogoutBtnSvg } from '../../assets/svgs/svg';
import { sparkingasia_logo } from '../../utils/Images';

const HomeHeader = ({ onLogout, username = "Ali Raza" }) => {
 
  return (
    <View style={styles.headerContainer}>
      {/* Left: Logo + Welcome Text */}
      <View style={styles.leftContainer}>
        <Image source={sparkingasia_logo} style={styles.logo} resizeMode="contain" />
        <View>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.usernameText}>{username}</Text>
        </View>
      </View>

      {/* Right: Logout Button */}
      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <LogoutBtnSvg width={24} height={24} fill={AppColors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  welcomeText: {
    fontSize: 14,
    fontFamily: AppFont.primaryFont,
    color: AppColors.gray,
  },
  usernameText: {
    fontSize: 16,
    fontFamily: AppFont.primaryFont,
    color: AppColors.black,
  },
  // logoutButton: {
  //   // backgroundColor: AppColors.orange,
  //   paddingHorizontal: 12,
  //   paddingVertical: 8,
  // },
});
