import { BaseKeystoneTypeInfo, CreateRequestContext } from "@keystone-6/core/types"
import { Express } from "express";
import { Request } from "./types";

export const extendsExpressApp = (
    app: Express, 
    createContext: CreateRequestContext<BaseKeystoneTypeInfo>
) => {
    app.use(async (req: Request, res, next) => {
        req.context = await createContext(req, res);
        next();
    });
    // app.use("/rest", routes);
}