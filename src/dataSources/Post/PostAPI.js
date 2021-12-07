import { RESTDataSource } from 'apollo-datasource-rest';

class PostAPI extends RESTDataSource {
    get baseURL() {
        return this.context.env.DUMMY_REST_API;
    }

    willSendRequest(request) {
        request.headers.set('Authorization', this.context.env.DUMMY_REST_API_KEY);
    }

    async getItems() {
        const { items, success } = await this.post('/posts');

        if (!success) {
            return [];
        }

        return items;
    }
}

export default PostAPI;