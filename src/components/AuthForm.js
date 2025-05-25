import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomInput from './global/CustomInput';
import CustomButton from './global/CustomButton';
import { AppFont } from '../utils/DesignSystem';

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
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {title && <Text style={styles.title}>{title}</Text>}

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

      <CustomButton
        title={submitTitle}
        onPress={onSubmit}
        isLoading={isLoading}
        containerStyle={buttonStyle}
      />

      {footer && <View style={styles.footer}>{footer}</View>}
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    borderWidth:1,
    borderRadius:10
  },
  title: {
    fontSize: 22,
    
    textAlign: 'center',
    marginBottom: 20,
    fontFamily:AppFont.primaryFont
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
