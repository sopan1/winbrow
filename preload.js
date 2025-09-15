const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  launchProfile: (profile) => ipcRenderer.invoke('launch-profile', profile)
});
