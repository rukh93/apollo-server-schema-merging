import { RESTDataSource } from 'apollo-datasource-rest';

class Search extends RESTDataSource {
    get baseURL() {
        return this.context.env.IMDB_API_URI;
    }

    async searchMovie(expression) {
        const { results, errorMessage } = await this.makeGetRequest('SearchMovie', expression);

        if (errorMessage) {
            return [];
        }

        return results;
    }

    makeGetRequest(apiUrl, expression, lang = 'en') {
        return this.get( `/${lang}/API/${apiUrl}/${this.context.env.IMDB_API_KEY}/${expression}`);
    }
}

export default Search;