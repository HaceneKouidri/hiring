# Application de gestion de flotte

Cette application permet de gérer des flottes de véhicules, d'enregistrer des véhicules et de localiser ces derniers sur une carte grâce à des coordonnées GPS.

---

## Prérequis

### PostgreSQL

- Assurez-vous que PostgreSQL est installé et en cours d'exécution sur votre machine.
- Créez une base de données dédiée à l'application :

  ```sql
  CREATE DATABASE Full_db;
  ```

### Node.js

- Installez Node.js si ce n'est pas déjà fait.
- Installez les dépendances du projet avec la commande suivante :

  ```bash
  npm install
  ```

---

## Commandes disponibles

### Enregistrer un véhicule dans une flotte

#### Créer une flotte

- Utilisez un UUID valide pour représenter la flotte.
- Vous pouvez générer un UUID avec la commande suivante :

  ```bash
  node -e "console.log(require('uuid').v4())"
  ```

  Exemple :

  ```
  550e8400-e29b-41d4-a716-446655440000
  ```

#### Enregistrer un véhicule

Exécutez la commande suivante pour enregistrer un véhicule dans une flotte :

```bash
npm run fleet:register-vehicle <fleetId> <vehiclePlateNumber>
```

Exemple :

```bash
npm run fleet:register-vehicle -- 550e8400-e29b-41d4-a716-446655440000 ABC-123
```

Résultat attendu :

```
Véhicule ABC-123 enregistré dans la flotte 550e8400-e29b-41d4-a716-446655440000
```

---

### Localiser un véhicule

Pour localiser un véhicule avec des coordonnées GPS, utilisez la commande suivante :

```bash
npm run fleet:park-vehicle <fleetId> <vehiclePlateNumber> <latitude> <longitude> [altitude]
```

Exemple :

```bash
npm run fleet:park-vehicle -- 550e8400-e29b-41d4-a716-446655440000 ABC-123 48.8566 2.3522 35
```

Résultat attendu :

```
Véhicule ABC-123 localisé à (48.8566, 2.3522, 35) dans la flotte 550e8400-e29b-41d4-a716-446655440000
```

