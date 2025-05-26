import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import ScreenNames from "../routes/routes";
import { HomeSvg } from "../assets/svgs/svg";
import { HomeScreen } from "../screens/app";
import { AppFont } from "../utils/DesignSystem";
const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#235AFF",
        tabBarInactiveTintColor: "#7F8589",
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={ScreenNames.HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <HomeSvg color={focused ? undefined : "#C6C8CA"} />
          ),
        }}
      />

   
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFFFFF",
  
    paddingHorizontal: 15,
    
  },
  tabBarLabel: {
    fontSize: 12,
    fontFamily:AppFont.primaryFont,
    marginTop: -5,
  },
});
