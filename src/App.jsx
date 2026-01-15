// src/App.jsx
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    // 1) On met notre logique asynchrone dans une fonction async.
    //    (useEffect lui-même ne doit pas être async directement.)
    async function loadCountries() {
      try {
        // 2) URL de l'API REST Countries (publique, pas d'inscription)
        const url =
          "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags";

        // 3) Appel HTTP (fetch est asynchrone -> renvoie une Promise)
        const response = await fetch(url);

        // 4) Gestion simple d'erreur HTTP (404, 500, etc.)
        //    fetch ne "fail" pas automatiquement sur 404/500, donc on vérifie response.ok.
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status} - ${response.statusText}`);
        }

        // 5) Conversion en JSON (json() est aussi asynchrone)
        const data = await response.json();

        // 6) Objectif: afficher les données dans la console
        console.log("REST Countries (JSON):", data);

        // Bonus simple: afficher un exemple (le 1er pays)
        console.log("Exemple 1er pays:", data[0]);
      } catch (err) {
        // 7) Gestion simple des erreurs (réseau, parsing JSON, throw HTTP...)
        console.error("Erreur pendant l'appel REST Countries:", err);
      }
    }

    loadCountries();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h1>Test REST Countries API</h1>
      <p>Ouvrez la console (F12) pour voir le JSON.</p>
    </div>
  );
}