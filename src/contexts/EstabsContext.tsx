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
    visible: boolean;
    toggleEstab: (data: EstabProps) => void;
    setSynced: () => void;
    setIsVisible: () => void;
}

type EstabsProviderProps = {
    children: ReactNode;
}

export const EstabsContext = createContext({} as EstabsContextData);

export function EstabsProvider({children}: EstabsProviderProps){
    const [estab, setEstab] = useState<EstabProps>({
        empresa: 1,
        num_estab: 1,
        nome: 'MATRIZ',
        abreviacao: 'MATRIZ',
        tp_estab: 'MATRIZ'
    })
    const [isSynced, setIsSynced] = useState(false)
    const [visible, setVisible] = useState(false)

    function setSynced() {
        setIsSynced(true)
    }
    function setIsVisible() {
        setVisible(previousState => !previousState)
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

    return(
        <EstabsContext.Provider value={{estab, isSynced, visible, toggleEstab, setSynced, setIsVisible}}>
            {children}
        </EstabsContext.Provider>
    )
}