import {PrismaHomeRepository} from "@/features/home/infrastructure/PrismaHomeRepository.ts";
import {GetHomePageDataUseCase} from "@/features/home/domain/GetHomePageDataUseCase.ts";

export async function getHomePageDataImpl(userId: string) {
    const repository = new PrismaHomeRepository();
    const useCase = new GetHomePageDataUseCase(repository);
    return await useCase.execute({userId});
}