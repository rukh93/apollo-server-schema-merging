import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

const typeDefs = mergeTypeDefs(
    loadFilesSync(
        path.join(__dirname, './typeDefs'), {
            extensions: ['graphql']
        }
    )
);
const resolvers = mergeResolvers(
    loadFilesSync(
        path.join(__dirname, './resolvers'), {
            extensions: ['js']
        }
    )
);

export default makeExecutableSchema({
    typeDefs,
    resolvers,
});