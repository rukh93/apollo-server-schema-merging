export default {
    Query: {
        searchMovie: async (_source, { expression }, { dataSources }) => {
            return dataSources.searchAPI.searchMovie(expression);
        },
    },
};