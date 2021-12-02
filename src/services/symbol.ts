import { config } from '../config';
import { IBinanceSymbolPriceData, ISymbolData } from '../typings/d';
import { RequestService } from './request';
import _ from 'lodash';

const SymbolService = {
  /**
   * Fetches symbol info data.
   */
  fetch: async (): Promise<ISymbolData[]> => {
    const url = `${config.binanceUrl}/api/v3/ticker/price`;
    const data =
      ((await RequestService.get(
        url,
        {},
        false,
      )) as IBinanceSymbolPriceData[]) || [];

    return _.sortBy(data, 'symbol').map((v) => ({
      lSymbol: v.symbol,
      rSymbol: '',
      volume: 4654.07,
      price: parseFloat(v.price || '0'),
      currency: 384.13,
      growth: -3.96,
      saved: true,
    }));
  },

  /**
   * Fetches saved symbol data.
   */
  fetchSaved: async (): Promise<ISymbolData[]> => {
    return [];
  },

  toggleSave: async (symbol: ISymbolData): Promise<void> => {
    console.log('toggle saving/unsaving');
  },
};

export default SymbolService;
