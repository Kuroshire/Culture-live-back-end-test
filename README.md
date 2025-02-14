# Nest Module  
(Commande : `nest generate resource [module_name]`)  

## Explication du module  

- **EndPoint / HTTP Requests (API)** → **Controller**  
- **Schéma de la base de données** → **Entity**  
- **Logique métier** → **Service**  
- **Validation des arguments des requêtes** → **DTO**  

## Simplification de la base de données  

N'ayant pas réussi à générer les données en base avec le modèle initial, j'ai simplifié l'organisation des tables pour ne conserver que l'essentiel nécessaire à l'exercice.  

Dans ce modèle, seules **trois tables** sont conservées : **Customer**, **Rental**, et **Film**.  

📌 **Remplacement de la table "Inventory"**  
La table **Film** joue ici le rôle d’**inventaire** via sa colonne `id`.  
On peut avoir **plusieurs lignes** dans la table avec le **même nom de film**, ce qui permet de représenter plusieurs exemplaires du même film en base de données.  

🚫 **Suppression de la table "Inventory"**  
La table **Inventory**, présente dans le modèle original de **Sakila**, n'est pas primordiale pour l'exercice. Je l'ai donc retirée, bien que dans un contexte réel, il soit préférable de la conserver pour une meilleure gestion du stock d’un magasin.  

🛠️ **Différence avec la version Sakila**  
Dans la version originale de Sakila :  
- Un **Rental** était lié à un **Inventory** via son `inventory_id`.  
- Pour récupérer un film, il fallait d'abord passer par l'inventaire.  

Dans la version actuelle :  
- Un **Rental** est directement lié à un **Film** via son `film_id`.  

## Fonctionnalités actuelles  

Le projet propose un **CRUD complet** pour les **trois tables** (`Rental`, `Customer`, `Film`) :  

✅ **Ajout et modification et suppression possible de customers et films**  
✅ **Création de locations (rentals)**
✅ **Suppression possible sur les trois tables (pour des raisons de simplicités de manipulation de la DB lors du dévelopement)**
✅ **Propagation des modifications/suppressions** (ex : suppression d'un film/customer → suppression des rentals associés)  
✅ **Récupération de la liste (complète) des locations**  
✅ **Récupération des locations par `customerId`**  

⚠️ **Problème actuel**  
Actuellement, il est possible d'effectuer une **location (rental) sur une période où le film est déjà loué**.  
Ce problème vient du fait qu’aucune vérification n'est effectuée pour s’assurer que le film est bien **disponible** avant de l'ajouter dans un `rental`.  

---

## 🚀 Reste à faire  

🔹 **Gestion des tâches planifiées avec `@nest/schedule`**  
🔹 **Envoi de notifications avec `@nestjs/schedule`**  
   - Commencer par une notification manuelle
   - Ajouter des tâches automatiques (prévenir le customer J-5 et J-3 avant la fin de la location). Ces tâches seront créées au moment ou l'ont crée la nouvelle ligne dans rental.
   - Ajouter une route permettant de voir la liste des tâches en cours.

### 🎯 Bonus  
➕ **Stocker les informations de la DB dans un fichier `.env`**  
➕ **Initialiser la base de données avec des données de base**  
➕ **Ajouter des tests unitaires et fonctionnels sur les fonctionnalités existantes**  