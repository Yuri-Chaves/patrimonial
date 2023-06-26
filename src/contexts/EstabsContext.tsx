import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { ToastAndroid } from "react-native";
import { database } from "../databases";
import { ItmcolModel } from "../databases/models/itmcolModel";

import { useNavigation } from '@react-navigation/native'
import { StackNavigationList } from "../routes/app.routes";
import { StackNavigationProp } from '@react-navigation/stack'
import instance from "../helpers/instance";

export type EstabProps = {
    empresa: number;
    num_estab: number;
    nome: string;
    abreviacao: string;
    tp_estab: string;
}

type EstabsProviderProps = {
    children: ReactNode;
}

type User = {
    nome: string;
    matricula: string;
}

type EstabsContextData = {
    estab: EstabProps;
    toggleEstab: (data: EstabProps) => void;
    isSynced: boolean;
    setSynced: () => void;
    isAuth: boolean;
    setIsAuth: Dispatch<SetStateAction<boolean>>
    user: User;
    setUser: Dispatch<SetStateAction<User>>
    visible: boolean;
    setIsVisible: () => void;
    filter: boolean;
    setFiltered: () => void;
    colLen: number;
    setColLength: (n: number) => void;
    handleSend: () => void;
    loading: boolean;
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
    const [isAuth, setIsAuth] = useState(false)
    const [visible, setVisible] = useState(false)
    const [filter, setFilter] = useState(false)
    const [colLen, setColLen] = useState(0)
    const [user, setUser] = useState<User>({ matricula: '', nome: '' })
    const [loading, setLoading] = useState(false)

    const formatDate = function (date: string) {
        const newDate = date.split('/')

        return [
            newDate[2],
            newDate[1],
            newDate[0],
        ].join('-');
    };

    const navigation = useNavigation<StackNavigationProp<StackNavigationList>>()

    function setSynced() {
        setIsSynced(true)
    }
    function setIsVisible() {
        setVisible(previousState => !previousState)
    }
    function setFiltered() {
        setFilter(previusState => !previusState)
    }
    function setColLength(n: number) {
        setColLen(n)
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

    async function sendItem(data: ItmcolModel) {
        try{
            await instance.post('/todb', {
                "empresa": data.empresa,
                "equipto": data.cod_coletado,
                "dt_atual": formatDate(data.coleted_at_dt),
                "hr_atual": data.coleted_at_hr,
                "estab": data.estab,
                "usuario": user.matricula,
                "qtde": 1
            })
        }catch(err){
            console.log(err)
            ToastAndroid.showWithGravityAndOffset('Erro ao enviar dados', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 35)
        }
    }

    async function handleSend() {
        const itmcolCollection = database.get<ItmcolModel>("Item_coletado");
        const response = await itmcolCollection.query().fetch();
        if (response.length > 0) {
            setLoading(true);
            ToastAndroid.showWithGravityAndOffset('Enviando dados', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 35)
            response.forEach(el => {
                sendItem(el)
            });
            setLoading(false)
            await database.write(async () => { await itmcolCollection.query().destroyAllPermanently() })
        } else {
            ToastAndroid.showWithGravityAndOffset('Não há itens coletados', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 35)
        }
        navigation.navigate("Home")
    }

    return (
        <EstabsContext.Provider
            value={{
                estab,
                isSynced,
                isAuth,
                visible,
                filter,
                colLen,
                user,
                toggleEstab,
                setSynced,
                setIsVisible,
                setFiltered,
                setColLength,
                handleSend,
                setIsAuth,
                setUser,
                loading
            }}>
            {children}
        </EstabsContext.Provider>
    )
}