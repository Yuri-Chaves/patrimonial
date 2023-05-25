import React, { createContext, useState, ReactNode } from "react";
import { ToastAndroid } from "react-native";
import { database } from "../databases";
import { ItmcolModel } from "../databases/models/itmcolModel";

export type EstabProps = {
    empresa: number;
    num_estab: number;
    nome: string;
    abreviacao: string;
    tp_estab: string;
}

type EstabsContextData = {
    estab: EstabProps;
    toggleEstab: (data: EstabProps) => void;
    isSynced: boolean;
    setSynced: () => void;
    visible: boolean;
    setIsVisible: () => void;
    filter: boolean;
    setFiltered: () => void;
    handleSend: () => void;
}

type EstabsProviderProps = {
    children: ReactNode;
}

export const EstabsContext = createContext({} as EstabsContextData);

export function EstabsProvider({ children }: EstabsProviderProps) {
    const [estab, setEstab] = useState<EstabProps>({
        empresa: 1,
        num_estab: 1,
        nome: 'MATRIZ',
        abreviacao: 'MATRIZ',
        tp_estab: 'MATRIZ'
    })
    const [isSynced, setIsSynced] = useState(false)
    const [visible, setVisible] = useState(false)
    const [filter, setFilter] = useState(false)

    function setSynced() {
        setIsSynced(true)
    }
    function setIsVisible() {
        setVisible(previousState => !previousState)
    }
    function setFiltered() {
        setFilter(previusState => !previusState)
    }

    function toggleEstab(data: EstabProps) {
        setEstab({
            empresa: data.empresa,
            num_estab: data.num_estab,
            nome: data.nome,
            abreviacao: data.abreviacao,
            tp_estab: data.tp_estab
        })
        setIsVisible()
    }

    async function handleSend() {
        const itmcolCollection = database.get<ItmcolModel>("Item_coletado");
        const response = await itmcolCollection.query().fetch();
        if (response.length > 0) {
            ToastAndroid.showWithGravityAndOffset('Enviando dados', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 35)
            console.log(response)
            // await database.write(async () => { await itmcolCollection.query().destroyAllPermanently() })
        } else {
            ToastAndroid.showWithGravityAndOffset('Não há itens coletados', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 35)
        }
    }

    return (
        <EstabsContext.Provider
            value={{
                estab,
                isSynced,
                visible,
                filter,
                toggleEstab,
                setSynced,
                setIsVisible,
                setFiltered,
                handleSend
            }}>
            {children}
        </EstabsContext.Provider>
    )
}