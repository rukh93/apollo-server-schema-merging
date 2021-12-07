export default {
    Query: {
        posts: async (_source, data, { dataSources }) => {
            return dataSources.postAPI.getItems();
        },
    },
};