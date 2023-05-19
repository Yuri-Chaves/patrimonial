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
    ]
})