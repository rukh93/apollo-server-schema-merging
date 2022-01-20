require('dotenv').config();
import { ApolloServer, AuthenticationError } from 'apollo-server';
import { mergeSchemas } from '@graphql-tools/schema';
import {
    getContentfulSchema,
    getCommercetoolsSchema
} from './introspection';

const port = process.env.PORT || 4000;

(async function() {
    try {
        const allSchemas = await Promise.all(
            [
                getContentfulSchema(),
                getCommercetoolsSchema()
            ]
        );

        const server = new ApolloServer({
            schema: mergeSchemas({
                schemas: allSchemas,
            }),
            context: async ({ req }) => {
                const apiKey = req.headers['api-key'];

                if (apiKey !== process.env.API_KEY && process.env.NODE_ENV === 'production') {
                    throw new AuthenticationError('Please check your api key.');
                }

                return { apiKey };
            },
            introspection: process.env.NODE_ENV !== 'production',
        });

        server.listen(port).then(({ url }) => {
            console.log(`🚀 ready at ${url}`);
        })
    } catch (error) {
        console.log('ERROR: Failed to grab introspection queries', error);
    }
})();