// src/App.jsx
import { useEffect, useState, useMemo } from "react";
import { fetchAllCountries } from "./api/restCountries";
import CountrySearch from "./components/CountrySearch";
import CountryResults from "./components/CountryResults";


// Clé utilisée pour le localStorage
const STORAGE_KEY = "country_filters_v1";

// Fonction pour charger les filtres depuis le localStorage
// (sauvegarde entre sessions / rechargements)
function loadFiltersFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// Fonction pour sauvegarder les filtres dans le localStorage
function saveFiltersToStorage(filters) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  } catch {
    // Si stockage plein / refusé, on ignore (UX > crash)
  }
}

// Fonction helper qui vérifie si une population correspond au bucket sélectionné
function matchPopBucket(population, bucket) {
  if (bucket === "ALL") return true;
  if (bucket === "LT_10K") return population < 50_000;
  if (bucket === "BTW_10K_2M")
    return population >= 50_000 && population <= 5_000_000;
  if (bucket === "GT_2M") return population > 5_000_000;
  return true;
}


// On déclare le composant principal de l'application React
// (export default permet à React via main.jsx de l'utiliser comme point d'entrée)
export default function App() {

  // Chargement des filtres sauvegardés (si existants)
  const stored = loadFiltersFromStorage();

  // Stocke les pays récupérés depuis l'API
  // (on initialise avec un tableau vide [])
  const [allCountries, setAllCountries] = useState([]);

  // États liés à l'UX
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // États interactifs de l'UI (filtres)
  const [search, setSearch] = useState(stored?.search ?? "");
  const [region, setRegion] = useState(stored?.region ?? "ALL");
  const [popBucket, setPopBucket] = useState(stored?.popBucket ?? "ALL");


  // Chargement des données depuis l'API
  // Ce useEffect s'exécute UNE SEULE FOIS au montage du composant
  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      try {
        const { data } = await fetchAllCountries();

        // On trie les pays par nom pour un rendu stable
        const sorted = [...data].sort((a, b) =>
          (a?.name?.common ?? "").localeCompare(b?.name?.common ?? "")
        );

        // On limite volontairement le jeu de données à 250 pays
        setAllCountries(sorted.slice(0, 250));

        console.log("Données REST Countries :", data);
      } catch (e) {
        setError(e.message || "Erreur inconnue");
        setAllCountries([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);


  // Sauvegarde des filtres à chaque changement
  useEffect(() => {
    saveFiltersToStorage({ search, region, popBucket });
  }, [search, region, popBucket]);


  // Liste des régions disponibles pour alimenter le select
  const regions = useMemo(() => {
    const set = new Set();
    for (const c of allCountries) {
      if (c?.region) set.add(c.region);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [allCountries]);


  // Filtrage dynamique des pays
  const filteredCountries = useMemo(() => {
    const q = search.trim().toLowerCase();

    return allCountries.filter((c) => {
      // Filtre par nom
      const name = (c?.name?.common ?? "").toLowerCase();
      const matchSearch = q === "" ? true : name.includes(q);

      // Filtre par région
      const matchRegion = region === "ALL" ? true : c?.region === region;

      // Filtre par population
      const population = c?.population ?? 0;
      const matchPop = matchPopBucket(population, popBucket);

      return matchSearch && matchRegion && matchPop;
    });
  }, [allCountries, search, region, popBucket]);


  // Rendu du composant
  return (
    <div style={{ padding: 16 }}>
      <h1>Recherche de pays avec Reset</h1>

      {loading && <p>Chargement…</p>}
      {error && <p style={{ color: "crimson" }}>Erreur : {error}</p>}

      {!loading && !error && (
        <>
          {/* Composant de recherche / filtres */}
          <CountrySearch
            search={search}
            onSearchChange={setSearch}
            region={region}
            onRegionChange={setRegion}
            popBucket={popBucket}
            onPopBucketChange={setPopBucket}
            regions={regions}
          />

          {/* Composant d'affichage des résultats */}
          <CountryResults countries={filteredCountries} />
        </>
      )}
    </div>
  );
}