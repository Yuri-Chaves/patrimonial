import React, { useContext, useEffect, useRef, useState } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, TextInput, Keyboard } from "react-native";


import { Q } from '@nozbe/watermelondb'

import { FontAwesome5 } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
    Container,
    Button,
    Text,
    SearchContainer,
    SearchContent,
    SearchInput
} from "./style";

import { database } from "../../databases";
import { EstabsModel } from "../../databases/models/estabsModel";
import { ListItem } from "../../components/ItemEstab";
import { EstabsContext } from "../../contexts/EstabsContext";

export function EstabsList() {
    const { toggleEstab, setIsVisible } = useContext(EstabsContext)
    const [estabs, setEstabs] = useState<EstabsModel[]>([])
    const [search, setSearch] = useState('')
    const inputRef = useRef<TextInput>(null)

    async function fetchData() {
        const estabsCollection = database.get<EstabsModel>("Estabelecimentos");
        const response = await estabsCollection.query().fetch();
        setEstabs(response)
    }

    async function fetchDataWithSearch() {
        const estabsCollection = database.get<EstabsModel>('Estabelecimentos');
        const response = await estabsCollection
            .query(
                Q.or(
                    Q.where('num_estab', Q.like(`%${Q.sanitizeLikeString(search)}%`)),
                    Q.where('nome', Q.like(`%${Q.sanitizeLikeString(search)}%`)),
                    Q.where('abreviacao', Q.like(`%${Q.sanitizeLikeString(search)}%`))
                )
            )
            .fetch();

        setEstabs(response);
    }

    useEffect(() => {
        if (search.length > 0) {
            fetchDataWithSearch()
        } else if (search.length == 0) {
            fetchData()
        }
    }, [search])

    useEffect(() => {
        setTimeout(() => {
            inputRef.current?.focus()
        }, 200);
    }, [])

    useEffect(() =>{
        Keyboard.addListener('keyboardDidHide', () => {
            inputRef.current?.blur()
            console.log('keyboardDidHide')
        })
    }, [])

    const searching = (e: string) => {
        setSearch(e)
        fetchData()
    }

    function renderItem({ item }: ListRenderItemInfo<EstabsModel>) {
        return <ListItem data={item} toggleEstab={() => toggleEstab(item)} />
    }

    return (
        <>
            <Container>
                <Button onPress={setIsVisible}>
                    <FontAwesome5 name="reply" size={14} color="#D40000" />
                    <Text textColor="#D40000">Cancelar</Text>
                </Button>
                <SearchContainer style={styles.searchContainerBorders}>
                    <SearchContent>
                        <SearchInput
                            // autoFocus={true}
                            placeholder='Buscar estab'
                            placeholderTextColor='#BDBDBD'
                            inputMode='text'
                            keyboardType='default'
                            value={search}
                            onChangeText={searching}
                            ref={inputRef}
                        />
                        <MaterialCommunityIcons name="store-search-outline" size={20} color="#333" />
                    </SearchContent>
                </SearchContainer>
            </Container>
            <FlatList
                data={estabs}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </>
    )
}
const styles = StyleSheet.create({
    searchContainerBorders: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: "#333",
        borderTopColor: "#333",
    }
})