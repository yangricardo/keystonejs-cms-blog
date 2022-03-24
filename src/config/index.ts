/*
Welcome to Keystone! This file is what keystone uses to start the app.

It looks at the default export, and expects a Keystone config object.

You can find all the config options in our docs here: https://keystonejs.com/docs/apis/config
*/
import { config } from '@keystone-6/core';
// Keystone auth is configured separately - check out the basic auth setup we are importing from our auth file.
import { withAuth, session } from '../../auth';
// Look in the schema file for how we define our lists, and how users interact with them through graphql or the Admin UI
import { lists } from '../../schema';

import { db } from './db';

export const keystoneServer = withAuth(
    config({
        db,
        // This config allows us to set up features of the Admin UI https://keystonejs.com/docs/apis/config#ui
        ui: {
             // For our starter, we check that someone has session data before letting them see the Admin UI.
            isAccessAllowed: (context) => !!context.session?.data,
        },
        lists,
        session,
    }),
);
