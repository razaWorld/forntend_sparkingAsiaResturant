import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { AppFont, AppColors } from '../../utils/DesignSystem';
import { CrossSvg } from '../../assets/svgs/svg';
import { debounce } from '../../utils/Methods';
const CustomSearchBar = ({ 
  placeholder = 'Search...', 
  leftIcon: LeftIcon,  
  onChangeText,
  value: propValue = '',
  style,
  debounceTime = 300,
}) => {
  const [value, setValue] = useState(propValue);

  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  // Wrap onChangeText with debounce, and memoize it
  const debouncedOnChangeText = useCallback(
    debounce((text) => {
      onChangeText?.(text);
    }, debounceTime),
    [onChangeText, debounceTime]
  );

  const handleChange = (text) => {
    setValue(text);
    debouncedOnChangeText(text);
  };

  const handleClear = () => {
    setValue('');
    onChangeText?.(''); // clear immediately
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
      />

      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.iconRight}>
          <CrossSvg />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomSearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.grayLightest,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: AppColors.borderColor
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
    paddingVertical: 0,
  },
});
