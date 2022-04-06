import { BaseKeystoneTypeInfo, ServerConfig } from "@keystone-6/core/types";
import { formatISO, secondsToMinutes, secondsToHours } from "date-fns";

export const buildServerConfiguration = (): ServerConfig<BaseKeystoneTypeInfo> => {
    return {
        healthCheck: {
            path: "/_healthcheck",
            data: () =>({
                status: "healthy",
                timestamp: Date.now(),
                uptime: process.uptime(),
                iso: {
                    timestamp: formatISO(Date.now()),
                    uptimeMinutes: secondsToMinutes(process.uptime()),
                    uptimeHours: secondsToHours(process.uptime()),
                }
            })
        },
        cors: true,
        port: 4000,
    }
}