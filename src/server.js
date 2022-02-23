require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import { mergeSchemas } from '@graphql-tools/schema';
import {
    getMagentoSchema,
    getContentfulSchema
} from './introspection';

const port = process.env.PORT || 4000;

(async function() {
    try {
        const allSchemas = await Promise.all(
            [
                getMagentoSchema(),
                getContentfulSchema(),
            ]
        );

        const server = new ApolloServer({
            schema: mergeSchemas({
                schemas: allSchemas,
            }),
            introspection: process.env.NODE_ENV !== 'production',
        });

        server.listen(port).then(({ url }) => {
            console.log(`🚀 ready at ${url}`);
        })
    } catch (error) {
        console.log('ERROR: Failed to grab introspection queries', error);
    }
})();