const { contextBridge, ipcRenderer } = require('electron');
var exec = require('child_process').exec;

var cmd = 'node ./server/server.js';


contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system'),

  switch: () => ipcRenderer.invoke('switch')
})

// var cmd = 'node ./server/server.js';
// var cmd2 = 'node ../remoteserver/server.js';
// exec(cmd2, function(error, stdout, stderr) {
// console.log("done")
// });



exec(cmd, function (error, stdout, stderr) {
  console.log('done');
});
