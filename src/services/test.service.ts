import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TestService {
    public getAllTest = async () => {
        return await prisma.test.findMany();
    };

    public getTestById = async (id: number) => {
        return await prisma.test.findFirst({ where: { id } });
    };

    public getTestForPost = async (postId: number) => {
        return await prisma.test.findMany({ where: {
            postId
        }})
    }
}
