# MR513 - Snippets (S5)

[Lien menant au sujet](https://iut-info.univ-reims.fr/users/nourrit/restricted/cours/mr513/tp03.html)
Année universitaire 2024-2025 - INFS5-TD3

## Auteurs

LOUNGOUNDJI Enzo (loun0009)

PERROT Clément (perr0112)

## Configuration

Installation des dépendances nécessaires

```
npm install
```

Ajouter un fichier .env avec ces informations

```
port=7000
session_secret="azerty"
POSTGRES_USER=mr513
POSTGRES_PASSWORD=password
DATABASE_URL="postgresql://mr513:password@127.0.0.1:5432/snippets"
```
Lancer les conteneurs docker 
```
docker compose up -d
```

Lancer le serveur local
```
npm run watch
```

Réinitialiser la base de données
```
npx prisma migrate reset
```

Visualiser la base de données

```
npx prisma studio
```
Serveur local démarré : http://localhost:7000

Prisma Studio is up on http://localhost:5555