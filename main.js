const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile(path.join(__dirname, 'build/index.html'));

  // Uncomment the line below to open the DevTools.
  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('ping', (event, ip) => {
  return new Promise((resolve, reject) => {
    console.log(`Pinging IP: ${ip}`);
    exec(`ping -n 4 ${ip}`, (error, stdout, stderr) => {  // '-n 4' is for Windows
      if (error) {
        console.error(`Error occurred: ${stderr}`);
        reject(`Error: ${stderr}`);
      } else {
        console.log(`Ping successful: ${stdout}`);
        resolve(stdout);
      }
    });
  });
});
