import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/Home";
import { ColetsList } from "../screens/ColetsList";

export type StackNavigationList = {
    Home: undefined;
    ColetsList: undefined;
}

const Stack = createStackNavigator<StackNavigationList>();

export function AppRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}  options={{ headerShown: false }} />
            <Stack.Screen name="ColetsList" component={ColetsList}  options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}