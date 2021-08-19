import { IUserSettings } from '../typings/d';
import { StorageService } from './storage';
import * as _ from 'lodash';

const STORAGE_KEY = 'userSettings';

const defaultSettings: IUserSettings = {};

export const SettingsService = {
  /**
   * Fetches user settings
   */
  fetch: async (): Promise<IUserSettings> => {
    const res = (await StorageService.get(STORAGE_KEY)) as IUserSettings;
    return _.isEmpty(res) ? defaultSettings : res;
  },

  /**
   * Updates provided user settings
   */
  update: async (toUpdate: Partial<IUserSettings>): Promise<boolean> => {
    const previous = await SettingsService.fetch();
    const data: IUserSettings = {
      ...previous,
      ...toUpdate,
    };
    return await StorageService.set(STORAGE_KEY, data);
  },
};
