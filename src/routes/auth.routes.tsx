import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "../screens/Login";

const Stack = createStackNavigator();

export function AuthRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Sync" component={Login} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}