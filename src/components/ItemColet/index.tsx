import React, { useContext } from "react";
import { ItmcolModel } from "../../databases/models/itmcolModel";
import { EstabsContext } from "../../contexts/EstabsContext";

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { StackNavigationList } from "../../routes/app.routes";
import { StackNavigationProp } from '@react-navigation/stack'

import { database } from "../../databases";
import { Q } from '@nozbe/watermelondb'

import {
    Pressable,
    Infos,
    Info,
    Text,
    Container,
    ModalContainer,
    ModalContent
} from "./styles";
import { Image, StyleSheet, View } from "react-native";

type RouteDetailsParams = {
    ItemColet: ItmcolModel
}

export function ItemColet() {
    const iconLength = 16
    const { colLen, setColLength } = useContext(EstabsContext)
    const route = useRoute<RouteProp<RouteDetailsParams>>()
    const navigation = useNavigation<StackNavigationProp<StackNavigationList>>()

    async function handleDelete(cod: string) {
        const itmsCollection = database.get<ItmcolModel>('Item_coletado')
        const item = await itmsCollection.query(Q.where('cod_coletado', Q.eq(cod))).fetch()
        await database.write(async () => {
            await item[0].destroyPermanently()
            setColLength(colLen - 1)
            navigation.navigate("ColetsList")
        })
    }
    return (
        <Container>
            <Image source={require('../../../assets/Borboleta.png')} resizeMode="contain" alt="Cotripal" style={styles.bgImage} />
            <ModalContainer>
                <ModalContent borderRadius="24px" borderWidth='1px' borderColor={route.params.status === "Verificado" ? '#008639' : "#D40000"}>
                    {route.params.status === "Inexistente" && (
                        <Text style={{ marginTop: 8, marginLeft: 8, marginRight: 8 }} size='16px'>Código não encontrado</Text>
                    )}
                    {route.params.status === "Divergência" && (
                        <Text style={{ marginTop: 8, marginLeft: 8, marginRight: 8 }} size='16px'>{route.params.nome_equip}</Text>
                    )}
                    {route.params.status === "Verificado" && (
                        <Text style={{ marginTop: 8, marginLeft: 8, marginRight: 8 }} size='16px'>{route.params.nome_equip}</Text>
                    )}
                    {route.params.status != "Pendente" && route.params.status != "Inexistente" && (
                        <View style={styles.details}>
                            <Text size="16px" style={{ marginLeft: 8 }}>Informações do patrimônio</Text>
                            <ModalContent
                                direction="row"
                                bgColor="#EEF6FF"
                                justify="space-evenly"
                            >
                                <Infos>
                                    <Info>
                                        <MaterialCommunityIcons name="barcode" size={iconLength} color="#333" />
                                        <Text >Cod: {route.params.cod_coletado}</Text>
                                    </Info>
                                    <Info>
                                        <MaterialCommunityIcons name="information-variant" size={iconLength} color="#333" />
                                        <Text>tipo: {route.params.tipo_equip}</Text>
                                    </Info>
                                    <Info>
                                        <MaterialCommunityIcons name="car" size={iconLength} color="#333" />
                                        <Text>placa: {route.params.placa}</Text>
                                    </Info>
                                    <Info>
                                        <MaterialCommunityIcons name="calendar" size={iconLength} color="#333" />
                                        <Text>Cadastro: {route.params.dt_atual}</Text>
                                    </Info>
                                </Infos>
                                <Infos>
                                    <Info>
                                        <MaterialCommunityIcons name="office-building-outline" size={iconLength} color="#333" />
                                        <Text
                                            textColor={
                                                route.params.empresa_coletado == route.params.empresa ? "#333" : "#D40000"
                                            }
                                        >Empresa: {route.params.empresa}</Text>
                                    </Info>
                                    <Info>
                                        <MaterialCommunityIcons name="store" size={iconLength} color="#333" />
                                        <Text
                                            textColor={
                                                route.params.estab_coletado == route.params.estab ? "#333" : "#D40000"
                                            }
                                        >Estab: {route.params.estab}</Text>
                                    </Info>
                                    <Info>
                                        <MaterialCommunityIcons name="map" size={iconLength} color="#333" />
                                        <Text >Setor: {route.params.setor}</Text>
                                    </Info>
                                    <Info>
                                        <MaterialCommunityIcons name="map-marker" size={iconLength} color="#333" />
                                        <Text >Local: {route.params.local}</Text>
                                    </Info>
                                </Infos>
                            </ModalContent>
                            <Text size="16px" style={{ marginLeft: 8 }}>Informações de coleta</Text>
                            <ModalContent
                                direction="row"
                                bgColor="#EEF6FF"
                                justify="space-evenly"
                            >
                                <Infos minWidth={'155px'}>
                                    <Info>
                                        <MaterialCommunityIcons name="office-building-outline" size={iconLength} color="#333" />
                                        <Text
                                            textColor={
                                                route.params.empresa_coletado == route.params.empresa ? "#333" : "#D40000"
                                            }
                                        >Empresa: {route.params.empresa_coletado}</Text>
                                    </Info>
                                    <Info>
                                        <MaterialCommunityIcons name="calendar" size={iconLength} color="#333" />
                                        <Text>Data: {route.params.coleted_at_dt}</Text>
                                    </Info>
                                </Infos>
                                <Infos>
                                    <Info>
                                        <MaterialCommunityIcons name="store" size={iconLength} color="#333" />
                                        <Text
                                            textColor={
                                                route.params.estab_coletado == route.params.estab ? "#333" : "#D40000"
                                            }
                                        >Estab: {route.params.estab_coletado}</Text>
                                    </Info>
                                    <Info>
                                        <MaterialCommunityIcons name="clock-outline" size={iconLength} color="#333" />
                                        <Text>Hora: {route.params.coleted_at_hr}</Text>
                                    </Info>
                                </Infos>
                            </ModalContent>
                        </View>
                    )}
                    {route.params.status === "Inexistente" && (
                        <Pressable
                            onPress={() => handleDelete(route.params.cod_coletado)}
                            width='50%'
                            height='42px'
                            borderRadius='8px'
                            bgColor="#F6EAEA"
                            style={{
                                marginTop: 8,
                                borderColor: '#D40000',
                                borderWidth: 1,
                            }}
                        >
                            <Text textColor="#D40000">Remover</Text>
                            <MaterialCommunityIcons name="delete-empty" size={iconLength} color="#D40000" />
                        </Pressable>
                    )}
                    <Pressable
                        onPress={() => navigation.goBack()}
                        width='50%'
                        height='42px'
                        borderRadius='8px'
                        bgColor="#EEF6FF"
                        style={{ marginBottom: 8 }}
                    >
                        <Text lineHeight="16px">Fechar</Text>
                        <MaterialCommunityIcons name="close" size={iconLength} color="#333" />
                    </Pressable>
                </ModalContent>
            </ModalContainer>
        </Container>
    )
}
const styles = StyleSheet.create({
    bgImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0
    },
    details: {
        gap: 1
    }
})