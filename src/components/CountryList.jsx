// src/components/CountryList.jsx
// Rôle : composant dédié à l'affichage (liste/cartes) des pays.
// Il reçoit les données via des props (bonne pratique : pas d'appel API ici).

export default function CountryList({ countries }) {
  // 1) Gestion du cas "aucune donnée"
  if (!countries || countries.length === 0) {
    return <p>Aucune donnée à afficher.</p>;
  }

  // 2) Rendu dynamique : on transforme le tableau en éléments UI avec map()
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 12,
        marginTop: 12,
      }}
    >
      {countries.map((country) => {
        // Petit “garde-fou” : certaines API peuvent renvoyer des champs absents
        const name = country?.name?.common ?? "Nom inconnu";
        const region = country?.region ?? "Région inconnue";
        const capital = country?.capital?.[0] ?? "Capitale inconnue";
        const flagUrl = country?.flags?.png; // REST Countries v3 fournit flags.png/svg

        return (
          <article
            key={name} // idéalement un code unique (cca3) si vous l'avez demandé dans fields
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
          </article>
        );
      })}
    </div>
  );
}