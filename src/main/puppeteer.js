const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function launchProfile(profile) {
  // Expect CHROME_PATH to be set to a Chrome/Chromium binary on the host machine
  const executablePath = process.env.CHROME_PATH || '';

  if (!executablePath || !fs.existsSync(executablePath)) {
    throw new Error('CHROME_PATH is not set or the binary does not exist. Set CHROME_PATH to your Chrome/Chromium executable path.');
  }

  // Use a dedicated userDataDir per profile to isolate fingerprints
  const userDataDir = profile.profilePath || path.join(process.cwd(), 'data', `profile-${profile.id || 'default'}`);

  const launchArgs = [
    `--user-data-dir=${userDataDir}`,
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage'
  ];

  // Optional proxy
  if (profile.proxy && profile.proxy.server) {
    launchArgs.push(`--proxy-server=${profile.proxy.server}`);
  }

  const browser = await puppeteer.launch({
    executablePath,
    headless: false,
    args: launchArgs
  });

  const page = await browser.newPage();

  // If proxy requires authentication, caller should call page.authenticate later via automation
  await page.goto('https://example.com', { waitUntil: 'networkidle2', timeout: 30000 });

  // Return a minimal object; caller may extend to control browser
  return { browserContextInfo: 'launched', url: page.url() };
}

module.exports = {
  launchProfile
};
