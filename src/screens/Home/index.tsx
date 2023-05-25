import React, { useContext, useState, useRef } from "react";
import { ImageBackground, Keyboard, Modal, StyleSheet, Switch, TextInput, ToastAndroid } from "react-native";

import { FontAwesome5 } from '@expo/vector-icons'

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
    SwitchContent
} from "./style";

export function Home() {
    const primary = "#005FDF"
    const gray = "#333333"
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [cod_coletado, setCod_coletado] = useState('')
    const { estab, visible, setIsVisible } = useContext(EstabsContext)
    const inputRef = useRef<TextInput>(null)

    const navigation = useNavigation<StackNavigationProp<StackNavigationList>>()

    async function handleSave() {
        if (cod_coletado.length > 5) {
            const itmcolCollection = database.get<ItmcolModel>("Item_coletado")
            const dbData = await itmcolCollection.query(Q.where('cod_coletado', Q.like(`${cod_coletado}`))).fetch()
            if (dbData.length > 0) {
                await database.write(async () => {
                    await dbData[0].update(data => {
                        data.empresa_coletado = estab.empresa
                        data.estab_coletado = estab.num_estab
                        data.coleted_at_dt = new Date().toLocaleDateString()
                        data.coleted_at_hr = new Date().toLocaleTimeString('pt-BR')
                    })
                })
                ToastAndroid.showWithGravityAndOffset('Atualizado', ToastAndroid.SHORT, ToastAndroid.TOP, 15, 15)
            } else {
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
            }
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
    const setLocal = () => {
        inputRef.current?.blur()
        setIsVisible()
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
                        // autoFocus={true}
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
                        <Text textColor={primary} size="16px">Itens coletados</Text>
                        <FontAwesome5 name="list" size={14} color={primary} />
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