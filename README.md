# Hansen Solvent App

Desktop Electron application for Hansen-based solvent selection. The project contains the scientific
domain, application services, SQLite persistence, imported datasets, React renderer, Three.js graph,
unit/integration/jsdom tests and an Electron end-to-end smoke test.

## Install and run

```powershell
npm ci
npm run start
```

Development mode:

```powershell
npm run dev
```

## Required validation

```powershell
npm run typecheck
npm run lint
npm run test
npm run test:coverage
npm run build
npm run e2e
```

The coverage gate requires 100% statements, functions and lines in instrumented deterministic code.
Use `npm run e2e:linux` only in a Linux environment with Xvfb and the required Electron libraries.

Generated `node_modules`, `dist` and `coverage` directories are intentionally absent from source archives.
Restore dependencies with `npm ci`.

Architecture decisions are documented under `docs/decisions`.

Experimental determination of a compound's Hansen R₀ from user-supplied
GOOD/BAD solvent measurements is available on each compound's identity card.
Each compound editor accepts a single Hansen determination; when editing legacy
records with several sets, the current default set is retained.
CAS lookups can collect PubChem properties such as solubility annotations; their
source and measurement details are retained for review. Since such properties do
not necessarily identify solvent-specific GOOD/BAD outcomes, classifications
must be supported by a traceable source and are never inferred automatically.
Compound physical properties use editable key, value, and unit rows; they are
shown separately from other metadata to avoid duplicate entries.
PubChem solubility annotations are restricted to 25 °C and retained once per
identified solvent; missing measurements can be entered manually. The adjusted
R₀ is calculated and saved automatically when the required experimental labels,
measurements, criterion and source are complete, or can be fitted manually.
GOOD/BAD solvent classifications are stored separately for each target solute.
The graph and solvent list use a converged adjusted fit only while its
classifications and solvent Hansen data still match the saved fit; otherwise
they retain the published R₀, if available.
The method, objective direction, numerical constraints, and persistence design
are documented in [`docs/decisions/0009-r0-determination.md`](docs/decisions/0009-r0-determination.md).
