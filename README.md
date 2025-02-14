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
✅ **Implémentation d'un service d'envoi d'email (factice, avec des logs)**  
✅ **Ajout d'une 4e table `ScheduledTask`, qui représente en DB les emails envoyés aux clients, avec un status indiquant s'ils sont en attentes d'envoi ou déjà envoyés.**  
✅ **Ajout automatique de 2 tâches planifiées à la création d'une entité rental en DB pour J-3 et J-5 (_NOTE: chacune des ces taches n'est crée que si elle fait sens. Exemple: On n'enverra pas de mail pour J-5 si la location ne dure que 4 jours._)**  
✅ **Possibilité de récupérer une liste complète de toutes les tâches planifiées qui n'ont pas encore été envoyées**  
✅ **Méthode permettant d'executer manuellement une tâche planifiée en fournissant l'id de cette dernière (elle sera executée automatiquement au prochain passage du cron)**  

⚠️ **Problème actuel**  
Actuellement, il est possible d'effectuer une **location (rental) sur une période où le film est déjà loué**.  
Ce problème vient du fait qu’aucune vérification n'est effectuée pour s’assurer que le film est bien **disponible** avant de l'ajouter dans un `rental`.  

### 🎯 Bonus - Point à rajouter dans le projet  
➕ **Stocker les informations de la DB dans un fichier `.env`**  
➕ **Initialiser la base de données avec des données prédéfinis**  
➕ **Ajouter des tests unitaires et fonctionnels sur les fonctionnalités existantes**  