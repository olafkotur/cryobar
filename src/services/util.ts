import crypto from 'crypto';
import moment from 'moment';
import { remote } from 'electron';
import { IWindowInfo } from '../typings/d';

export const UtilService = {
  /**
   * Throws an error in the form of a window alert
   * @param message - custom error message
   */
  error: (message?: string) => {
    alert(message || 'Something went wrong, please try again');
  },

  /**
   * Generates a unique id
   * @param salt - generator salt, safety to ensure unique result
   */
  generateId: (salt: string): string => {
    const input = `${salt}-${moment().milliseconds()}-${Math.random()}`;
    const algorithm = crypto.createHash('sha256');
    const hash = algorithm.update(input).digest('hex').toString();
    return hash;
  },

  /**
   * Fetches current window info
   */
  getWindowInfo: (): IWindowInfo => {
    const size = remote.getCurrentWindow().getSize();
    const position = remote.getCurrentWindow().getPosition();
    return {
      width: size[0],
      height: size[1],
      xPosition: position[0],
      yPosition: position[1],
    };
  },

  /**
   * Fetches a modified user agent (fakes an update to the latest Chromium and Safari versions)
   */
  getUserAgent: (url: string): string => {
    const agents = {
      default_ua:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36',
      firefox_ua:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7; rv:71.0) Gecko/20100101 Firefox/71.0',
      chrome_ua:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99 Safari/537.36',
      edge_ua:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36 Edg/90.0.818.49',
    };

    // apply custom user agent
    let userAgent = navigator.userAgent;
    if (url.includes('google.com')) {
      userAgent = agents['edge_ua'];
    } else if (url.includes('slack.com')) {
      userAgent = agents['chrome_ua'];
    } else if (url.includes('whatsapp.com')) {
      userAgent = agents['default_ua'];
    } else if (url.includes('googlepopupredirect')) {
      userAgent = agents['edge_ua'];
    }

    return userAgent;
  },

  /**
   * Formats number to currency
   * @param input - number
   * @param locale - local method of parsing numbers
   */
  formatCurrency: (input: number, locale: string = 'en-US'): string => {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'USD',
    });
    return formatter.format(input);
  },

  /**
   * Formats number
   * @param input - number
   * @param locale - local method of parsing numbers
   */
  formatNumber: (input: number, locale: string = 'en-US'): string => {
    const formatter = new Intl.NumberFormat(locale);
    return formatter.format(input);
  },
};
