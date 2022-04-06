import { config } from '@keystone-6/core';
import { withAuth, session } from '../../auth';
import { lists } from '../schema';

import { buildDataBaseConfiguration } from './db';
import { buildServerConfiguration } from './server';

const db = buildDataBaseConfiguration();
const server = buildServerConfiguration();

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
