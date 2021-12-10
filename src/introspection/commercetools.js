import { fetch } from 'cross-fetch';
import { wrapSchema, executor } from '../utils';
import SdkAuth from '@commercetools/sdk-auth';

export const getCommercetoolsSchema = async () => {
    const {
        COMMERCETOOLS_API,
        COMMERCETOOLS_AUTH,
        COMMERCETOOLS_SCOPES,
        COMMERCETOOLS_SECRET,
        COMMERCETOOLS_CLIENT_ID,
        COMMERCETOOLS_EXTENSION,
        COMMERCETOOLS_PROJECT_KEY
    } = process.env;

    const scopes = COMMERCETOOLS_SCOPES.split(',').map(scope => `${scope}:${COMMERCETOOLS_PROJECT_KEY}`);

    const authClient = new SdkAuth({
        host: COMMERCETOOLS_AUTH,
        projectKey: COMMERCETOOLS_PROJECT_KEY,
        disableRefreshToken: false,
        credentials: {
            clientId: COMMERCETOOLS_CLIENT_ID,
            clientSecret: COMMERCETOOLS_SECRET,
        },
        scopes,
        fetch,
    });

    const { token_type, access_token } = await authClient.clientCredentialsFlow();

    return wrapSchema(
        executor(
            `${COMMERCETOOLS_API}/${COMMERCETOOLS_PROJECT_KEY}/graphql`,
            `${token_type} ${access_token}`
        ),
        COMMERCETOOLS_EXTENSION
    );
};