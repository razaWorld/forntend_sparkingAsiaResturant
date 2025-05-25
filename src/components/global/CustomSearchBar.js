import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { AppFont, AppColors } from '../../utils/DesignSystem';

const CustomSearchBar = ({ 
  placeholder = 'Search...', 
  leftIcon: LeftIcon,  // React component for left icon
  rightIcon: RightIcon, // React component for right icon
  onChangeText,
  value: propValue = '',
  style,
}) => {
  const [value, setValue] = useState(propValue);

  const handleChange = (text) => {
    setValue(text);
    if (onChangeText) onChangeText(text);
  };

  return (
    <View style={[styles.container, style]}>
      {LeftIcon && <View style={styles.iconLeft}><LeftIcon /></View>}

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={AppColors.grayLight}
        value={value}
        onChangeText={handleChange}
        returnKeyType="search"
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />

      {RightIcon && <View style={styles.iconRight}><RightIcon /></View>}
    </View>
  );
};

export default CustomSearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.grayLightest,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginVertical: 10,
    borderWidth:1
    
  },
  iconLeft: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontFamily: AppFont.regular,
    fontSize: 16,
    color: AppColors.textDark,
    paddingVertical: 0, // Fix vertical padding for Android
  },
});
