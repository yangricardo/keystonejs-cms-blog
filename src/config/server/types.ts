import { BaseKeystoneTypeInfo, KeystoneContext } from "@keystone-6/core/types";
import { Request as ExpressRequest } from "express";

export interface Request extends ExpressRequest {
    context: KeystoneContext<BaseKeystoneTypeInfo>;
}