const { contextBridge, ipcRenderer } = require('electron');
var exec = require('child_process').exec;

var cmd = 'node ./server/server.js';
// runs the server, default theme, and tests upon startup
contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system'),
  test: () => ipcRenderer.invoke('test'),
  switch: () => ipcRenderer.invoke('switch'),
});

exec(cmd, function (error, stdout, stderr) {
  console.log('done');
});
