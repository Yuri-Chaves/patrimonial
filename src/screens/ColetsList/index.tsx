import React, { useContext, useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { useNetInfo } from "@react-native-community/netinfo";

import {
    Separator,
    Pressable,
    Line,
    InfosContainer,
    Infos,
    Info,
    Text
} from './styles';

import { database } from "../../databases";
import { ItmcolModel } from '../../databases/models/itmcolModel';
import { Q } from '@nozbe/watermelondb'

import instance from "../../helpers/instance";
import { ListColHeader } from '../../components/ListColHeader';
import { EstabsContext } from '../../contexts/EstabsContext';
import { EmptyState } from '../../components/EmptyState';

import { useNavigation } from '@react-navigation/native'
import { StackNavigationList } from "../../routes/app.routes";
import { StackNavigationProp } from '@react-navigation/stack'

import { MaterialCommunityIcons } from '@expo/vector-icons';

export type ApiData = {
    nome_equip: string;
    cod_equip: string;
    tipo_equip: number;
    placa: string;
    empresa: number;
    estab: number;
    setor: number;
    local: number;
    dt_atual: string;
    hr_atual: string;
}

export function ColetsList() {
    const netInfo = useNetInfo()
    const { filter, estab, colLen, setColLength } = useContext(EstabsContext)
    const [itmsCol, setItmsCol] = useState<ItmcolModel[]>([])
    const iconLength = 16

    const navigation = useNavigation<StackNavigationProp<StackNavigationList>>()

    async function fetchData() {
        if (filter) {
            const itmsCollection = database.get<ItmcolModel>('Item_coletado')
            const response = await itmsCollection.query(
                Q.or(
                    Q.and(
                        Q.where('empresa_coletado', Q.eq(estab.empresa)),
                        Q.where('estab_coletado', Q.eq(estab.num_estab))
                    ),
                    Q.and(
                        Q.where('empresa', Q.eq(estab.empresa)),
                        Q.where('estab', Q.eq(estab.num_estab))
                    )
                )
            ).fetch()
            setColLength(response.length)
            setItmsCol(response)
        } else {
            const itmsCollection = database.get<ItmcolModel>('Item_coletado')
            const response = await itmsCollection.query().fetch()
            setColLength(response.length)
            setItmsCol(response)
        }
    }

    useEffect(() => {
        fetchData()
    }, [filter])

    useEffect(() => {
        fetchData()
    }, [colLen])

    async function getPatrimData(item: ItmcolModel) {
        try {
            const apiData = await (await instance.get<ApiData>(`/compare/${item.cod_coletado}`)).data
            await database.write(async () => {
                await item.update(data => {
                    data.nome_equip = apiData.nome_equip
                    data.tipo_equip = apiData.tipo_equip
                    data.placa = apiData.placa
                    data.empresa = apiData.empresa
                    data.estab = apiData.estab
                    data.setor = apiData.setor
                    data.local = apiData.local
                    data.dt_atual = apiData.dt_atual
                    if (data.nome_equip) {
                        if (data.empresa_coletado == apiData.empresa && data.estab_coletado == apiData.estab) {
                            data.status = 'Verificado'
                        } else {
                            data.status = 'Divergência'
                        }
                    }
                })
            })
        } catch (error) {
            await database.write(async () => {
                await item.update(data => {
                    data.status = 'Inexistente'
                })
            })
        }
    }

    if (netInfo.isConnected) {
        if (itmsCol) {
            itmsCol.forEach(item => {
                if (item.status == 'Pendente') {
                    getPatrimData(item)
                }
            });
        }
    }

    const togleModal = (item: ItmcolModel) => {
        if (item.status != 'Pendente') {
            navigation.navigate('Item_Col', item)
        }
    }

    function renderItem({ item }: ListRenderItemInfo<ItmcolModel>) {
        return (
            <>
                <Pressable
                    onPress={() => togleModal(item)}
                    bgColor={
                        item.status == 'Pendente' ? "#FFEFE7" :
                            item.status == 'Verificado' ? "#E6F1EB" :
                                "#F6EAEA"
                    }
                    justify="flex-start"
                >
                    <Line
                        bgColor={
                            item.status == 'Pendente' ? "#EE6005" :
                                item.status == 'Verificado' ? "#008639" :
                                    "#D40000"
                        }
                    >
                        {item.status === "Pendente" && (
                            <MaterialCommunityIcons name="progress-clock" size={iconLength} color="white" />
                        )}
                        {item.status === "Verificado" && (
                            <MaterialCommunityIcons name="check" size={iconLength} color="white" />
                        )}
                        {item.status === "Divergência" && (
                            <MaterialCommunityIcons name="alert" size={iconLength} color="white" />
                        )}
                        {item.status === "Inexistente" && (
                            <MaterialCommunityIcons name="block-helper" size={iconLength} color="white" />
                        )}
                    </Line>
                    <InfosContainer>
                        <Infos>
                            <Info>
                                <MaterialCommunityIcons name="barcode" size={iconLength} color="#333" />
                                <Text >Cod: {item.cod_coletado}</Text>
                            </Info>
                            <Info>
                                <MaterialCommunityIcons name="office-building-outline" size={iconLength} color="#333" />
                                <Text>Empresa: {item.empresa_coletado}</Text>
                            </Info>
                            <Info>
                                <MaterialCommunityIcons name="store" size={iconLength} color="#333" />
                                <Text>Estab: {item.estab_coletado}</Text>
                            </Info>
                        </Infos>
                        <Infos>
                            <Info>
                                <MaterialCommunityIcons name="calendar" size={iconLength} color="#333" />
                                <Text>Data: {item.coleted_at_dt}</Text>
                            </Info>
                            <Info>
                                <MaterialCommunityIcons name="clock-outline" size={iconLength} color="#333" />
                                <Text>Hora: {item.coleted_at_hr}</Text>
                            </Info>
                            <Info>
                                <MaterialCommunityIcons name="progress-alert" size={iconLength} color="#333" />
                                <Text>Status: {item.status}</Text>
                            </Info>
                        </Infos>
                    </InfosContainer>
                </Pressable>
            </>
        )
    }

    return (
        <>
            <ListColHeader />
            <FlatList
                data={itmsCol}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <Separator />}
                ListEmptyComponent={<EmptyState />}
            />
        </>
    )
}