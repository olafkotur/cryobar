import storage from 'electron-json-storage';

export const StorageService = {
  /**
   * Sets an object by name (insert, update)
   * @param key - object key
   * @param data - data to be stored
   */
  set: async (key: string, data: object): Promise<boolean> => {
    return await new Promise((resolve, reject) => {
      storage.set(key, data, (error) => {
        if (error) {
          reject(false);
        }
        resolve(true);
      });
    });
  },

  /**
   * Fetches object by name (find)
   * @param key - object key
   */
  get: async (key: string): Promise<object | null> => {
    return await new Promise((resolve, reject) => {
      storage.get(key, (_error, data) => {
        if (data) {
          resolve(data);
        }
        reject(null);
      });
    });
  },

  /**
   * Removes object by name
   * @param key - object key
   */
  remove: async (key: string): Promise<boolean> => {
    return await new Promise((resolve) => {
      storage.remove(key, () => resolve(true));
    });
  },

  /**
   * Converts a File to base64 format
   * @param file - file
   */
  base64: async (file: File): Promise<string> => {
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
    });
  },
};
