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
        const data = await fetchAllCountries();

        // Vous pouvez limiter à 20 pour un premier rendu (plus fluide)
        setCountries(data.slice(0, 20));
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