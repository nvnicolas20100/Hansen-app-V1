# Phase 4.1 - Windows unpacked application

This first packaging step deliberately creates `release/win-unpacked`, not an installer. It validates
resource paths, ASAR contents and the native SQLite module before introducing NSIS.

Run from the project root after installing `electron-builder`:

```powershell
npm run build
npx electron-builder --win dir --x64 --config electron-builder.yml
node scripts/verify-packaged-app.mjs
```

Then launch:

```powershell
& '.\release\win-unpacked\Hansen Solvent App.exe'
```

On a first launch, verify that the graph contains the imported solvents and that the Solvent Database is
populated. This confirms that `resources/data` is resolved correctly and that `better-sqlite3` loads from
the packaged application.

The `electron-winstaller` install script is not needed for this NSIS-oriented workflow. Record an explicit
denial with npm rather than approving an unused Squirrel installer dependency:

```powershell
npm install-scripts deny electron-winstaller
```

If the installed npm version exposes the older command name, use:

```powershell
npm deny-scripts electron-winstaller
```
