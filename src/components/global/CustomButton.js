import React, { useCallback } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { AppColors, AppFont } from '../../utils/DesignSystem';
import debounce from 'lodash.debounce';

const CustomButton = ({
  title = 'Button',
  onPress,
  debounceTime = 300, // optional debounce time
  type = 'solid',
  disabled = false,
  isLoading = false,
  loaderColor = AppColors.white,
  activeOpacity = 0.7,
  containerStyle,
  textStyle,
  icon,
  iconPosition = 'left',
}) => {
  const isOutline = type === 'outline';
  const isText = type === 'text';

  // Wrap the onPress handler with debounce
  const debouncedOnPress = useCallback(debounce(onPress, debounceTime, { leading: true, trailing: false }), [onPress]);

  const handlePress = () => {
    if (!disabled && !isLoading) {
      debouncedOnPress();
    }
  };

  const buttonStyle = [
    styles.button,
    isOutline && styles.outlineButton,
    isText && styles.textButton,
    disabled && styles.disabledButton,
    containerStyle,
  ];

  const textStyles = [
    styles.text,
    isOutline && styles.outlineText,
    isText && styles.textOnly,
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || isLoading}
      activeOpacity={activeOpacity}
      style={buttonStyle}
    >
      {isLoading ? (
        <ActivityIndicator color={loaderColor} />
      ) : (
        <View style={styles.content}>
          {icon && iconPosition === 'left' && <View style={styles.icon}>{icon}</View>}
          <Text style={textStyles}>{title}</Text>
          {icon && iconPosition === 'right' && <View style={styles.icon}>{icon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;


const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 8,
    backgroundColor: AppColors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: AppColors.primary,
  },
  textButton: {
    backgroundColor: 'transparent',
    elevation: 0,
    fontFamily:AppFont.primaryFont
  },
  disabledButton: {
    backgroundColor: AppColors.gray,
  },
  text: {
    color: AppColors.white,
    fontSize: 16,
    fontFamily: AppFont.primaryFont,
    // textTransform:1
  },
  outlineText: {
    color: AppColors.primary,
  },
  textOnly: {
    color: AppColors.primary,
  },
  disabledText: {
    color: AppColors.lightGray,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: 5,
  },
});
