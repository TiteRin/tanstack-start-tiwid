import {PrismaHomeRepository} from "@/features/home/infrastructure/PrismaHomeRepository.ts";
import {getHomePageData} from "@/features/home/server/getHomePageData.ts";

export async function getHomeServerData(userId: string) {
    const repository = new PrismaHomeRepository();
    return await getHomePageData(userId, repository);
}