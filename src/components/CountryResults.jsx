// Affiche le nombre de résultats et la liste des pays et gere le cas "aucun résultats"

import CountryCard from "./CountryCard";

export default function CountryResults({ countries }) {
  if (countries.length === 0) {
    return <p>Aucun pays trouvé</p>;
  }

  return (
    <div
      style={{
        marginTop: 16,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 16
      }}
    >
      {countries.map((country) => (
        <CountryCard
          key={country.cca3}
          country={country}
        />
      ))}
    </div>
  );
}

