require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import { mergeSchemas } from '@graphql-tools/schema';
import { PostAPI } from './dataSources';
import schema from './schema';
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

        const dataSources = () => {
            return {
                postAPI: new PostAPI(),
            };
        };

        const context = () => {
            return {
                env: process.env,
            };
        };

        const server = new ApolloServer({
            schema: mergeSchemas({
                schemas: allSchemas.concat(schema),
            }),
            dataSources,
            context,
            introspection: process.env.NODE_ENV !== 'production',
        });

        server.listen(port).then(({ url }) => {
            console.log(`🚀 ready at ${url}`);
        })
    } catch (error) {
        console.log('ERROR: Failed to grab introspection queries', error);
    }
})();