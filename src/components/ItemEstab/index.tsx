import React, { useContext } from "react";

import { FontAwesome5 } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Container, Text } from "./styles";
import { EstabProps, EstabsContext } from "../../contexts/EstabsContext";

type Icon = {
    tp_item: string;
    textColor: string;
}
type Props = {
    data: EstabProps
    toggleEstab: () => void;
}

const Icon: any = ({ tp_item, textColor }: Icon) => {
    switch (tp_item.toLowerCase()) {
        case "matri":
            return <FontAwesome5 name="building" size={18} color={textColor} />
        case "armaz":
            return <FontAwesome5 name="houzz" size={18} color={textColor} />
        case "super":
            return <FontAwesome5 name="store" size={18} color={textColor} />
        case "ppr":
            return <MaterialCommunityIcons name="tractor-variant" size={18} color={textColor} />
        case "racao":
            return <MaterialCommunityIcons name="grain" size={18} color={textColor} />
        case "loja":
            return <FontAwesome5 name="store-alt" size={18} color={textColor} />
        case "frigo":
            return <MaterialCommunityIcons name="food-drumstick" size={18} color={textColor} />
        case "autoc":
            return <FontAwesome5 name="car" size={18} color={textColor} />
        case "posto":
            return <MaterialCommunityIcons name="gas-station" size={18} color={textColor} />
        case "manut":
            return <MaterialCommunityIcons name="hammer-wrench" size={18} color={textColor} />
        case "farma":
            return <FontAwesome5 name="clinic-medical" size={18} color={textColor} />
        case "trans":
            return <FontAwesome5 name="truck-loading" size={18} color={textColor} />
        case "ubs":
            return <MaterialCommunityIcons name="sprout" size={18} color={textColor} />
    }
}

export function ListItem({ data, toggleEstab }: Props) {
    const { estab } = useContext(EstabsContext)
    const background = data.nome === estab.nome ? '#005FDF' : '#EEF6FF'
    const color = data.nome === estab.nome ? '#FFF' : '#333'
    return (
        <Container onPress={toggleEstab} style={{ backgroundColor: background }}>
            <Icon tp_item={data.tp_estab} textColor={color} />
            <Text style={{ color: color }}>{data.abreviacao}</Text>
        </Container>
    )
}