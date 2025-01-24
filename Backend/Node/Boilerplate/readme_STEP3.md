# Outils pour la qualité du code et CI/CD

## Outils pour la qualité du code

1. **TypeScript (strict mode)** :
   - **Pourquoi** : TypeScript fournit une vérification statique robuste, garantissant que votre code est sûr et respectueux des types.

3. **Jest (ou Mocha/Chai)** :
   - **Pourquoi** : Fournit des tests unitaires pour garantir le bon fonctionnement de votre application. (voir test algo)

---

## Configuration d'un processus CI/CD

Les étapes principales pour automatiser la construction, tests et déploiement avec **GitHub Actions** et **Docker**:
   - **Création du fichier YAML** : Configurez l'automatisation du processus CI/CD.
   - **Installation des dépendances** : Utilisez `npm install` pour installer les modules nécessaires.
   - **Compilation du code TypeScript** : Compilez le code avec `tsc`.
   - **Testing** : Lancez les tests avec `npm test`.
   - **Construction, publication et déploiement de l'image Docker** :
     - Créez une image Docker à partir du `Dockerfile`.
     - Publiez l'image sur un registre (Docker Hub ou autre).
     - Déployez l'image sur un serveur ou une plateforme cloud.

  
