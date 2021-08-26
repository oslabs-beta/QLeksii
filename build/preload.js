const { contextBridge, ipcRenderer } = require('electron');
var exec = require('child_process').exec;

var cmd = 'node ./server/server.js';

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system'),
});

exec(cmd, function (error, stdout, stderr) {
  console.log('done');
});
