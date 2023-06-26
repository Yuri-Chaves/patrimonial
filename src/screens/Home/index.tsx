import React, { useContext, useState, useRef, useEffect } from "react";
import { ActivityIndicator, ImageBackground, Modal, StyleSheet, Switch, TextInput, ToastAndroid } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

import { FontAwesome5 } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { database } from "../../databases";
import { ItmcolModel } from "../../databases/models/itmcolModel";
import { EstabsContext } from "../../contexts/EstabsContext";
import { EstabsList } from "../EstabsList";

import { Q } from '@nozbe/watermelondb'

import { useNavigation } from '@react-navigation/native'
import { StackNavigationList } from "../../routes/app.routes";
import { StackNavigationProp } from '@react-navigation/stack'

import {
    Container,
    TextView,
    Text,
    InputContainer,
    Input,
    PressableContainer,
    Pressable,
    SwitchContainer,
    SwitchContent,
    LogoutContainer,
    Logout,
    UserName,
} from "./style";
import instance from "../../helpers/instance";
import { ApiData } from "../ColetsList";
import { AxiosError } from "axios";

export function Home() {
    const primary = "#005FDF"
    const gray = "#333333"
    const netInfo = useNetInfo()
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [cod_coletado, setCod_coletado] = useState<string>('')

    const {
        estab,
        visible,
        user,
        setIsVisible,
        setIsAuth,
        setUser,
        loading
    } = useContext(EstabsContext)
    const inputRef = useRef<TextInput>(null)

    const navigation = useNavigation<StackNavigationProp<StackNavigationList>>()

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    async function handleSave() {
        if (cod_coletado.length > 5) {
            const itmcolCollection = database.get<ItmcolModel>("Item_coletado")
            const dbData = await itmcolCollection.query(Q.where('cod_coletado', Q.like(`${cod_coletado}`))).fetch()
            if (dbData.length > 0) {
                await database.write(async () => {
                    await dbData[0].update(data => {
                        data.empresa_coletado = estab.empresa
                        data.estab_coletado = estab.num_estab
                        data.coleted_at_dt = new Date().toLocaleDateString('pt-BR')
                        data.coleted_at_hr = new Date().toLocaleTimeString('pt-BR')
                        if (data.nome_equip) {
                            if (data.empresa_coletado == data.empresa && data.estab_coletado == data.estab) {
                                data.status = 'Verificado'
                            } else {
                                data.status = 'Divergência'
                            }
                        } else {
                            data.status = 'Pendente'
                        }
                    })
                })
                ToastAndroid.showWithGravityAndOffset('Atualizado', ToastAndroid.SHORT, ToastAndroid.TOP, 15, 15)
            } else {
                if (netInfo.isConnected) {
                    try {
                        const apiData = await (await instance.get<ApiData>(`/compare/${cod_coletado}`)).data
                        await database.write(async () => {
                            await database.get<ItmcolModel>("Item_coletado").create(data => {
                                data.cod_coletado = cod_coletado
                                data.empresa_coletado = estab.empresa
                                data.estab_coletado = estab.num_estab
                                data.coleted_at_dt = new Date().toLocaleDateString('pt-BR')
                                data.coleted_at_hr = new Date().toLocaleTimeString('pt-BR')
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
                        ToastAndroid.showWithGravityAndOffset('Coletado', ToastAndroid.SHORT, ToastAndroid.TOP, 15, 15)
                        const item = await itmcolCollection.query(Q.where('cod_coletado', Q.like(`${cod_coletado}`))).fetch()
                        navigation.navigate('Item_Col', item[0])
                    } catch (error) {
                        const err = error as AxiosError
                        let status = ''
                        if (err.code == 'ERR_BAD_RESPONSE') {
                            status = 'Inexistente'
                        }
                        if (err.code == 'ERR_NETWORK') {
                            status = 'Pendente'
                            ToastAndroid.showWithGravityAndOffset('Servidor offline', ToastAndroid.SHORT, ToastAndroid.TOP, 15, 15)
                        }
                        await database.write(async () => {
                            await database.get<ItmcolModel>("Item_coletado").create(data => {
                                data.cod_coletado = cod_coletado
                                data.empresa_coletado = estab.empresa
                                data.estab_coletado = estab.num_estab
                                data.coleted_at_dt = new Date().toLocaleDateString('pt-BR')
                                data.coleted_at_hr = new Date().toLocaleTimeString('pt-BR')
                                data.status = status
                            })
                        })
                    }
                } else {
                    await database.write(async () => {
                        await database.get<ItmcolModel>("Item_coletado").create(data => {
                            data.cod_coletado = cod_coletado
                            data.empresa_coletado = estab.empresa
                            data.estab_coletado = estab.num_estab
                            data.coleted_at_dt = new Date().toLocaleDateString('pt-BR')
                            data.coleted_at_hr = new Date().toLocaleTimeString('pt-BR')
                            data.status = 'Pendente'
                        })
                    })
                    ToastAndroid.showWithGravityAndOffset('Coletado', ToastAndroid.SHORT, ToastAndroid.TOP, 15, 15)
                }
            }
            setCod_coletado('')
            inputRef.current?.focus()
        }
    }

    const handleChange = (e: string) => {
        setCod_coletado(e)
        if (!isEnabled) {
            if (e.length < 2) {
                setCod_coletado('')
            } else {
                setCod_coletado(e)
                handleSave()
            }
        }
    }
    const setLocal = () => {
        inputRef.current?.blur()
        setIsVisible()
    }
    const handleLogout = () => {
        setIsAuth(false)
        setUser({ matricula: '', nome: '' })
    }

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <ImageBackground source={require('../../../assets/Borboleta.png')} resizeMode="contain" style={styles.image}>
            <Container>
                <LogoutContainer>
                    <UserName>{user.nome}</UserName>
                    <Logout onPress={handleLogout}>

                        <MaterialCommunityIcons name="logout" size={18} color="white" />
                    </Logout>
                </LogoutContainer>
                <TextView>
                    <Text><FontAwesome5 name="store-alt" size={14} color={gray} />  Estab selecionado:</Text>
                    <Text textColor={primary} style={{ textTransform: 'capitalize' }} fontWeight={700} >{estab.nome}</Text>
                </TextView>
                <InputContainer>
                    <FontAwesome5 name="barcode" size={14} color={gray} />
                    <Input
                        autoFocus={true}
                        inputMode='numeric'
                        keyboardType='numeric'
                        maxLength={7}
                        value={cod_coletado}
                        onChangeText={handleChange}
                        onEndEditing={handleSave}
                        ref={inputRef}
                    />
                </InputContainer>
                <PressableContainer>
                    <Pressable onPress={() => navigation.navigate("ColetsList")} >
                        {loading && (<ActivityIndicator color={primary}/>)}
                        {!loading && (
                            <>
                                <Text textColor={primary} size="16px">Itens coletados</Text>
                                <FontAwesome5 name="list" size={14} color={primary} />
                            </>
                        )}
                    </Pressable>
                    <Pressable onPress={setLocal}>
                        <Text textColor={primary} size="16px">Selecionar local</Text>
                        <FontAwesome5 name="map-marked-alt" size={14} color={primary} />
                    </Pressable>
                </PressableContainer>
                <SwitchContainer>
                    <Text>Habilitar digitação</Text>
                    <SwitchContent>
                        <FontAwesome5 name="lock" size={14} color={gray} />
                        <Switch
                            trackColor={{ false: '#767577', true: 'rgba(0, 95, 223, 0.38)' }}
                            thumbColor={isEnabled ? primary : '#f4f3f4'}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                        <FontAwesome5 name="lock-open" size={14} color={primary} />
                    </SwitchContent>
                </SwitchContainer>
            </Container>
            <Modal
                animationType="slide"
                visible={visible}
                onRequestClose={setIsVisible}
            >
                <EstabsList />
            </Modal>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    }
})