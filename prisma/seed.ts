import { PrismaClient } from '@prisma/client';
    
const prisma = new PrismaClient();
    
async function main() {
    await prisma.snippet.create({
        data: {
            title: 'Hello World',
            code:
`main()
{
    printf("hello, world\\n");
}`,
            description: 'Code original publié dans "The C Programming Language" de Brian Kernighan et Dennis Ritchie.',
            creationDate: new Date(2023, 4, 8, 9, 12, 36),
        }
    });

    await prisma.snippet.create({
        data: {
            title: 'Il faut protéger ses chaînes de caractères',
            code: '<script>window.alert("Injection !")</script>',
            creationDate: new Date(2023, 3, 4, 5, 6, 7),
            description: 'Dans le template EJS, observez le comportement de la page en utilisant successivement les balises <%- et <%=pour injecter les données.', 
        }
    });

    await prisma.snippet.create({
        data: {
            title: 'Lien de téléchargement',
            code: '<a href="url" download>Télécharger</a>',
            creationDate: new Date(2023, 3, 4, 5, 6, 7),
            description: "L'attribut download permet de forcer le téléchargement du fichier, même si le navigateur.",
        }
    });
}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});