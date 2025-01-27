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

La commande create permet de créer une flotte pour un utilisateur donné. 

  ```bash
  ./fleet create <userId> [fleetId]
  ```
ou 
  ```bash
 ts-node .\fleet create <userId> [fleetId]
  ```

#### Enregistrer un véhicule

Exécutez la commande suivante pour enregistrer un véhicule dans une flotte :

```bash
./fleet register-vehicle <fleetId> <vehiclePlateNumber>
```
ou
```bash
ts-node .\fleet.ts register-vehicle <fleetId> <vehiclePlateNumber>
```

### Localiser un véhicule

Pour localiser un véhicule avec des coordonnées GPS, utilisez la commande suivante :

```bash
./fleet localize-vehicle <fleetId> <vehiclePlateNumber> lat lng [alt]
```
ou

```bash
ts-node .\fleet localize-vehicle <fleetId> <vehiclePlateNumber> lat lng [alt]
```


