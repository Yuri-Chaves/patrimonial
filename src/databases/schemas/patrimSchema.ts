import { tableSchema } from '@nozbe/watermelondb';

export const patrimSchema = tableSchema({
    name: 'Patrimonios',
    columns: [
        {
            name: 'nome_equip',
            type: 'string',
        },
        {
            name: 'cod_equip',
            type: 'string',
        },
        {
            name: 'tipo_equip',
            type: 'number',
        },
        {
            name: 'placa',
            type: 'string',
            isOptional: true,
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
            name: 'updated_dt',
            type: 'string',
        },
        {
            name: 'updated_hr',
            type: 'string',
        },
    ]
})