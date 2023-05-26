import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/Home";
import { ColetsList } from "../screens/ColetsList";
import { ItemColet } from "../components/ItemColet";
import { ItmcolModel } from "../databases/models/itmcolModel";

export type StackNavigationList = {
    Home: undefined;
    ColetsList: undefined;
    Item_Col: ItmcolModel;
}

const Stack = createStackNavigator<StackNavigationList>();

export function AppRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}  options={{ headerShown: false }} />
            <Stack.Screen name="ColetsList" component={ColetsList}  options={{ headerShown: false }} />
            <Stack.Screen name="Item_Col" component={ItemColet}  options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}