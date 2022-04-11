import { BaseKeystoneTypeInfo, DatabaseConfig } from "@keystone-6/core/types";
import { Env } from './env';

// the db sets the database provider - we're using sqlite for the fastest startup experience
const buildDataBaseConfiguration = ({ 
    // DB_URL,
    // DB_LOGGING,
    // DB_MIGRATIONS,
}: Env): DatabaseConfig<BaseKeystoneTypeInfo> => ({
    provider: 'sqlite',
    url: 'file:./keystone.db',
});

export { buildDataBaseConfiguration };