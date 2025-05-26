import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { AppColors, AppFont } from '../../utils/DesignSystem';

const CustomInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  style,
  inputStyle,
  editable = true,
  multiline = false,
  leftIcon,
  rightIcon,
  onPressRightIcon,
  onPressLeftIcon,
  numberOfLines = 4,
  error = '',
  showError = true,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Border color logic
  const borderColor =
    showError && error
      ? AppColors.red
      : isFocused
      ? AppColors.blue
      : AppColors.secondaryText;

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.inputWrapper, { borderColor }]}>
        {leftIcon && (
          <TouchableOpacity onPress={onPressLeftIcon} disabled={!onPressLeftIcon}>
            <View style={styles.icon}>{leftIcon}</View>
          </TouchableOpacity>
        )}

        <TextInput
          style={[styles.input, { flex: 1 }, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={AppColors.gray}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={editable}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          {...props}
        />

        {rightIcon && (
          <TouchableOpacity onPress={onPressRightIcon} disabled={!onPressRightIcon}>
            <View style={styles.icon}>{rightIcon}</View>
          </TouchableOpacity>
        )}
      </View>

      {showError && error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    color: AppColors.black,
    fontFamily: AppFont.semiBold,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 8,
    backgroundColor: AppColors.white,
    paddingHorizontal: 10,
  },
  input: {
    height: 50,
    fontSize: 16,
    color: AppColors.black,
    fontFamily: AppFont.regular,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  icon: {
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginTop: 5,
    color: AppColors.red,
    fontSize: 12,
    fontFamily: AppFont.regular,
  },
});
