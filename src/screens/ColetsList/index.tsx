import React, { useContext, useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import {
    Separator
} from './styles';

import { database } from "../../databases";
import { ItmcolModel } from '../../databases/models/itmcolModel';
import { Q } from '@nozbe/watermelondb'

import { ItemColet } from '../../components/ItemColet';
import { ListColHeader } from '../../components/ListColHeader';
import { EstabsContext } from '../../contexts/EstabsContext';
import { EmptyState } from '../../components/EmptyState';

export function ColetsList() {
    const { filter, estab } = useContext(EstabsContext)
    const [itmsCol, setItmsCol] = useState<ItmcolModel[]>([])

    async function fetchData() {
        if(filter){
            const itmsCollection = database.get<ItmcolModel>('Item_coletado')
            const response = await itmsCollection.query(
                Q.and(
                    Q.where('empresa_coletado', Q.eq(estab.empresa)),
                    Q.where('estab_coletado', Q.eq(estab.num_estab))
                )
            ).fetch()
            setItmsCol(response)
        }else{
            const itmsCollection = database.get<ItmcolModel>('Item_coletado')
            const response = await itmsCollection.query().fetch()
            setItmsCol(response)
        }
    }

    useEffect(() => {
        fetchData()
    }, [filter])

    function renderItem({ item }: ListRenderItemInfo<ItmcolModel>) {
        return <ItemColet data={item} />
    }

    return (
        <>
            <ListColHeader />
            <FlatList
                data={itmsCol.reverse()}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <Separator />}
                ListEmptyComponent={<EmptyState/>}
            />
        </>
    )
}