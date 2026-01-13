# Mon Vieux Grimoire

API backend pour une application de notation et partage de livres. Projet réalisé dans le cadre de la formation Développeur Web d'OpenClassrooms (Projet 6).

## Stack technique

- **Node.js** - Runtime JavaScript
- **Express.js 5** - Framework web
- **MongoDB Atlas** - Base de données NoSQL
- **Mongoose** - ODM MongoDB
- **JWT** - Authentification par token
- **Bcrypt** - Hashage des mots de passe
- **Cloudinary** - Stockage des images
- **Sharp** - Traitement et compression d'images (WebP)
- **Multer** - Upload de fichiers

## Fonctionnalités

- Inscription et connexion des utilisateurs
- Ajout, modification et suppression de livres
- Upload et optimisation automatique des images de couverture
- Système de notation des livres (0-5 étoiles)
- Calcul automatique de la moyenne des notes
- Affichage des 3 livres les mieux notés

## Prérequis

- Node.js (v19 ou supérieur recommandé)
- Compte MongoDB Atlas
- Compte Cloudinary

## Installation

1. **Cloner le repository**
```bash
git clone https://github.com/YvanGui19/OCR-P06-MonVieuxGrimoire.git
cd MonVieuxGrimoire
```

2. **Installer les dépendances du backend**
```bash
cd backend
npm install
```

3. **Configurer les variables d'environnement**

Créer un fichier `.env` dans le dossier `backend` :
```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<database>
CLOUDINARY_CLOUD_NAME=<votre-cloud-name>
CLOUDINARY_API_KEY=<votre-api-key>
CLOUDINARY_API_SECRET=<votre-api-secret>
PORT=4000
```

4. **Lancer le serveur**
```bash
npm start
```

Le serveur démarre sur `http://localhost:4000`

## API Endpoints

### Authentification

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/signup` | Inscription d'un utilisateur |
| POST | `/api/auth/login` | Connexion d'un utilisateur |

### Livres

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/books` | Récupérer tous les livres | Non |
| GET | `/api/books/bestrating` | Récupérer les 3 meilleurs livres | Non |
| GET | `/api/books/:id` | Récupérer un livre | Non |
| POST | `/api/books` | Ajouter un livre | Oui |
| PUT | `/api/books/:id` | Modifier un livre | Oui |
| DELETE | `/api/books/:id` | Supprimer un livre | Oui |
| POST | `/api/books/:id/rating` | Noter un livre | Oui |

## Structure du projet

```
backend/
├── app.js                    # Configuration Express
├── server.js                 # Point d'entrée
├── controllers/
│   ├── book.js              # Logique métier des livres
│   └── user.js              # Logique d'authentification
├── models/
│   ├── book.js              # Schéma Book
│   └── User.js              # Schéma User
├── routes/
│   ├── book.js              # Routes des livres
│   └── user.js              # Routes d'authentification
└── middleware/
    ├── auth.js              # Vérification JWT
    ├── multer-config.js     # Configuration upload
    ├── sharp-config.js      # Traitement images
    └── cloudinary-config.js # Configuration Cloudinary
```

## Frontend

Le frontend React est disponible dans le dossier `frontend/`.

```bash
cd frontend
npm install
npm start
```

Configurer l'URL de l'API dans `frontend/.env` :
```env
REACT_APP_API_URL=http://localhost:4000
```

## Modèles de données

### User
```javascript
{
  email: String,     // unique, requis
  password: String   // hashé avec bcrypt
}
```

### Book
```javascript
{
  userId: String,       // ID du propriétaire
  title: String,
  author: String,
  imageUrl: String,     // URL Cloudinary
  year: Number,
  genre: String,
  ratings: [{
    userId: String,
    grade: Number       // 0-5
  }],
  averageRating: Number // calculé automatiquement
}
```

## Auteur

Projet réalisé par [YvanGui19](https://github.com/YvanGui19) dans le cadre de la formation OpenClassrooms.
