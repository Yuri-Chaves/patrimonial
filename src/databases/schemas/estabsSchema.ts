import { tableSchema } from '@nozbe/watermelondb';

export const estabsSchema = tableSchema({
    name: 'Estabelecimentos',
    columns: [
        {
            name: 'empresa',
            type: 'number'
        },
        {
            name: 'num_estab',
            type: 'number'
        },
        {
            name: 'tp_estab',
            type: 'string'
        },
        {
            name: 'nome',
            type: 'string'
        },
        {
            name: 'abreviacao',
            type: 'string'
        },
        {
            name: 'updated_dt',
            type: 'string',
        },
        {
            name: 'updated_hr',
            type: 'string',
        },
        
    ]
});