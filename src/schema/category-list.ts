import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";

const CategoryList = list({
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
});

export { CategoryList };