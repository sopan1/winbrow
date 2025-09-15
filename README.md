# WinBrow

WinBrow is a starter Electron application that integrates with puppeteer-core to launch per-profile browser sessions (isolated user data directories). It is designed as a minimal, secure base for building browser automation or profile-based browsing tools.

## Features
- Electron renderer + main process structure
- puppeteer-core integration (use your own Chrome/Chromium binary via CHROME_PATH)
- Per-profile userDataDir isolation
- Simple UI for launching profiles
- No secrets committed; data/ is ignored by default

## Quick start (developer)
1. Clone or save the repo to a local folder.
2. Install dependencies:

```bash
npm install
```

Note: puppeteer-core does not download Chromium automatically.

3. Set CHROME_PATH to a Chrome/Chromium executable on your system.
- Windows (PowerShell):

```powershell
$env:CHROME_PATH = "C:\Program Files\Google\Chrome\Application\chrome.exe"
```

- macOS:

```bash
export CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
```

4. Run the app:

```bash
npm run start
```

## Build
To create a Windows installer (using electron-builder):

```bash
npm run dist
```

Notes:
- Packaging considerations: puppeteer-core avoids bundling Chromium; configure if you need to include a browser binary.
- Review electron-builder config in package.json for targets and resources.

## Security & repository hygiene
- data/ (profile userDataDirs), node_modules/, dist/, and other runtime/build artifacts are included in .gitignore.
- Do not commit API keys, proxy credentials, or other secrets. Use environment variables or a secrets store.
- If proxies require authentication, handle credentials at runtime (never in the repo).

## Contributing
If you'd like help adding features (proxy support, profile management, CI for builds, automated tests), open an issue or request a PR and I can draft changes.

## License
Add your chosen license here (e.g., MIT).