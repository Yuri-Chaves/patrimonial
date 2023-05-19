import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'


export class PatrimModel extends Model {
    static table = "Patrimonios"

    @field('nome_equip')
    nome_equip!: string;

    @field('cod_equip')
    cod_equip!: string;

    @field('tipo_equip')
    tipo_equip!: number;

    @field('placa')
    placa!: string;

    @field('empresa')
    empresa!: number;

    @field('estab')
    estab!: number;

    @field('setor')
    setor!: number;

    @field('local')
    local!: number;

    @field('updated_dt')
    updated_dt!: string;

    @field('updated_hr')
    updated_hr!: string;
}