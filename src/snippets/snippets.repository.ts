import prisma from "../services/prisma";

class SnippetsRepository {
    public async findAll(languageId:number|null): Promise<any> {
        const snippets = await prisma.snippet.findMany({
            orderBy: { id: 'desc' },
            where: languageId ? { languageId } : {},
            include : {
                Language: true,
            },
        });
        return snippets;
    }
}

export const snippetsRepository = new SnippetsRepository();