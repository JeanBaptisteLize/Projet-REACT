// src/App.jsx
import { useEffect, useState } from "react";
import { fetchAllCountries } from "./api/restCountries";
import CountryList from "./components/CountryList";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      try {
        const { response, data } = await fetchAllCountries();  // on recup response et data du fichier restCountries.js

        // Vous pouvez limiter à 20 pour un premier rendu (plus fluide)
        setCountries(data.slice(0, 20));

        // 5) données visibles dans la console (console navigateur)
        console.log("Données REST Countries:", data);

        // Bonus: afficher juste 3 noms pour vérifier rapidement
        console.log(
          "Exemples (3 pays):",
          data.slice(0, 3).map((c) => c?.name?.common)
        );
      } catch (err) {
        setError(err.message || "Erreur inconnue");
        setCountries([]);     // important : garantit le cas "aucune donnée"
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h1>REST Countries</h1>

      {loading && <p>Chargement…</p>}
      {error && <p style={{ color: "crimson" }}>Erreur : {error}</p>}

      {/* Le composant dédié d'affichage */}
      {!loading && !error && <CountryList countries={countries} />}
    </div>
  );
}