// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Score } = initSchema(schema);

export {
  Score
};