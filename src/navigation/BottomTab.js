import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import ScreenNames from "../routes/routes";
import { HomeSvg } from "../assets/svgs/svg";
import { HomeScreen } from "../screens/app";
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
    height: 70,
    paddingBottom: 10,
    paddingHorizontal: 15,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 1, height: -4 },
    shadowOpacity: 0.1, // Reduced opacity for subtle shadow
    shadowRadius: 4,
    elevation: 5,
    borderTopWidth: 2,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "400",
    marginTop: -7,
  },
});
