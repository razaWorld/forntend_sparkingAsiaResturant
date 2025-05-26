import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import CustomInput from './global/CustomInput';
import CustomButton from './global/CustomButton';
import { AppColors, AppFont } from '../utils/DesignSystem';
import { sparkingasia_logo } from '../utils/Images';

const AuthForm = ({
  title,
  fields = [],
  onChange,
  onSubmit,
  submitTitle = 'Submit',
  isLoading = false,
  footer = null,
  containerStyle = {},
  buttonStyle = {},
  subText
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      
      {/* Logo and Header */}
      <View style={styles.logoRow}>
        <Image source={sparkingasia_logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.logoText}>Restaurant Management</Text>
      </View>

      {/* Title */}
      {title && <Text style={styles.title}>{title}</Text>}

      {/* SubText */}
      {subText && <Text style={styles.subText}>{subText}</Text>}

      {/* Fields */}
      {fields.map((field, index) => (
        <CustomInput
          key={index}
          value={field.value}
          onChangeText={(text) => onChange(field.name, text)}
          placeholder={field.placeholder}
          leftIcon={field.leftIcon}
          secureTextEntry={field.secureTextEntry}
          keyboardType={field.keyboardType || 'default'}
          error={field.error}
        />
      ))}

      {/* Submit Button */}
      <CustomButton
        title={submitTitle}
        onPress={onSubmit}
        isLoading={isLoading}
        containerStyle={[styles.button, buttonStyle]}
      />

      {/* Footer */}
      {footer && <View style={styles.footer}>{footer}</View>}
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: AppColors.white,
    borderRadius: 10,
    elevation: 2,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logoText: {
    fontSize: 18,
    fontFamily: AppFont.secondaryFont,
    color: AppColors.black,
  },
  title: {
    fontSize: 24,
    fontFamily: AppFont.primaryFont,
    color: AppColors.black,
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    fontFamily: AppFont.secondaryFont,
    color: AppColors.lightGray,
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
