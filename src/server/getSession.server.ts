import {createServerFn} from "@tanstack/react-start";
import {auth} from "@/server/auth.ts";
import {getRequest} from "@tanstack/react-start/server";

export const getSessionServer = createServerFn()
    .handler(async ({}) => {
        const request = getRequest();

        return await auth.api.getSession({headers: request.headers});
    })