import {createServerFn} from "@tanstack/react-start";
import {getRequest} from "@tanstack/react-start/server";
import {requireUser} from "@/server/requireUser.ts";
import {getHomePageDataImpl} from "@/features/home/server/home.server.ts";

export const getHomePageDataServer = createServerFn()
    .handler(async ({}) => {
        const request = getRequest();
        const userId = await requireUser(request.headers);

        return await getHomePageDataImpl(userId);
    });