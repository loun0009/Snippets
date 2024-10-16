import prisma from "../services/prisma";

export async function languageValidator(languageId: string): Promise<boolean> {
    await prisma.language.findUniqueOrThrow({
        where: {
            id: Number(languageId) 
        },
    });

    return true;
}
                