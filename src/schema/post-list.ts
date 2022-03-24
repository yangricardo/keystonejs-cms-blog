import { list } from '@keystone-6/core';
import { relationship, select, text, timestamp } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';

const PostList = list({
    fields: {
        title: text(),
        status: select({
            options: [
                {value: 'Published', label: 'published'},
                {value: 'Draft', label: 'draft'},
            ],
            defaultValue: 'draft',
            // fields also have the ability to configure their appearance in the Admin UI
            ui: {
                displayMode: 'segmented-control',
            }
        }),
        content: document({
            formatting: true,
            layouts: [
                [1, 1],
                [1, 1, 1],
                [2, 1],
                [1, 2],
                [1, 2, 1],
            ],
            links: true,
            dividers: true,
        }),
        publishDate: timestamp(),
        author: relationship({
            ref: 'User.posts',
            ui: {
                displayMode: 'cards',
                cardFields: ['name', 'email'],
                inlineEdit: { fields: ['name', 'email'] },
                linkToItem: true,
                inlineCreate: { fields: ['name', 'email'] },
            },
        }),
        // We also link posts to tags. This is a many <=> many linking.
        tags: relationship({
            ref: 'Tag.posts',
            ui: {
                displayMode: 'cards',
                cardFields: ['name'],
                inlineEdit: { fields: ['name'] },
                linkToItem: true,
                inlineConnect: true,
                inlineCreate: { fields: ['name'] },
            },
            many: true,
        }),
    }
})


export { PostList };