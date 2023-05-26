import { tableSchema } from '@nozbe/watermelondb';

export const itmcolSchema = tableSchema({
    name: 'Item_coletado',
    columns: [
        {
            name: 'cod_coletado',
            type: 'string',
        },
        {
            name: 'empresa_coletado',
            type: 'number',
        },
        {
            name: 'estab_coletado',
            type: 'number',
        },
        {
            name: 'coleted_at_dt',
            type: 'string',
        },
        {
            name: 'coleted_at_hr',
            type: 'string',
        },
        {
            name: 'status',
            type: 'string',
        },
        {
            name: 'nome_equip',
            type: 'string',
        },
        {
            name: 'tipo_equip',
            type: 'number',
        },
        {
            name: 'placa',
            type: 'string',
        },
        {
            name: 'empresa',
            type: 'number',
        },
        {
            name: 'estab',
            type: 'number',
        },
        {
            name: 'setor',
            type: 'number',
        },
        {
            name: 'local',
            type: 'number',
        },
        {
            name: 'dt_atual',
            type: 'string',
        },
    ]
})