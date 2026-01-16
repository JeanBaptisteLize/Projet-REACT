// src/components/CountryFilters.jsx
// Rôle : UI interactive de filtres (événements onChange/onInput)
// Ne fait AUCUN appel API : il reçoit les valeurs + callbacks depuis App.jsx

export default function CountryFilters({
  search,
  onSearchChange,
  region,
  onRegionChange,
  popBucket,
  onPopBucketChange,
  regions,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr",
        gap: 12,
        alignItems: "end",
        marginTop: 12,
        marginBottom: 12,
      }}
    >
      <label>
        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>Recherche pays</div>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)} // événement
          placeholder="Ex: france, morocco..."
          style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
        />
      </label>

      <label>
        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>Région</div>
        <select
          value={region}
          onChange={(e) => onRegionChange(e.target.value)} // événement
          style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
        >
          <option value="ALL">Toutes</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>

      <label>
        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>Population</div>
        <select
          value={popBucket}
          onChange={(e) => onPopBucketChange(e.target.value)} // événement
          style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}

          >
          <option value="ALL">Toutes</option>
          <option value="LT_10K">Moins de 50 000</option>
          <option value="BTW_10K_2M">50 000 à 5 000 000</option>
          <option value="GT_2M">Plus de 5 000 000</option>
        </select>
      </label>
    </div>
  );
}
