import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Sync } from "../screens/Sync";

const Stack = createStackNavigator();

export function SyncRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Sync" component={Sync} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}