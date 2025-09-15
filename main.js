const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const puppeteerHelper = require('./src/main/puppeteer');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, 'src', 'renderer', 'index.html'));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// IPC: renderer -> main for launching a profile
ipcMain.handle('launch-profile', async (event, profile) => {
  // profile: { id, profilePath, proxy }
  try {
    const result = await puppeteerHelper.launchProfile(profile);
    return { success: true, data: result };
  } catch (err) {
    return { success: false, error: err.message || String(err) };
  }
});
