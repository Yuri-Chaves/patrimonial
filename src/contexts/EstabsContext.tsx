import React, { createContext, useState, ReactNode } from "react";

export type EstabProps = {
    empresa: number;
    num_estab: number;
    nome: string;
    abreviacao: string;
    tp_estab: string;
}

type EstabsContextData = {
    estab: EstabProps;
    isSynced: boolean;
    toggleEstab: (data: EstabProps) => void;
    setSynced: () => void;
}

type EstabsProviderProps = {
    children: ReactNode;
}

export const EstabsContext = createContext({} as EstabsContextData);

import { useNavigation } from '@react-navigation/native'
import { StackNavigationList } from "../routes/app.routes";
import { StackNavigationProp } from '@react-navigation/stack'

export function EstabsProvider({children}: EstabsProviderProps){
    const navigation = useNavigation<StackNavigationProp<StackNavigationList>>()
    const [estab, setEstab] = useState<EstabProps>({
        empresa: 1,
        num_estab: 1,
        nome: 'MATRIZ',
        abreviacao: 'MATRIZ',
        tp_estab: 'MATRIZ'
    })
    const [isSynced, setIsSynced] = useState(false)

    function toggleEstab(data: EstabProps) {
        setEstab({
            empresa: data.empresa,
            num_estab: data.num_estab,
            nome: data.nome,
            abreviacao: data.abreviacao,
            tp_estab: data.tp_estab
        })
        navigation.navigate('Home')
    }

    function setSynced() {
        setIsSynced(true)
    }

    return(
        <EstabsContext.Provider value={{estab, isSynced, toggleEstab, setSynced}}>
            {children}
        </EstabsContext.Provider>
    )
}