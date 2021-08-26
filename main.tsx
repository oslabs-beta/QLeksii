
const {app, BrowserWindow, ipcMain, nativeTheme} = require('electron');

const path = require('path');
// require('./server/server.js');


function createWindow(params) {


    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: __dirname + '/icon.png',
        autoHideMenuBar: false,
        webPreferences:{
             preload: path.join(__dirname, './build/preload.js'),
            nodeIntegration: true,
            worldSafeExecuteJavaScript: true,
            contextIsolation:true,
        }
    })
    win.loadFile('index.html');

    ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  })

}
require('electron-reload')(__dirname, {

    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
})

app.whenReady().then(createWindow);




