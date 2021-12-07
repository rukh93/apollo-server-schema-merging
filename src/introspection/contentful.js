import { wrapSchema, executor } from '../utils';

export const getContentfulSchema = () => {
    const {
        CONTENTFUL_TOKEN,
        CONTENTFUL_SCHEMA,
        CONTENTFUL_EXTENSION
    } = process.env;

    return wrapSchema(
        executor(
            CONTENTFUL_SCHEMA,
            `Bearer ${CONTENTFUL_TOKEN}`
        ),
        CONTENTFUL_EXTENSION
    );
};