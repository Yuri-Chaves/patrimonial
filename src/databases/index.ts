import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { schemas } from './schemas';

import { EstabsModel } from './models/estabsModel';
import { PatrimModel } from './models/patrimModel';
import { ItmcolModel } from './models/itmcolModel';

const adapter = new SQLiteAdapter({
    schema: schemas
})

export const database = new Database({
    adapter,
    modelClasses: [EstabsModel, PatrimModel, ItmcolModel]
})