# Correctif v10.11.2 - identite unifiee et menu du graphe

## Corrections

- le graphe affiche le code public commun `SUB-xxxx` fourni par le depot Substance ;
- la numerotation publique commence a `SUB-0001` et reste commune aux profils compound et solvent ;
- les codes `CMP-xxxx` et `SOLV-xxxx` restent uniquement des alias de recherche et de compatibilite ;
- une substance possede une identite commune et zero, un ou deux profils specialises :
  - `substance_compound_profile` pour les parametres compound ;
  - `substance_solvent_profile` pour les parametres solvent ;
- le panneau d'actions du graphe se ferme sur clic gauche ou clic droit en dehors du panneau ;
- les clics dans le panneau ne le ferment pas avant l'execution de l'action.

## Important

Ce correctif doit etre applique apres `hansen-substances-unifiees-v10-11.zip` et le correctif de tests v10.11.1, avant le premier demarrage de l'application migree.
