import { list } from '@keystone-6/core';
import { relationship, select, text, timestamp } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { s3File, s3Image } from '@k6-contrib/fields-s3';
import { s3Config } from './../config/s3Config';

const PostList = list({
    fields: {
        title: text(),
        image: s3Image({ s3Config }),
        file: s3File({ s3Config }),
        status: select({
            options: [
                {label: 'Published', value: 'published'},
                {label: 'Draft', value: 'draft'},
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
                inlineConnect: true, // Habilita a conexáo com select
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
        category: relationship({
            ref: 'Category.posts',
            ui: {
                displayMode: 'cards',
                cardFields: ['name'],
                inlineEdit: { fields: ['name'] },
                linkToItem: true,
                inlineConnect: true,  
            }
        })
    }
})


export { PostList };