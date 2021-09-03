
const {app, BrowserWindow, ipcMain, nativeTheme} = require('electron');
const path = require('path');
// require('./server/server.js');
app.commandLine.appendSwitch('ignore-certificate-errors', 'true');

function createWindow(params) {


    const win = new BrowserWindow({
        width:1200,
        height:800,
        icon: __dirname + '/icon.png',
        autoHideMenuBar: false,
        webPreferences:{
           preload: path.join(__dirname, './build/preload.js'),
           webSecurity: false,
           nodeIntegration: true,
           worldSafeExecuteJavaScript: true,
           contextIsolation:true,
        }
    });
    // const child = new BrowserWindow({
    //     width:600,
    //     height:600,
    //     icon: __dirname + '/icon.png',
    //     autoHideMenuBar: true,
    //     parent: win })
   

//      splash = new BrowserWindow({width: 810, height: 610, transparent: true, frame: false, alwaysOnTop: true});
// splash.loadURL(`splash.html`);
   win.loadURL('/graphql')
  //  another.hide()
   child.hide();
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

  // ipcMain.handle('switch', async() => {
  //   // console.log("here")
  //  await child.loadURL('https://localhost:3200/graphql');

  //  child.show();
  // })

}
// require('electron-reload')(__dirname, {

//     electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
// })

app.whenReady().then(createWindow);







