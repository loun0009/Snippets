import prisma from "../services/prisma";

class SnippetsRepository {
    public async findAll(): Promise<any> {
        const snippets = await prisma.snippet.findMany({
            orderBy: { id: 'desc' },
            include : {
                Language: true,
            },
        });
        return snippets;
    }
}

export const snippetsRepository = new SnippetsRepository();