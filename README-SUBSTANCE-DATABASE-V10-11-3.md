# Correctif v10.11.3 - Substance Database

- ajoute la migration 0005 pour rendre la sequence publique dense: SUB-0001, SUB-0002, etc.;
- conserve les identifiants SQLite internes sans les exposer comme numeros publics;
- attribue aux nouvelles substances le numero suivant du code public, independamment de l'id interne;
- remplace les deux entrees Compound/Solvent Database par une seule entree Substance Database;
- renomme la page et le retour de fiche;
- structure la fiche en sections Common, Solvent et Compound;
- conserve les profils compound et solvent specialises sous la meme identite Substance.
