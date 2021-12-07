import {
    wrapSchema,
    introspectSchema,
    RenameInputObjectFields,
    RenameInterfaceFields,
    RenameObjectFields,
    RenameTypes
} from '@graphql-tools/wrap';

const wrapper = async (executor, extension) => {
    const renameSchemaData = (name, extension) => extension ? `${extension}_${name}` : name;

    return wrapSchema({
        schema: await introspectSchema(executor),
        transforms: [
            new RenameTypes(name => renameSchemaData(name, extension)),
            new RenameObjectFields((typeName, name) => renameSchemaData(name, extension)),
            new RenameInterfaceFields((typeName, name) => renameSchemaData(name, extension)),
            new RenameInputObjectFields((typeName, name) => renameSchemaData(name, extension))
        ],
        executor,
    });
};

export default wrapper;