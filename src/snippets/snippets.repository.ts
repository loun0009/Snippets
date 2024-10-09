class SnippetsRepository {
    public findAll(): any {
        throw new Error("Ceci est un message d'erreur");
    }
}

export const snippetsRepository = new SnippetsRepository();