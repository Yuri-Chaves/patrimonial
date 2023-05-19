import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

export class EstabsModel extends Model {
    static table = "Estabelecimentos"

    @field('empresa')
    empresa!: number;

    @field('num_estab')
    num_estab!: number;

    @field('tp_estab')
    tp_estab!: string;

    @field('nome')
    nome!: string;

    @field('abreviacao')
    abreviacao!: string;

    @field('updated_dt')
    updated_dt!: string;

    @field('updated_hr')
    updated_hr!: string;

}