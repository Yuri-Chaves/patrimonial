import React, { useContext, useEffect, useState } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import { EstabsContext } from "../../contexts/EstabsContext";

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native'
import { StackNavigationList } from "../../routes/app.routes";
import { StackNavigationProp } from '@react-navigation/stack'

import { database } from "../../databases";
import { ItmcolModel } from '../../databases/models/itmcolModel';

import {
    Container,
    BtnContainer,
    FilterContainer,
    Pressable,
    Text
} from "./styles";

export function ListColHeader() {
    const [itmsCol, setItmsCol] = useState<ItmcolModel[]>([])
    const { filter, setFiltered, handleSend } = useContext(EstabsContext)
    const netInfo = useNetInfo()

    const navigation = useNavigation<StackNavigationProp<StackNavigationList>>()

    async function haveItems() {
        const itmsCollection = database.get<ItmcolModel>('Item_coletado')
        const response = await itmsCollection.query().fetch()
        setItmsCol(response)
    }

    useEffect(() => {
        haveItems()
    }, [])

    return (
        <Container>
            <BtnContainer>
                <Pressable width={netInfo.isConnected && itmsCol.length > 0 ? '50%' : '100%'} bgColor="#F6EAEA" borderColor="#D40000" onPress={() => navigation.goBack()}>
                    <Text fontWeight={600} textColor="#D40000">Voltar</Text>
                    <MaterialCommunityIcons name="reply" size={14} color='#D40000' />
                </Pressable>
                {netInfo.isConnected && itmsCol.length > 0 && (
                    <Pressable onPress={handleSend} >
                        <Text fontWeight={600}>Enviar dados</Text>
                        <MaterialCommunityIcons name="share" size={14} color='#005FDF' />
                    </Pressable>
                )}
            </BtnContainer>
            <FilterContainer borderColor={filter ? "#2F80ED" : "#828282"} bgColor={filter ? "#EEF6FF" : "#F4F5F6"} onPress={setFiltered}>
                <Text textColor={filter ? "#2F80ED" : "#828282"}>Filtrar pelo Estab atual</Text>
                <MaterialCommunityIcons name={filter ? "filter-remove" : "filter"} size={14} color={filter ? "#2F80ED" : "#828282"} />
            </FilterContainer>
        </Container>
    )
}