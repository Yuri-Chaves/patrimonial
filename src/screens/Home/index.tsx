import React, { useContext, useState, useRef } from "react";
import { ImageBackground, Modal, StyleSheet, Switch, TextInput, ToastAndroid } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

import { FontAwesome5 } from '@expo/vector-icons'

import { database } from "../../databases";
import { ItmcolModel } from "../../databases/models/itmcolModel";
import { EstabsContext } from "../../contexts/EstabsContext";

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
    SwitchContent
} from "./style";
import { EstabsList } from "../EstabsList";

export function Home() {
    const primary = "#005FDF"
    const gray = "#333333"
    const netInfo = useNetInfo()
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [cod_coletado, setCod_coletado] = useState('')
    const { estab, visible, setIsVisible } = useContext(EstabsContext)
    const navigation = useNavigation<StackNavigationProp<StackNavigationList>>()
    const inputRef = useRef<TextInput>(null)

    async function handleSync() {
        const itmcolCollection = database.get<ItmcolModel>("Item_coletado");
        const response = await itmcolCollection.query().fetch();
        if (response.length > 0) {
            ToastAndroid.showWithGravityAndOffset('Enviando dados', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 35)
            console.log(response)
            await database.write(async () => { await itmcolCollection.query().destroyAllPermanently() })
        } else {
            ToastAndroid.showWithGravityAndOffset('Não há itens coletados', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 35)
        }
    }

    async function handleSave() {
        console.log(cod_coletado.length)
        if (cod_coletado.length > 5) {
            await database.write(async () => {
                await database.get<ItmcolModel>("Item_coletado").create(data => {
                    data.cod_coletado = cod_coletado
                    data.empresa_coletado = estab.empresa
                    data.estab_coletado = estab.num_estab
                    data.coleted_at_dt = new Date().toLocaleDateString()
                    data.coleted_at_hr = new Date().toLocaleTimeString('pt-BR')
                })
            })
            ToastAndroid.showWithGravityAndOffset('Coletado', ToastAndroid.SHORT, ToastAndroid.TOP, 15, 15)
            setCod_coletado('')
        }
        inputRef.current?.focus()
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
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <ImageBackground source={require('../../../assets/Borboleta.png')} resizeMode="contain" style={styles.image}>
            <Container>
                <TextView>
                    <Text><FontAwesome5 name="store-alt" size={14} color={gray} />  Estab selecionado:</Text>
                    <Text textColor={primary} fontWeight={700}>{(estab.nome).charAt(0) + (estab.nome).slice(1).toLocaleLowerCase()}</Text>
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
                    {netInfo.isConnected && (
                        <Pressable onPress={handleSync} >
                            <Text textColor={primary} size="16px">Enviar dados</Text>
                            <FontAwesome5 name="share" size={14} color={primary} />
                        </Pressable>
                    )}
                    <Pressable onPress={setIsVisible}>
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