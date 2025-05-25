import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AppColors, AppFont } from '../../utils/DesignSystem';

const CustomText = ({
  textTitle = '',
  size = 16,
  weight = 'normal',
  color = AppColors.primaryText,
  align = 'left',
  font = AppFont.primaryFont,
  numberOfLines,
  ellipsizeMode,
  style,
  ...props
}) => {
  return (
    <View>
      <Text
        style={[
          styles.text,
          {
            fontSize: size,
            fontWeight: weight,
            color,
            textAlign: align,
            fontFamily: font,
          },
          style,
        ]}
        numberOfLines={numberOfLines}
        ellipsizeMode={ellipsizeMode}
        {...props}
      >
        {textTitle}
      </Text>
    </View>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: {},
});
