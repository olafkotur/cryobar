import { BrowserWindow, globalShortcut, remote, screen, shell } from 'electron';
import { StorageService } from './storage';
import { IScreenInfo, IWindowInfo } from '../typings/d';

export const ElectronService = {
  /**
   * Fetches current screen info
   * @param useRemote - flag to user remote
   */
  getScreenInfo: (useRemote?: boolean): IScreenInfo => {
    const screenSize = (useRemote ? remote.screen : screen).getPrimaryDisplay()
      .workAreaSize;
    return { width: screenSize.width, height: screenSize.height };
  },

  /**
   * Fetches current window info (before remote window intialisation)
   */
  getWindowInfo: (window: BrowserWindow): IWindowInfo => {
    const size = window.getSize();
    const position = window.getPosition();
    return {
      width: size[0],
      height: size[1],
      xPosition: position[0],
      yPosition: position[1],
    };
  },

  /**
   * Sets window size and position
   * @param win - browser window
   * @param winInfo - window info
   * @param animate - true to animate repositioning
   * @param windowPadding - gives extra padding around the sides
   */
  setWindowInfo: async (
    win?: BrowserWindow,
    winInfo?: IWindowInfo,
    animate?: boolean,
    windowPadding?: boolean,
  ): Promise<void> => {
    const window = win || remote.getCurrentWindow();
    const windowInfo =
      winInfo ||
      ((await StorageService.get('currentWindowInfo')) as IWindowInfo | null);
    if (windowInfo) {
      const width = windowPadding ? windowInfo.width - 50 : windowInfo.width;
      const height = windowPadding ? windowInfo.height - 25 : windowInfo.height;
      const xPos = windowPadding
        ? windowInfo.xPosition + 25
        : windowInfo.xPosition;
      const yPos = windowPadding
        ? windowInfo.yPosition + 25
        : windowInfo.yPosition;
      window.setSize(width, height, animate);
      window.setPosition(xPos, yPos, animate);
    }
  },

  /**
   * Set window listener events
   * @param window - browser window
   */
  setWindowListeners: (window: BrowserWindow): void => {
    // resize event
    window.on('resize', async () => {
      const windowInfo = ElectronService.getWindowInfo(window);
      await StorageService.set('currentWindowInfo', windowInfo);
    });
  },

  /**
   * Toggle the visibility of the window
   * @param win - browser window
   */
  toggleVisibility: (win?: BrowserWindow): void => {
    const window = win || remote.getCurrentWindow();
    const visible = window.isVisible();
    if (visible) {
      return window.hide();
    }
    return window.show();
  },

  /**
   * Quits the application (used to apply updates)
   */
  quit: (): void => {
    return remote.app.quit();
  },
};
