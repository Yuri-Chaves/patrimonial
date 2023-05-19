import { appSchema } from '@nozbe/watermelondb';

import { estabsSchema } from './estabsSchema';
import { patrimSchema } from './patrimSchema';
import { itmcolSchema } from './itmcolSchema';

export const schemas = appSchema({
    version: 1,
    tables:[ estabsSchema, patrimSchema, itmcolSchema]
});