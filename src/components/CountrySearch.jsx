//afficher le champ de recherche, filtre région, pop, bouton reset

export default function CountrySearch({
  search,
  onSearchChange,
  region,
  onRegionChange,
  popBucket,
  onPopBucketChange,
  regions,
}) {
  function handleReset() {
    onSearchChange("");
    onRegionChange("ALL");
    onPopBucketChange("ALL");
  }

  return (
    <section style={{ marginBottom: 24 }}>
      <h2>Entrez le pays désiré</h2>

      {/* Barre de Recherche */}
      <label>
        <div style={{ fontSize: 12, opacity: 0.8 }}>Nom du pays</div>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Ex : france, morocco..."
          style={{ width: "100%", padding: 10 }}
        />
      </label>

      {/* Filtre Région */}
      <label>
        <div style={{ fontSize: 12, opacity: 0.8, marginTop: 12 }}>
          Région
        </div>
        <select
          value={region}
          onChange={(e) => onRegionChange(e.target.value)}
          style={{ width: "100%", padding: 10 }}
        >
          <option value="ALL">Toutes les régions</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>

      {/* Filtre Population */}
      <label>
        <div style={{ fontSize: 12, opacity: 0.8, marginTop: 12 }}>
          Population
        </div>
        <select
          value={popBucket}
          onChange={(e) => onPopBucketChange(e.target.value)}
          style={{ width: "100%", padding: 10 }}
        >
          <option value="ALL">Toutes</option>
          <option value="LT_50K">Moins de 50 000</option>
          <option value="BTW_50K_5M">50 000 – 5 millions</option>
          <option value="GT_5M">Plus de 5 millions</option>
        </select>
      </label>

      {/* Button Reset */}
      <button
        type="button"
        onClick={handleReset}
        style={{ marginTop: 16 }}
      >
        Réinitialiser les filtres
      </button>
    </section>
  );
}
