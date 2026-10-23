# Hansen Solvent App - base unifiee des substances

Correctif cible : version 10.10.6.

## Contenu

- migration SQLite 0004 additive et conservative ;
- identite chimique commune `substance` ;
- codes publics `SUB-xxxx` ;
- profils compose et solvant ;
- anciens codes `CMP-xxxx` et `SOLV-xxxx` conserves comme alias ;
- rapprochement automatique uniquement par CAS et identite compatible ;
- file de revue pour les CAS identiques mais incompatibles ;
- affichage et recherche sur les nouveaux codes ;
- synchronisation transactionnelle lors des creations, copies et modifications.

## Securite de migration

Les tables `compound` et `solvent` existantes ne sont pas supprimees. Les identifiants et relations historiques restent utilises par les ecrans et les actions existantes.

## Validation effectuee

- scenarios SQL de fusion sure, absence de CAS, identite incompatible, trous d'identifiants et alias ;
- verification TypeScript ciblee des fichiers modifies ;
- verification de coherence des 12 fichiers du correctif.

L'installation npm du bac a sable etait incomplete. Le test complet `npm run check` doit donc etre execute apres application sur le poste cible disposant des dependances du projet.
