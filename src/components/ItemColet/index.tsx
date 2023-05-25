import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-native";
import { ItmcolModel } from "../../databases/models/itmcolModel";
import { useNetInfo } from "@react-native-community/netinfo";

import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
    Pressable,
    Line,
    InfosContainer,
    Infos,
    Info,
    Text,
    Container,
    ModalContainer,
    ModalContent
} from "./styles";
import instance from "../../helpers/instance";

type Prop = {
    data: ItmcolModel;
}
type ApiData = {
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

export function ItemColet(data: Prop) {
    const netInfo = useNetInfo()
    const [modalVisible, setModalVisible] = useState(false);
    const iconLength = 16
    const pendingColor = "#EE6005"
    const pendingBg = "#FFEFE7"
    const [color, setColor] = useState('')
    const [bg, setBg] = useState('')
    const [status, setStatus] = useState('Pendente')
    const [patrimApi, setPatrimApi] = useState<ApiData>()

    const [verified, setVerified] = useState(false)

    if (netInfo.isConnected) {
        async function getPatrim() {
            try {
                const apiData = await (await instance.get<ApiData>(`/compare/${data.data.cod_coletado}`)).data
                setVerified(true)
                if (
                    data.data.empresa_coletado == patrimApi?.empresa &&
                    data.data.estab_coletado == patrimApi?.estab
                ) {
                    setColor("#008639")
                    setBg("#E6F1EB")
                    setStatus('Verificado')
                    setPatrimApi(apiData)
                }else{
                    setColor("#D40000")
                    setBg("#F6EAEA")
                    setStatus('Divergência')
                    setPatrimApi(apiData)
                }
            } catch (err) {
                setVerified(true)
                setColor("#D40000")
                setBg("#F6EAEA")
                setStatus('Inexistente')
                console.log(err)
            }
        }
        getPatrim()
    }

    return (
        <>
            <Pressable onPress={() => setModalVisible(!modalVisible)} bgColor={bg ? bg : pendingBg} justify="flex-start">
                <Line bgColor={color ? color : pendingColor} >
                    {status === "Pendente" && (
                        <MaterialCommunityIcons name="progress-clock" size={iconLength} color="white" />
                    )}
                    {status === "Verificado" && (
                        <MaterialCommunityIcons name="check" size={iconLength} color="white" />
                    )}
                    {status === "Divergência" && (
                        <MaterialCommunityIcons name="block-helper" size={iconLength} color="white" />
                    )}
                </Line>
                <InfosContainer>
                    <Infos>
                        <Info>
                            <MaterialCommunityIcons name="barcode" size={iconLength} color="#333" />
                            <Text >Cod: {data.data.cod_coletado}</Text>
                        </Info>
                        <Info>
                            <MaterialCommunityIcons name="office-building-outline" size={iconLength} color="#333" />
                            <Text>Empresa: {data.data.empresa_coletado}</Text>
                        </Info>
                        <Info>
                            <MaterialCommunityIcons name="store" size={iconLength} color="#333" />
                            <Text>Estab: {data.data.estab_coletado}</Text>
                        </Info>
                    </Infos>
                    <Infos>
                        <Info>
                            <MaterialCommunityIcons name="calendar" size={iconLength} color="#333" />
                            <Text>Data: {data.data.coleted_at_dt}</Text>
                        </Info>
                        <Info>
                            <MaterialCommunityIcons name="clock-outline" size={iconLength} color="#333" />
                            <Text>Hora: {data.data.coleted_at_hr}</Text>
                        </Info>
                        <Info>
                            <MaterialCommunityIcons name="progress-alert" size={iconLength} color="#333" />
                            <Text>Status: {status}</Text>
                        </Info>
                    </Infos>
                </InfosContainer>
            </Pressable>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <Container>
                    <ModalContainer>
                        <ModalContent borderRadius="24px">
                            {!verified && (
                                <Text style={{ marginTop: 8, marginLeft: 8, marginRight: 8 }} size='16px'>Não verificado</Text>
                            )}
                            {verified && status == "Inexistente" && (
                                <Text style={{ marginTop: 8, marginLeft: 8, marginRight: 8 }} size='16px'>Código não encontrado</Text>
                            )}
                            {verified && (
                                <Text style={{ marginTop: 8, marginLeft: 8, marginRight: 8 }} size='16px'>{patrimApi?.nome_equip}</Text>
                            )}
                            {verified && (
                                <ModalContent
                                    direction="row"
                                    bgColor="#EEF6FF"
                                    justify="space-evenly"
                                >
                                    <Infos>
                                        <Info>
                                            <MaterialCommunityIcons name="barcode" size={iconLength} color="#333" />
                                            <Text >Cod: {patrimApi?.cod_equip}</Text>
                                        </Info>
                                        <Info>
                                            <MaterialCommunityIcons name="information-variant" size={iconLength} color="#333" />
                                            <Text>tipo: {patrimApi?.tipo_equip}</Text>
                                        </Info>
                                        <Info>
                                            <MaterialCommunityIcons name="car" size={iconLength} color="#333" />
                                            <Text>placa: {patrimApi?.placa}</Text>
                                        </Info>
                                        <Info>
                                            <MaterialCommunityIcons name="calendar" size={iconLength} color="#333" />
                                            <Text>Cadastro: {patrimApi?.dt_atual}</Text>
                                        </Info>
                                    </Infos>
                                    <Infos>
                                        <Info>
                                            <MaterialCommunityIcons name="office-building-outline" size={iconLength} color="#333" />
                                            <Text
                                                textColor={
                                                    data.data.empresa_coletado == patrimApi?.empresa ? "#333" : "#D40000"
                                                }
                                            >Empresa: {patrimApi?.empresa}</Text>
                                        </Info>
                                        <Info>
                                            <MaterialCommunityIcons name="store" size={iconLength} color="#333" />
                                            <Text
                                                textColor={
                                                    data.data.estab_coletado == patrimApi?.estab ? "#333" : "#D40000"
                                                }
                                            >Estab: {patrimApi?.estab}</Text>
                                        </Info>
                                        <Info>
                                            <MaterialCommunityIcons name="map" size={iconLength} color="#333" />
                                            <Text >Setor: {patrimApi?.setor}</Text>
                                        </Info>
                                        <Info>
                                            <MaterialCommunityIcons name="map-marker" size={iconLength} color="#333" />
                                            <Text >Local: {patrimApi?.local}</Text>
                                        </Info>
                                    </Infos>
                                </ModalContent>
                            )}
                            <Pressable
                                onPress={() => setModalVisible(!modalVisible)}
                                width='50%'
                                height='42px'
                                borderRadius='8px'
                                bgColor="#EEF6FF"
                                style={{ marginBottom: 8 }}
                            >
                                <Text>Fechar</Text>
                                <MaterialCommunityIcons name="close" size={iconLength} color="#333" />
                            </Pressable>
                        </ModalContent>
                    </ModalContainer>
                </Container>
            </Modal>
        </>
    )
}