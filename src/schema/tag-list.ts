import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";
import { configureTracking } from "@k6-contrib/list-plugins";

const withAtTracking = configureTracking({});

const TagList = list(withAtTracking({
    ui: {
        isHidden: true,
    },
    fields: {
        name: text(),
        posts: relationship({ ref: 'Post.tags', many: true }),
    },
}));

export { TagList };
