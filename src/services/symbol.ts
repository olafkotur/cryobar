import { ISymbolData } from '../typings/d';

const SymbolService = {
  /**
   * Fetches symbol info data.
   */
  fetch: async (): Promise<ISymbolData[]> => {
    return [
      {
        lSymbol: 'AAVE',
        rSymbol: 'BNB',
        volume: 4654.07,
        price: 0.9585,
        currency: 384.13,
        growth: -3.96,
      },
      {
        lSymbol: 'ADA',
        rSymbol: 'BNB',
        volume: 20635.37,
        price: 0.00224974,
        currency: 1.99,
        growth: 0.83,
      },
      {
        lSymbol: 'BTC',
        rSymbol: 'USDT',
        volume: 8187312.1,
        price: 44018,
        currency: 44017,
        growth: 2.5,
      },
      {
        lSymbol: 'ETH',
        rSymbol: 'USDT',
        volume: 1982771.1,
        price: 4082,
        currency: 4081,
        growth: -0.01,
      },
      {
        lSymbol: 'DOGE',
        rSymbol: 'USDT',
        volume: 982982771.1,
        price: 0.32,
        currency: 0.31,
        growth: 52.8211,
      },
    ];
  },
};

export default SymbolService;
