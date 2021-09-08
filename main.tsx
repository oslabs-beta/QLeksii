const {
  app,
  BrowserWindow,
  ipcMain,
  nativeTheme,
  globalShortcut,
} = require('electron');
const path = require('path');
const fs = require('fs');
var exec = require('child_process').exec;

// creates the window for URI input for electron app
function createWindow(params) {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: __dirname + '/icon.png',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, './build/preload.js'),
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
    },
  });
  globalShortcut.register('Alt+CommandOrControl+I', () => {
    // console.log('Electron loves global shortcuts!');
    win.webContents.toggleDevTools();
  });
  // creates a child window for the graphql path
  const child = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: __dirname + '/icon.png',
    autoHideMenuBar: true,
    parent: win,
  });

  child.hide();
  win.loadFile('index.html');

  // provides the dark mode functionality, theme is light by default
  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light';
    } else {
      nativeTheme.themeSource = 'dark';
    }
    return nativeTheme.shouldUseDarkColors;
  });

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system';
  });
  // starts up the remote server
  ipcMain.handle('switch', async () => {
    var cmd2 = 'node ./remoteserver/server.js';
    await exec(cmd2, function (error, stdout, stderr) {
      console.log('stdout ', stdout);
      console.log(stderr);
    });
    // loads the page from the graphql path on the child window
    setTimeout(() => {
      console.log('loading url');
      child.loadURL('http://localhost:3200/graphql');
      child.show();
    }, 500);
  });
  // closes child window and kills the port used for graphiql
  child.on('close', function (event) {
    event.preventDefault();
    var cmd3 = 'npx kill-port 3200';
    exec(cmd3, function (error, stdout, stderr) {
      child.hide();
    });
  });

  // closes main window and kills the port used for remote server
  win.on('closed', async function (event) {
    await exec('npx kill-port 3333', function (error, stdout, stderr) {
      console.log(stdout);
    });
    if (fs.existsSync('./remoteserver/server.js')) {
      fs.unlink('./remoteserver/server.js', function (err) {
        if (err) {
          console.error(err);
        } else {
          console.log('File removed:', './remoteserver/server.js');
        }
      });
    }
  });
}

app.whenReady().then(createWindow);
