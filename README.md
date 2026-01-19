# Prototype d'interface utilisateur React

## Description du projet

Dans le cadre de ce projet, nous avons réalisé un **prototype d’interface utilisateur en React**.  
L’application a été initialisée à l’aide de **Vite**, permettant une mise en place rapide d’un environnement moderne et performant.

**Vite** est un outil de développement front-end moderne qui, contrairement à Create React App, qui compile l’ensemble du projet à chaque modification, Vite compile uniquement les fichiers modifiés, ce qui accélère le démarrage du serveur et les rechargements HMR(Hot Module Replacement) qui modifie la page sans reload.

Nous avons choisi de travailler avec l’**API REST Countries**, une API publique gratuite et accessible via HTTP, fournissant des données au format **JSON** sur les pays du monde.  
-   Population
-   Capitale
-   Region

L’objectif principal était de comprendre la structure des données retournées par l’API et de les exploiter pour construire une interface claire, lisible et fonctionnelle.

## Fonctionnalités principales

L’application permet d’afficher une **liste dynamique de pays**, avec les fonctionnalités suivantes :

-  **Barre de recherche** pour filtrer les pays par nom  
-  **Filtre par région géographique**  (Ameriques, Afrique, Asie, etc..)
-  **Filtre par tranche de population**  
-  **Affichage de la capitale** de chaque pays
-  **Bouton Rest** pour réinitialiser les filtres
-  **Hover sur drapeaux** pour dérouler le menu d'information lié au drapeau du pays par survol du curseur

## Organisation et méthodologie

Le projet a été réalisé en **travail de programmation en binôme**, avec une alternance régulière des rôles (~30min):

- **Développeur** : implémentation du code et verbalisation des actions
- **Guide** : interaction avec la documentation et l’assistant IA, analyse et reformulation des solutions

Cette organisation a favorisé la compréhension des concepts fondamentaux de **React** (composants, états, événements, appels asynchrones) ainsi qu’une utilisation raisonnée d’un **assistant IA** comme outil pédagogique d’accompagnement.


Une opération **asynchrone** est une opération non bloquante : elle est lancée, mais son résultat sera disponible plus tard, sans arrêter l’exécution du programme.
- ici fetch() ne donne pas la réponse tout de suite -> ça renvoit une **Promise**
- await : attends que la Promise se termine

Une **Promise** est un objet JavaScript représentant la valeur future d'une opération asynchrone, c'est à dire la promesse qu'une réponse à une opération asynchrone sera disponible plus tard.
Elle peut avoir 3 états:
- pending : En attente
- fulfilled : Résolue
- rejected : Echec

Le fonctionnement de fetch() est de démarrer une requête HTTP (get:recupérer, post:envoyer, put:update, delete:suppr), puis de retourner immediatement une Promise, tout en ne bloquant pas le programme, avant d'enchaîner le traitement des données une fois la réponse disponible.
Cette promise représente la **réponse HTTP** future (l'exécution sur le navigateur)





