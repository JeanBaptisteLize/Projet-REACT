// src/App.jsx
import { useEffect, useState, useMemo } from "react";
import { fetchAllCountries } from "./api/restCountries";
import CountryFilters from "./components/CountryFilters";
import CountryList from "./components/CountryList";

// Helper population bucket
function matchPopBucket(population, bucket) {
  if (bucket === "ALL") return true;
  if (bucket === "LT_10K") return population < 10_000;
  if (bucket === "BTW_10K_2M") return population >= 10_000 && population <= 2_000_000;
  if (bucket === "GT_2M") return population > 2_000_000;
  return true;
}

export default function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // UI interactive state
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("ALL");
  const [popBucket, setPopBucket] = useState("ALL");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const { response, data } = await fetchAllCountries();

        // On prend un jeu de 100 pays
        // (Option : trier par nom pour un rendu stable)
        const sorted = [...data].sort((a, b) =>
          (a?.name?.common ?? "").localeCompare(b?.name?.common ?? "")
        );

        setAllCountries(sorted.slice(0, 100));

        console.log("Données REST Countries:", data);
      } catch (e) {
        setError(e.message || "Erreur inconnue");
        setAllCountries([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // liste des régions disponibles pour alimenter le select
  const regions = useMemo(() => {
    const set = new Set();
    for (const c of allCountries) {
      if (c?.region) set.add(c.region);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [allCountries]);

  // filtrage dynamique
  const filteredCountries = useMemo(() => {
    const q = search.trim().toLowerCase();

    return allCountries.filter((c) => {
      const name = (c?.name?.common ?? "").toLowerCase();
      const cRegion = c?.region ?? "";
      const population = c?.population ?? 0;

      const matchSearch = q === "" ? true : name.includes(q);
      const matchRegion = region === "ALL" ? true : cRegion === region;
      const matchPop = matchPopBucket(population, popBucket);

      return matchSearch && matchRegion && matchPop;
    });
  }, [allCountries, search, region, popBucket]);
          

  // Appliquer les filtres
  const filtered = allCountries.filter((c) => {
    // Filtre par recherche
    const name = c?.name?.common ?? "";
    if (search && !name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }

    // Filtre par région
    if (region !== "ALL" && c?.region !== region) {
      return false;
    }

    // Filtre par population
    const population = c?.population ?? 0;
    if (!matchPopBucket(population, popBucket)) {
      return false;
    }

    return true;
  });

  return (
    <div style={{ padding: 16 }}>
      <h1>REST Countries</h1>

      {loading && <p>Chargement…</p>}
      {error && <p style={{ color: "crimson" }}>Erreur : {error}</p>}

      {!loading && !error && (
        <>
          <CountryFilters
            search={search}
            setSearch={setSearch}
            region={region}
            setRegion={setRegion}
            popBucket={popBucket}
            setPopBucket={setPopBucket}
            regions={regions}
          />

          <p style={{ fontSize: 13, opacity: 0.8 }}>
            Résultats : <strong>{filteredCountries.length}</strong> / 100
          </p>

          <CountryList countries={filtered} />
        </>
      )}
    </div>
  );
}