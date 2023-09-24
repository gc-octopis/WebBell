const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + '/favicon.ico',
    webPreferences: {
      backgroundThrottling: false,
    }
  });

  win.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');


var AutoLaunch = require('auto-launch');
var autoLauncher = new AutoLaunch({
    name: "bell"
});
// Checking if autoLaunch is enabled, if not then enabling it.
autoLauncher.isEnabled().then(function(isEnabled) {
  if (isEnabled) return;
   autoLauncher.enable();
}).catch(function (err) {
  throw err;
});