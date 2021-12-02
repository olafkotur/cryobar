import storage from 'electron-json-storage';
import { menubar as MenuBar } from 'menubar';
import * as url from 'url';
import * as path from 'path';

const DEVELOPMENT = process.env.NODE_ENV === 'development';

// storage setup
const dataPath = storage.getDataPath();
storage.setDataPath(dataPath);

// production index source
const indexOptions = url.format({
  pathname: path.join(__dirname, 'renderer/index.html'),
  protocol: 'file:',
  slashes: true,
});

// window setup
const menu = MenuBar({
  icon: `${__dirname}/tray@2x.png`,
  index: DEVELOPMENT ? 'http://localhost:4000' : indexOptions,
  preloadWindow: true,
  showOnAllWorkspaces: true,
  browserWindow: {
    width: 380,
    height: 512,
    show: false,
    frame: false,
    fullscreenable: false,
    transparent: true,
    resizable: false,
    webPreferences: {
      devTools: DEVELOPMENT,
      nodeIntegration: true,
      webSecurity: false,
    },
  },
});

menu.on('ready', () => {});
