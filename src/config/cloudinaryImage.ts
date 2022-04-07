import { BaseListTypeInfo, CommonFieldConfig } from "@keystone-6/core/types";
import { Env } from "./env";
import { cloudinaryImage as CI } from "@keystone-6/cloudinary";
import { container } from "tsyringe";

declare type CloudinaryImageFieldConfig<ListTypeInfo extends BaseListTypeInfo> = 
    CommonFieldConfig<ListTypeInfo> & {
        cloudinary: {
            cloudname?: string;
            apiKey?: string;
            apiSecret?: string;
            folder?: string;
        },
        db?: {
            map?: string;
        }
    }

export const cloudinaryImage = <ListTypeInfo extends BaseListTypeInfo>(
    data: CloudinaryImageFieldConfig<ListTypeInfo>
) => {
    const { CLOUDINARY_APIKEY, CLOUDINARY_APISECRET, CLOUDINARY_CLOUDNAME } = 
        container.resolve(Env);

    return CI({
        ...data,
        cloudinary: {
            cloudName: CLOUDINARY_CLOUDNAME,
            apiKey: CLOUDINARY_APIKEY,
            apiSecret: CLOUDINARY_APISECRET,
            folder: data.cloudinary.folder,
        }
    })
}