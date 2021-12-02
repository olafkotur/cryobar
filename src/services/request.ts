import { IRequestHeaders, IRequestOptions } from '../typings/d';
import * as _ from 'lodash';

export const RequestService = {
  /**
   * Performs a get request on the provided url.
   * @param url - request url
   * @param headers - request headers
   * @param responseHeaders - flag to include response headers in result
   */
  get: async (
    url: string,
    headers: IRequestHeaders = {},
    responseHeaders = true,
  ): Promise<unknown> => {
    const res = await RequestService.request({
      url,
      headers,
      method: 'get',
    });
    return responseHeaders ? res : res[0];
  },

  /**
   * Performs a post request on the provided url.
   * @param url - request url
   */
  post: async (
    url: string,
    headers: IRequestHeaders = {},
  ): Promise<unknown> => {
    return await RequestService.request({
      url,
      headers,
      method: 'post',
    });
  },

  /**
   * Build query string.
   * @param query - query paramters
   */
  queryString: (query: object): string => {
    return _.entries(query)
      .map((v) => `${v[0]}=${v[1]}`)
      .join('&');
  },

  /**
   * Ensures all fields are provided.
   * @param fields - fields to be checked
   */
  requiredFields: (fields: string[]): boolean => {
    const missing = fields.map((v) => !v);
    return !missing.length;
  },

  /**
   * Executes the request with given options.
   * @param options - request options
   */
  request: async (options: IRequestOptions): Promise<any> => {
    return await new Promise((resolve, reject) => {
      try {
        fetch(options.url, {
          method: options.method,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
        }).then(async (v: any) => resolve([await v.json(), v.headers]));
      } catch (e) {
        reject(new Error(`RequestUtil:request :: ${e}`));
      }
    });
  },
};
