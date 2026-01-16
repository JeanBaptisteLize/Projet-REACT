//On créer des cartes pour chaque pays avec des informations clés
export default function CountryCard({ country }) {
  return (
    <div
      style={{
        borderRadius: 14,
        border: "1px solid #eee",
        padding: 12,
        background: "#fff",
        boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        gap: 8
      }}
    >
      {/* Drapeau */}
      <img
        src={country.flags?.svg}
        alt={`Drapeau ${country.name?.common}`}
        style={{
          width: "100%",
          height: 120,
          objectFit: "cover",
          borderRadius: 10
        }}
      />

      {/* Nom */}
      <h3 style={{ margin: "8px 0 4px" }}>
        {country.name?.common}
      </h3>

      {/* Infos */}
      <div style={{ fontSize: 14, opacity: 0.8 }}>
        <div><strong>Région :</strong> {country.region}</div>
        <div><strong>Capitale :</strong> {country.capital?.[0] ?? "—"}</div>
        <div>
          <strong>Population :</strong>{" "}
          {country.population?.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
