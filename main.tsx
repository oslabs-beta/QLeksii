
const {app, BrowserWindow, ipcMain, nativeTheme} = require('electron');
const path = require('path');
// require('./server/server.js');
var exec = require('child_process').exec;

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
    });
    const child = new BrowserWindow({
        width:1200,
        height:800,
        icon: __dirname + '/icon.png',
        autoHideMenuBar: true,
        parent: win })
   

//      splash = new BrowserWindow({width: 810, height: 610, transparent: true, frame: false, alwaysOnTop: true});
// splash.loadURL(`splash.html`);
   child.hide();
   win.loadFile('index.html')
  //  another.hide()
  
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

  ipcMain.handle('switch', async() => {
    // console.log("here")
    // var cmd = 'node ./server/server.js';
    var cmd2 = 'node ./remoteserver/server.js';
    await exec(cmd2, function(error, stdout, stderr) {
    // console.log("done")
    });
   await child.loadURL('http://localhost:3200/graphql');

   child.show();
  })
  
   child.on('close', function(event){
     event.preventDefault();
     //we need to write on close event to kill port 3200 so we dont have it running always 
     // we need to clear that server file (for some reason it doesnt being overwritten by fs) 
       var cmd3 = 'npx kill-port 3200';
       exec(cmd3, function(error, stdout, stderr) { 

       });

    // console.log("done")
   
        child.hide();
    });
}
// require('electron-reload')(__dirname, {

//     electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
// })


app.whenReady().then(createWindow);
