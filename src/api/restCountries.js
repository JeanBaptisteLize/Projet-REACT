// src/api/restCountries.js
// Rôle : centraliser les appels HTTP vers REST Countries
// + gérer les erreurs + renvoyer du JSON prêt à l'emploi.

const BASE_URL = "https://restcountries.com/v3.1";

// Bonne pratique REST Countries : préciser les champs pour éviter une réponse énorme. :contentReference[oaicite:0]{index=0}
const FIELDS = "name,capital,region,population,flags";

/**
 
Récupère tous les pays (avec champs limités).
@returns {Promise<Array>} tableau de pays*/
export async function fetchAllCountries() {
  const url = `${BASE_URL}/all?fields=${FIELDS}`;

  const response = await fetch(url);

  // fetch() ne lance pas d'erreur automatiquement sur 404/500,
  // donc on teste response.ok. :contentReference[oaicite:1]{index=1}
  if (!response.ok) {
    throw new Error(`REST Countries: HTTP ${response.status} ${response.statusText}`);
  }

  // Parsing JSON (asynchrone). :contentReference[oaicite:2]{index=2}
  return response.json();
}