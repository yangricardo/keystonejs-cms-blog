import { S3Config, s3File, s3Image } from '@k6-contrib/fields-s3';
import { container } from 'tsyringe';
import { Env } from './env';

const env = container.resolve(Env);

export const s3Config: S3Config = {
    bucket: env.AWS_S3_BUCKET_NAME, // name of bucket
    // folder: "keystone",
    // baseUrl: , // if provided the url is not compouted from endpoint and folder, rather use this as `${baseUrl}/${filename}`
    s3Options: {
        // accessKeyId: env.AWS_S3_ACCESS_KEY_ID,
        // secretAccessKey: env.AWS_S3_SECRET_ACCESS_KEY,
        // endpoint: env.AWS_S3_DEFAULT_REGION, // use region for aws, endpoint for s3 compatible storage
        region: env.AWS_S3_DEFAULT_REGION,
        credentials: {
            accessKeyId: env.AWS_S3_ACCESS_KEY_ID,
            secretAccessKey: env.AWS_S3_SECRET_ACCESS_KEY,
        },
    },
    uploadParams() {
        return {
            ACL: 'public-read',
        };
    },
};
