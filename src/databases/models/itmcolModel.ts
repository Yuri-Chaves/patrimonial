import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'


export class ItmcolModel extends Model {
    static table = "Item_coletado"

    @field('cod_coletado')
    cod_coletado!: string;

    @field('empresa_coletado')
    empresa_coletado!: number;

    @field('estab_coletado')
    estab_coletado!: number;

    @field('coleted_at_dt')
    coleted_at_dt!: string;

    @field('coleted_at_hr')
    coleted_at_hr!: string;

    @field('status')
    status!: string;

    @field('nome_equip')
    nome_equip!: string;

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

    @field('dt_atual')
    dt_atual!: string;

}