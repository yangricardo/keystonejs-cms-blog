import { BaseKeystoneTypeInfo, DatabaseConfig } from "@keystone-6/core/types";

// the db sets the database provider - we're using sqlite for the fastest startup experience
const buildDataBaseConfiguration = (): DatabaseConfig<BaseKeystoneTypeInfo> => ({
    provider: 'sqlite',
    url: 'file:./keystone.db',
});

export { buildDataBaseConfiguration };