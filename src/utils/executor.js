import { print } from 'graphql';
import { fetch } from 'cross-fetch';

const executor = (schema, token) => {
    return async ({ document, variables }) => {
        const query = print(document);
        const fetchResult = await fetch(schema, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token || '',
            },
            body: JSON.stringify({ query, variables }),
        });
        return fetchResult.json();
    }
};

export default executor;