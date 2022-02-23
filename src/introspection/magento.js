import { wrapSchema, executor } from '../utils';

export const getMagentoSchema = () => {
    const {
        MAGENTO_SCHEMA,
        MAGENTO_EXTENSION
    } = process.env;

    return wrapSchema(
        executor(MAGENTO_SCHEMA),
        MAGENTO_EXTENSION
    );
};