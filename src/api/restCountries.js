// src/api/restCountries.js
// Rôle : centraliser les appels HTTP vers REST Countries
// + gérer les erreurs + renvoyer du JSON prêt à l'emploi.

const BASE_URL = "https://restcountries.com/v3.1";

// Bonne pratique REST Countries : préciser les champs pour éviter une réponse énorme. :contentReference[oaicite:0]{index=0}
const FIELDS = "name,capital,cca3,region,population,flags";

/*  code ccs3 : code ISO 3166-1 alpha-3, c'est-à-dire le code à trois lettres attribué à chaque pays par l'Organisation internationale de normalisation
 
Récupère tous les pays (avec champs limités).
@returns {Promise<Array>} tableau de pays*/
export async function fetchAllCountries() {
  const url = `${BASE_URL}/all?fields=${FIELDS}`;

  console.log("avant fetch");
  const response = await fetch(url);  // fetch : Fonction JavaScript native qui envoie une requête HTTP à l'URL donnée
                                      // Attrubue à response la confirmation de la promesse d'avoir reçu une réponse pour cette requête.
  console.log("après fetch");

  // fetch() ne lance pas d'erreur automatiquement sur 404/500,
  // donc on teste response.ok. :contentReference[oaicite:0]{index=0}
  if (!response.ok) {
    throw new Error(`REST Countries: HTTP ${response.status} ${response.statusText}`);
  }

  //  Analyse la réponse du body as JSON (asynchrone). convertit le text brut en objet JS.
  // comme c'est une promesse(asynchrone), il attend que le JSON soit prêt.

  const data = await response.json();

  console.log("données reçues de l'API :", data);


  // Retourne response et data pour avoir accès aux deux
  return { response, data };

}