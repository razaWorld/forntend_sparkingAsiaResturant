import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomText from '../global/CustomText'

const HomeHeader = ({onLogout}) => {
  return (
    <View>
        <TouchableOpacity onPress={onLogout}>

      <CustomText align={'right'} textTitle='Logout'/>
        </TouchableOpacity>
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({})