# Movies App

Application web moderne de découverte et gestion de films développée avec Angular 18, intégrant l'API TMDB (The Movie Database) et Firebase pour l'authentification.

![Angular](https://img.shields.io/badge/Angular-18.2-red?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-11.0-orange?logo=firebase)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple?logo=bootstrap)

## Fonctionnalités

- **Catalogue de films** — Parcourir une large collection de films via l'API TMDB
- **Recherche avancée** — Filtrer les films par genre, titre, etc.
- **Détails complets** — Informations détaillées sur chaque film (synopsis, casting, etc.)
- **Favoris** — Sauvegarder vos films préférés (nécessite une connexion)
- **Commentaires** — Laisser et consulter des avis sur les films
- **Authentification** — Système d'inscription/connexion avec Firebase Auth
- **Interface responsive** — Design moderne avec Angular Material et Bootstrap
- **SSR** — Rendu côté serveur pour de meilleures performances

## Stack Technique

### Frontend

- **Framework** : Angular 18.2 (Standalone Components)
- **Langage** : TypeScript 5.5
- **UI** : Angular Material 18.2 + Bootstrap 5.3
- **Icônes** : Font Awesome 6.5
- **Animations** : Angular Animations
- **Routing** : Angular Router avec guards d'authentification

### Backend & Services

- **API Films** : TMDB API
- **Authentification** : Firebase Authentication
- **Base de données** : Firebase Firestore
- **SSR** : Angular Universal / Angular SSR

### DevOps

- **Containerisation** : Docker + Nginx
- **Build Tool** : Angular CLI 18.2
- **Testing** : Jasmine + Karma

## Prérequis

- Node.js (v18 ou supérieur)
- npm ou yarn
- Un compte [TMDB](https://www.themoviedb.org/) pour obtenir une clé API
- Un projet [Firebase](https://firebase.google.com/) configuré

## Installation

1. **Cloner le repository**

```bash
git clone https://github.com/KarimBenkirane/movies-app.git
cd movies-app
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configuration des variables d'environnement**

Créer un fichier `src/environments/environment.ts` :

```typescript
export const environment = {
  production: false,
  tmdb: {
    api_key: "VOTRE_CLE_API_TMDB",
  },
  firebase: {
    apiKey: "VOTRE_API_KEY",
    authDomain: "VOTRE_AUTH_DOMAIN",
    projectId: "VOTRE_PROJECT_ID",
    storageBucket: "VOTRE_STORAGE_BUCKET",
    messagingSenderId: "VOTRE_MESSAGING_SENDER_ID",
    appId: "VOTRE_APP_ID",
  },
};
```

Et `src/environments/environment.development.ts` pour le développement.

4. **Lancer l'application**

```bash
npm start
```

L'application sera accessible sur `http://localhost:4200/`

## Docker

Pour déployer l'application avec Docker :

```bash
# Build l'image
docker build -t movies-app .

# Lancer le container
docker run -p 80:80 movies-app
```

## Structure du Projet

```
movies-app/
├── src/
│   ├── app/
│   │   ├── components/       # Composants Angular
│   │   │   ├── connexion/
│   │   │   ├── inscription/
│   │   │   ├── liste-films/
│   │   │   ├── film-details/
│   │   │   ├── favorite-films/
│   │   │   ├── navbar/
│   │   │   └── ...
│   │   ├── guards/           # Guards de routing
│   │   ├── models/           # Interfaces TypeScript
│   │   ├── services/         # Services Angular
│   │   │   ├── auth.service.ts
│   │   │   ├── films-helper.service.ts
│   │   │   ├── favorites.service.ts
│   │   │   ├── comments.service.ts
│   │   │   └── ...
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── Dockerfile
├── nginx.conf
├── package.json
└── README.md
```

## Tests

```bash
# Lancer les tests unitaires
npm test

# Lancer les tests en mode watch
npm run test -- --watch
```

## Build

```bash
# Build de production
npm run build

# Build avec SSR
npm run build && npm run serve:ssr:movies-app
```
