# Toutes les démarches avec le LLM 

## Prompt initial
 « Mon collègue et moi nous avons un exercice à faire dans le cadre de notre formation, on a pour rôle de réaliser un prototype d'interface utilisateur via React. Les données sont fournies par une API (publique et existante). On cherche à comprendre la structure des données, construire une interface claire et fonctionnelle, mettre en œuvre les bases d’un Framework frontend moderne, utiliser un assistant IA pour accélérer votre montée en compétence. On cherche à comprendre le fonctionnement de React. Explique nous étape par étape, avec des mots simples et si possible sourcer. Donne-nous chaque manipulation à faire ; précise les bouts de code commentés et dis ou ils se trouvent/ ou doivent-ils être intégrés au code. Agis comme un assistant plutôt que de nous donner les réponses directement. »

---

Réponse de l’IA : 
 
-   Créer le projet React (Vite) : générer le projet, installer, lancer, utilisation de commandes dans le bash 

>npm create vite 
>npm install  
>npm run dev (Cette commande nous permettra de lancer la page navigateur React) 

Structurer le code : travailler surtout dans le répertoire src/App.jsx, prévoir des composants dans src/components/. 
Plan UI :
- une liste + un détail (au clic). 
- Coder la logique React dans App.jsx : 

    -   États : posts, selectedId, selectedPost, loading, error 
    -   useEffect pour charger la liste au démarrage 
    -   Affichage : liste cliquable + panneau détail + messages “chargement/erreur”. 

**useEffect** est un hook React qui permet d’exécuter des effets secondaires dans un composant fonctionnel. 

Un effet secondaire est une opération qui : 
-   N’est pas directement liée au rendu visuel 
-   Interagit avec l’extérieur du composant 

Dans notre application useEffect va nous être nécessaire pour: 
-   Le rendu d’affichage des pays 
-   Que les données soient récupérées d’une API externe 
-   Les filtres soient sauvegardés localement 

 

* L’IA a tout de suite proposé un plan d’action avant qu’on lui donne la consigne et les attendus à l’étape 1. Donc nous lui avons donné un deuxième prompt : 
 
 
 
## Prompt : « Étape 1 - Initialisation du projet Notre objectif est de créer un projet React et Comprendre la structure des fichiers Les Attendus sont d'avoir une Application lancée sans erreur, une Explication du rôle des dossiers et fichiers principaux. » 
 

 --- 

Réponse de l’IA : 
 
React (Vite) 

Vérifier les prérequis dans le terminal : 

- node -v et npm -v → obtenir des versions. 

Initialiser le projet : 

- npm create vite@latest mon-prototype -- --template react 

- cd mon-prototype 

- npm install 

- npm run dev 

Attendu : l’app se lance sans erreur + URL type http://localhost:5173/. 

 
 
* On a dû réouvrir un second terminal, sur le chemin où se trouve notre projet.

 

## Prompt: Je souhaite récupérer des données depuis l’API gratuite suivante: The Movie Database qui doit être accessible via HTTP retourner des données JSON. On cherche à avoir un appel HTTP fonctionnel, des données visibles dans la console et veut des conceptes asynchrone avec une gestion simple des erreurs
 
Réponses clés  

Comprendre le point bloquant : TMDB nécessite une authentification (token), sinon l’appel HTTP échoue.  

Trop compliqué car le site hébergeur demande une inscription, nous cherchons à faire simple, en utilisant une API gratuite. 

 
 
## Prompt : « Remplace l'API par REST Countries, avec les mêmes explications, sans demande de s'inscrire » 
 
Remplacer l’API TMDB par REST Countries pour avoir: 

Appel HTTP fonctionnel 

 JSON visible dans la console 

 Async/await 

gestion simple des erreurs 
 

1) Choisir un endpoint 

Utiliser /v3.1/all avec fields= pour limiter les données: 
https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags

2) Faire l'appel HTTP dans React

Ouvrir src/App.jsx (dans VS Code)
Replacer le contenu par un code qui :
- lance un `useEffect`
- définit une fonction async `loadCountries()`
- fait `fetch(url)`
- vérifie `response.ok` sinon `throw`
- fait `await response.json()`
- `console.log("REST Countries (JSON):", data)` + un exemple `data[0]`
- `catch` → `console.error(...)`

---

### 3) Vérifier dans le navigateur

- Terminal : `npm run dev`
- Navigateur : ouvrir `http://localhost:5173`
- Console (F12) : vérifier que vous voyez : REST Countries (JSON):[...]

---

### 4) Concepts asynchrones rappelés

- `fetch` = requête réseau asynchrone  
- `await` = “attends la fin”  
- `response.json()` = asynchrone aussi  
- `try / catch` = attrape erreurs réseau / HTTP / parsing  

L’URL d’une API est toujours écrite dans le code JavaScript, dans l’appel `fetch()`, et c’est elle qui détermine les données reçues.


---


## Bonne pratique : appel API dans JSX
### Prompt

> « est-ce une bonne pratique d'appeler directement l'API dans le point jsx »

---

### Réponse de l’IA

**Réponse principale :**
- Ce n’est pas une bonne pratique d’appeler l’API directement dans un composant JSX à moyen / long terme
- C’est acceptable pour apprendre, tester ou faire un POC

**Pourquoi on l’a fait au début ?**
- Pour apprendre :
  - Comprendre `fetch`, `async / await`
  - Vérifier que l’API fonctionne
  - Voir rapidement les données dans la console
- Pour simplifier :
  - Moins de fichiers
  - Logique plus directe
- OK en contexte pédagogique

**Pourquoi ce n’est pas une bonne pratique ensuite ?**
- Mélange des responsabilités :
  - Le composant gère l’UI
  - L’API devrait gérer les données
- Code peu réutilisable
- Composant trop gros et illisible
- Difficile à maintenir et tester

Structure conseillée : src/api/restCountries.js

Bénéfices de cette approche :
- Code plus clair
- Séparation des rôles
- Bonne maintenabilité


---


## Affichage des données
### Prompt

> « Nous avons terminé la connexion de l'API RestCountries et maintenant on veut afficher les données sous forme de liste ou carte.  
> Il est nécessaire d’obtenir un composant dédié à l’affichage ; avoir un rendu dynamique et avoir une gestion du cas "aucune donnée" »

---

### 1) Créer un composant d’affichage dédié

Créer le dossier : src/components/

Dans ce components, l’IA nous fait :
- recevoir `countries` en props
- afficher “Aucune donnée à afficher.” si `countries` est vide ou absent
- faire le rendu dynamique avec `countries.map(...)`
- prévoir des garde-fous si certains champs manquent (nom / région / capitale / drapeau)

---

### 2) Brancher le composant dans `App.jsx`

Modifier `src/App.jsx` pour :
- stocker les données dans un `useState` (`countries`)
- gérer `loading` et `error`
- appeler l’API dans `useEffect`
- mettre les pays dans le state (`setCountries`)

Check final demandé (attendus)
-   Vous voyez des cartes de pays à l’écran
-   C’est généré dynamiquement via map
-   Si les données sont vides, vous voyez “Aucune donnée à afficher.”
-   Si l’API échoue, vous voyez un message d’erreur


---


## Interaction utilisateur : recherche et filtres
### Prompt

> « On change notre objectif qui est maintenant de permettre à l’utilisateur d’interagir avec les données : Avoir une barre de recherche pour choisir
> les pays, avoir un jeu de données de 100 pays dans une liste, on met un filtre pour savoir dans quelle région il appartient, s'il a moins de 10000 habitants,
> si entre 10000 et 2 millions habitants, s'il a plus de 2 millions d'habitants et indique aussi la capitale de ce pays. Attendus : Gestion d'évènement, UI interactive »


### Jeu de Données
- **100 pays** disponibles dans la liste
- Informations complètes pour chaque pays :
  - Nom du pays
  - Région géographique
  - Population
  - Capitale

###  Système de Filtrage

#### Filtre par Région
- Filtrage par région géographique (Afrique, Asie, Europe, Amériques, Océanie)

#### Filtre par Population
Les pays sont catégorisés selon trois tranches de population :

| Catégorie | Population |
|-----------|------------|
| 🏘️ Petite | < 50 000 habitants |
| 🏙️ Moyenne | Entre 50 000 et 5 000 000 habitants |
| 🌆 Grande | > 5 000 000 habitants |

#### Informations Affichées
- **Nom du pays**
- **Région géographique**
- **Tranche de population**
- **Capitale**

## Attendus Techniques

### Gestion d'Événements
- ✅ Événements de recherche (input, change)
- ✅ Événements de filtrage (click, change)
- ✅ Mise à jour dynamique de l'affichage
- ✅ Gestion des interactions utilisateur

### Interface Utilisateur Interactive
- ✅ Interface responsive
- ✅ Feedback visuel en temps réel
- ✅ Affichage dynamique des résultats
- ✅ Expérience utilisateur fluide


---


## Amélioration de l’expérience utilisateur
### Prompt

> « On souhaite améliorer l'expérience utilisateur en ajoutant un loader, un message d'erreur et une sauvegarde locale (local storage) »


### Ajouter un Loader + Message d'Erreur (dans `App.jsx`)
####  Loader de Chargement

Créer une ligne de code pour afficher un indicateur de chargement :
```jsx
{loading && Chargement…}
```

**Fonctionnement :**
- Tant que `loading` est `true`, le message "Chargement…" s'affiche
- Sinon, rien ne s'affiche

#### Message d'Erreur

Afficher une erreur si un problème survient lors du chargement :
```jsx
{error && Erreur : {error}}
```

**Fonctionnement :**
- Si `error` contient une valeur, le message d'erreur s'affiche en rouge (crimson)
- Le message affiche le contenu de l'erreur

---

### Sauvegarde Locale (Local Storage)
#### Fonctionnalités du Local Storage

- **Persistance des données** : Les données restent disponibles même après fermeture du navigateur
- **Amélioration UX** : Évite de recharger les données à chaque visite
- **Performance** : Réduit les appels API inutiles


---

## ✨ Résumé des Améliorations

| Fonctionnalité | Impact UX | Implémentation |
|----------------|-----------|----------------|
| 🔄 Loader | Feedback visuel pendant le chargement | Conditionnel avec `loading` |
| ❌ Message d'erreur | Informe l'utilisateur des problèmes | Conditionnel avec `error` |
| 💾 Local Storage | Persistance et performance | API `localStorage` |


---


## Bonus UX Proposé : Bouton "Réinitialiser Filtres"
### Prompt

> À partir de mon code actuel, aide-moi à créer un composant pour la section "rechercher des pays", et un composant pour afficher les résultats.


### 🏗️ Solution : Séparation en 2 Composants Clairs

---


## 1️⃣ `CountrySearch.jsx`

### Responsabilités

- 🔍 Gère la **recherche** et les **filtres** (région, population)
- 📝 Contient les champs `input` et `select`
- ⚡ Déclenche des événements (`onChange`)
- ❌ **Ne fait AUCUN appel API**


## 2️⃣ `CountryResults.jsx`

### Responsabilités

- 📊 Gère l'**affichage des résultats**
- 🗂️ Affiche une **liste/cartes** de pays
- ⚠️ Gère le cas **"aucun résultat"**


## 🎛️ `App.jsx` - Le Chef d'Orchestre

### Responsabilités

- 📡 **Charge les données** (API ou Local Storage)
- 💾 **Stocke l'état** (`search`, `region`, `popBucket`)
- 🔍 **Filtre les pays** selon les critères
- 🎁 **Passe les valeurs + fonctions** (props) aux composants



## 📊 Architecture Finale
```
App.jsx (Chef d'orchestre)
├── CountrySearch.jsx (Interface de recherche/filtres)
│   ├── Input de recherche
│   ├── Select région
│   ├── Select population
│   └── Bouton réinitialiser
└── CountryResults.jsx (Affichage des résultats)
    ├── Gestion du loading
    ├── Gestion des erreurs
    ├── Message "aucun résultat"
    └── Liste/cartes des pays
```


---



## Interaction au Survol - Carte de Pays Extensible
### Prompt

> Je veux que lorsque l'on pose notre curseur sur les drapeaux, cela étend la carte du tableau pour afficher les informations du pays. Explique-moi simplement comment intégrer ce code à mon projet.

---

## 💡 Réponse de l'IA - Solution Simple avec CSS

### Principe de Fonctionnement
- ✅ Ajouter une zone d'infos cachées dans la carte du pays (capitale, région, population)
- ✅ Utiliser uniquement du CSS avec `:hover`
- ✅ Au survol, la carte s'agrandit
- ✅ Les infos apparaissent progressivement
- ❌ **Aucun state React nécessaire**
- ❌ **Aucune logique JavaScript compliquée**


## 🔧 Comment Intégrer ce Code à Votre Projet
### Étape : Modifier le Composant

Ajoutez la classe `country-details` autour des informations que vous souhaitez afficher au survol dans `CountryResults.jsx`.

### Étape 2️⃣ : Ajouter les Styles CSS

Copiez le CSS ci-dessus dans votre fichier de styles principal (ex: `App.css`, `index.css` ou créez `CountryResults.css`).

### Étape 3️⃣ : Importer le CSS (si fichier séparé)
```jsx
import './CountryResults.css';
```

### Étape 4️⃣ : Tester

Survolez une carte de pays avec votre curseur → la carte s'agrandit et les détails apparaissent ! 🎉

---

## ✨ Résultat Final

| État | Comportement |
|------|--------------|
| **Normal** | Carte compacte avec drapeau et nom |
| **Survol** | Carte agrandie + infos détaillées visibles |
| **Transition** | Animation fluide de 0.3s |
