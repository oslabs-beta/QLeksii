const {app, BrowserWindow} = require('electron');
const path = require('path');
require('./server/server.js');

function createWindow(params) {
    const win = new BrowserWindow({
        width:1200,
        heigh:800,
        autoHideMenuBar:false,
        backgroundColor: "white",
        webPreferences:{
            nodeIntegration: true,
            worldSafeExecuteJavaScript: true,
            contextIsolation: false
        }
    })
    win.loadFile('index.html');
}
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
})
app.whenReady().then(createWindow);