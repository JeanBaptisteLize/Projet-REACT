// src/components/CountryList.jsx
// Rôle : composant dédié à l'affichage (liste/cartes) des pays.
// Il reçoit les données via des props (bonne pratique : pas d'appel API ici).

function formatNumber(n) {
  return new Intl.NumberFormat("fr-FR").format(n ?? 0);
}

export default function CountryList({ countries }) {
  if (!countries || countries.length === 0) {
    return <p>Aucun pays ne correspond à vos filtres.</p>;
  }

  // 2) Rendu dynamique : on transforme le tableau en éléments UI avec map()
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 12,
      }}
    >
      {countries.map((c) => {
        const name = c?.name?.common ?? "Nom inconnu";
        const region = c?.region ?? "Région inconnue";
        const capital = c?.capital?.[0] ?? "Capitale inconnue";
        const population = c?.population ?? 0;
        const flagUrl = c?.flags?.png;

        return (
          <article
            key={name}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 12,
            }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              {flagUrl ? (
                <img
                  src={flagUrl}
                  alt={`Drapeau ${name}`}
                  width={40}
                  height={28}
                  style={{ objectFit: "cover", borderRadius: 4 }}
                />
              ) : (
                <div style={{ width: 40, height: 28, border: "1px solid #eee" }} />
              )}

              <div>
                <h3 style={{ margin: 0, fontSize: 16 }}>{name}</h3>
                <p style={{ margin: 0, fontSize: 12, opacity: 0.8 }}>{region}</p>
              </div>
            </div>
            
            <p style={{ marginTop: 10, marginBottom: 0, fontSize: 14 }}>
              <strong>Capitale :</strong> {capital}
            </p>
            <p style={{ marginTop: 6, marginBottom: 0, fontSize: 14 }}>
              <strong>Population :</strong> {formatNumber(population)}
            </p>
          </article>
        );
      })}
    </div>
  );
}