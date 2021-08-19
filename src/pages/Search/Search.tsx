import * as React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import Symbol from '../../components/Symbol/Symbol';
import SymbolService from '../../services/symbol';
import { ISymbolData } from '../../typings/d';
import './search.css';

interface IProps {}

const Search: React.FC<IProps> = ({}) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [originalData, setOriginalData] = React.useState<ISymbolData[]>([]);
  const [data, setData] = React.useState<ISymbolData[]>([]);

  /**
   * Fetches new symbol data
   */
  const fetch = async () => {
    const res = await SymbolService.fetch();
    setOriginalData(res);
    setData(res);
    setLoading(false);
  };
  /**
   * Filters data shown to user
   * @param query - search query
   */
  const search = (query: string) => {
    const dataCopy = [...data];
    const filtered = dataCopy.filter((v) => {
      const name = `${v.lSymbol}${v.rSymbol}`;
      return name.includes(query.toUpperCase());
    });
    query ? setData(filtered) : setData(originalData);
  };

  React.useEffect(() => {
    fetch();
  }, []);

  return !loading ? (
    <div className="p-3">
      <SearchBar search={search} />
      <div className="search-column-label mb-1">
        <span className="text-muted">Name</span>
        <span className="text-muted search-column-label-offset">Price</span>
        <span className="text-muted search-column-label-offset">
          24h Change
        </span>
      </div>
      <div className="search-symbol-container">
        {data.map((symbol, i) => (
          <Symbol key={`symbol-${i}`} data={symbol} />
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Search;
