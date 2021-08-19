import * as React from 'react';
import Symbol from '../../components/Symbol/Symbol';
import SymbolService from '../../services/symbol';
import { ISymbolData } from '../../typings/d';
import './saved.css';

interface IProps {}

const Saved: React.FC<IProps> = ({}) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<ISymbolData[]>([]);

  /**
   * Fetches new symbol data.
   */
  const refresh = async () => {
    const res = await SymbolService.fetch();
    setData(res);
    setLoading(false);
  };

  React.useEffect(() => {
    refresh();
  }, []);

  return !loading ? (
    <div className="p-3">
      <div className="saved-column-label mb-1">
        <span className="text-muted">Name</span>
        <span className="text-muted saved-column-label-offset">Price</span>
        <span className="text-muted saved-column-label-offset">24h Change</span>
      </div>
      <div className="saved-symbol-container">
        {data.map((symbol, i) => (
          <Symbol key={`symbol-${i}`} data={symbol} />
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Saved;
