import { config } from '@keystone-6/core';
import container from './ioc';

import { lists } from '../schema';
import { withAuth, session } from '../../auth';
import { Env } from './env';
import { buildDataBaseConfiguration } from './db';
import { buildServerConfiguration } from './server';

const env = container.resolve(Env);

const db = buildDataBaseConfiguration(env);
const server = buildServerConfiguration(env);


export const keystoneServer = withAuth(
    config({
        db,
        ui: {
            isAccessAllowed: (context) => !!context.session?.data,
        },
        lists,
        session,
        server,
    }),
);
