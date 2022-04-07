import DotEnv from "dotenv";
import Joi from "joi";

export class Env {
    PORT: number;
    SESSION_SECRET: string;
    STATELLESS_SESSIONS_MAX_AGE_DAYS: number;
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_SCHEMA: string;
    DB_URL: string;
    DB_LOGGING: boolean;
    DB_MIGRATIONS: boolean;
    ADMIN_UI_ENABLED: boolean;
    CLOUDINARY_CLOUDNAME: string;
    CLOUDINARY_APIKEY: string;
    CLOUDINARY_APISECRET: string;
    SOCKET_IO_CLIENT_ENDPOINT: string;
    AWS_S3_ACCESS_KEY_ID: string;
    AWS_S3_SECRET_ACCESS_KEY: string;
    AWS_S3_DEFAULT_REGION: string;
    AWS_S3_BUCKET_NAME: string;
    MAX_FILE_UPLOAD_SIZE: number;
    ADMIN_EMAIL?: string;
    ADMIN_PASSWORD?: string;
    ADMIN_NAME?: string;

    constructor() {
        const env = Env.getEnv();
    }

    static getEnv() {
        DotEnv.config();
        const envSchema = Joi.object<Env>({
            PORT: Joi.number().default(4000),
            SESSION_SECRET: Joi.string()
                .optional()
                .default(
                    "2648621503275824808373177417432623526984682249051803821953179137935259456533061070755767506767652486"
                ),
            STATELLESS_SESSIONS_MAX_AGE_DAYS: Joi.number().optional().default("30"),
            DB_HOST: Joi.string().default("0.0.0.0"),
            DB_PORT: Joi.number().default(5432),
            DB_USERNAME: Joi.string().default("postgres"),
            DB_PASSWORD: Joi.string().default("postgres"),
            DB_NAME: Joi.string().default("postgres"),
            DB_SCHEMA: Joi.string().default("public"),
            DB_URL: Joi.string().dataUri().optional(),
            DB_LOGGING: Joi.boolean().default(false),
            DB_MIGRATIONS: Joi.boolean().default(true),
            ADMIN_UI_ENABLED: Joi.boolean().default(true),
            CLOUDINARY_APIKEY: Joi.string().required(),
            CLOUDINARY_APISECRET: Joi.string().required(),
            CLOUDINARY_CLOUDNAME: Joi.string().required(),
            SOCKET_IO_CLIENT_ENDPOINT: Joi.string()
                .uri()
                .default("http://localhost:5000"),
            AWS_S3_ACCESS_KEY_ID: Joi.string().required(),
            AWS_S3_SECRET_ACCESS_KEY: Joi.string().required(),
            AWS_S3_BUCKET_NAME: Joi.string().required(),
            AWS_S3_DEFAULT_REGION: Joi.string().required(),
            MAX_FILE_UPLOAD_SIZE: Joi.number().default(2 * 1024 * 1024),
            ADMIN_EMAIL: Joi.string().email().optional(),
            ADMIN_PASSWORD: Joi.string().optional(),
            ADMIN_NAME: Joi.string().default("Admin PFC"),
        }).unknown(true);

        const validated = envSchema.validate(
            {
                ...process.env,
            },
            {
                abortEarly: false,
            }
        );

        if (validated.error) {
            console.error("Env Errors:", validated.error.details);
            process.exit(1);
        }

        const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_SCHEMA } =
            validated.value;
        validated.value.DB_URL =
            validated.value.DB_URL ||
            `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=${DB_SCHEMA}`;
        
        console.log("✨ Successfully configured environment variables");
        return validated.value; 
    }
}