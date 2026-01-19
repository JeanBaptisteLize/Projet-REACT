//On créer des cartes (ici un pays) pour chaque pays avec des informations clés

import "./CountryCard.css";   // Importation du fichier CSS pour le style du composant avec l'affichage du drapeau et des détails du pays par hover

export default function CountryCard({ country }) {
  return (
    <div className="country-card">
      
      {/* Drapeau */}
      <img
        src={country.flags?.svg}
        alt={`Drapeau ${country.name?.common}`}
        className="flag"
      />

      {/* Infos cachées par défaut */}
      <div className="details">
        <h3>{country.name?.common}</h3>
        <p><strong>Région :</strong> {country.region}</p>
        <p><strong>Capitale :</strong> {country.capital?.[0] ?? "—"}</p>
        <p>
          <strong>Population :</strong>{" "}
          {country.population?.toLocaleString()}
        </p>
      </div>

    </div>
  );
}
