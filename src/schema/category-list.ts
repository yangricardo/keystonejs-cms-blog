import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";
import { byTracking, ByTrackingOptions } from '@k6-contrib/list-plugins';

const withByTracking = byTracking({} as ByTrackingOptions);

const CategoryList = list(withByTracking({
    fields: {
        name: text({ validation: { isRequired: true } }),
        posts: relationship({ 
            ref: 'Post.category',
            many: true,
            ui: {
                displayMode: 'cards',
                cardFields: ['title'],
                inlineEdit: { fields: ['title'] },
                linkToItem: true,
                inlineConnect: true, 
            },
        }),
    }
}));

export { CategoryList };