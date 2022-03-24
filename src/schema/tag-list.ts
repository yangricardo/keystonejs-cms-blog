import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";

const TagList = list({
    ui: {
        isHidden: true,
    },
    fields: {
        name: text(),
        posts: relationship({ ref: 'Post.tags', many: true }),
    },
});

export { TagList };
