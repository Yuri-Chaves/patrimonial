import React, { useState } from "react";
import { ItmcolModel } from "../../databases/models/itmcolModel";

import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
    Container,
    Line,
    Items,
    Item,
    Text
} from "./styles";

type Prop = {
    data: ItmcolModel;
}

export function ItemColet(data: Prop) {
    const iconLength = 16
    const pendingColor = "#EE6005"
    const pendingBg = "#FFEFE7"
    const [color, setColor] = useState('')
    const [bg, setBg] = useState('')
    const [status, setStatus] = useState('Pendente')

    // setColor("#008639")
    // setColor("#D40000")
    // setBg("#E6F1EB")
    // setBg("#F6EAEA")

    return (
        <Container  bgColor={bg ? bg : pendingBg} >
            <Line bgColor={color ? color : pendingColor} >
                <MaterialCommunityIcons name="progress-clock" size={iconLength} color="white" />
            </Line>
            <Items>
                <Item>
                    <MaterialCommunityIcons name="barcode" size={iconLength} color="#333" />
                    <Text >Cod: {data.data.cod_coletado}</Text>
                </Item>
                <Item>
                    <MaterialCommunityIcons name="office-building-outline" size={iconLength} color="#333" />
                    <Text>Empresa: {data.data.empresa_coletado}</Text>
                </Item>
            </Items>
            <Items>
                <Item>
                    <MaterialCommunityIcons name="store" size={iconLength} color="#333" />
                    <Text>Estab: {data.data.estab_coletado}</Text>
                </Item>
                <Item>
                    <MaterialCommunityIcons name="calendar" size={iconLength} color="#333" />
                    <Text>Data: {data.data.coleted_at_dt}</Text>
                </Item>
            </Items>
            <Items>
                <Item>
                    <MaterialCommunityIcons name="clock-outline" size={iconLength} color="#333" />
                    <Text>Hora: {data.data.coleted_at_hr}</Text>
                </Item>
                <Item>
                    <MaterialCommunityIcons name="progress-alert" size={iconLength} color="#333" />
                    <Text>Status: {status}</Text>
                </Item>
            </Items>
        </Container>
    )
}