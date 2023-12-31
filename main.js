const path = require('path');
const { app, BrowserWindow } = require('electron');

const isDev = process.env.NODE_ENV !== 'development';
const isMac = process.platform === 'darwin';

function createMainWindow(){
  const createMainWindow = new BrowserWindow({
    title: "Image Resizer",
    width: isDev ? 1000 : 500,
    height: 600
  });

  //open devtools if in dev env
if (isDev) {
  createMainWindow.webContents.openDevTools();
}

  createMainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

app.whenReady().then(()=>{
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on('window-all-closed', () => {
  if (!isMac) app.quit();
});