import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/Home";
import { EstabsList } from "../screens/EstabsList";

export type StackNavigationList = {
    Home: undefined
    Estabs: undefined
}

const Stack = createStackNavigator<StackNavigationList>();

export function AppRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}  options={{ headerShown: false }} />
            <Stack.Screen name="Estabs" component={EstabsList} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}