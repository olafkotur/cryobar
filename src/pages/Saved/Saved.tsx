import * as React from 'react';
import { TPage } from '../../App';
import Symbol from '../../components/Symbol/Symbol';
import SymbolService from '../../services/symbol';
import { ISymbolData } from '../../typings/d';
import './saved.css';

interface IProps {
  navigate: (page: TPage) => void;
}

const Saved: React.FC<IProps> = ({ navigate }) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<ISymbolData[]>([]);

  /**
   * Fetches new symbol data.
   */
  const refresh = async () => {
    const res = await SymbolService.fetchSaved();
    setData(res);
    setLoading(false);
  };

  React.useEffect(() => {
    refresh();
  }, []);

  return !loading ? (
    data.length ? (
      <div className="p-3">
        <div className="saved-column-label mb-1">
          <span className="text-muted">Name</span>
          <span className="text-muted saved-column-label-offset">Price</span>
          <span className="text-muted saved-column-label-offset">
            24h Change
          </span>
        </div>
        <div className="saved-symbol-container">
          {data.map((symbol, i) => (
            <Symbol key={`symbol-${i}`} data={symbol} />
          ))}
        </div>
      </div>
    ) : (
      <div className="saved-empty d-flex justify-content-center align-items-center px-5">
        <span>
          Looks like you have nothing saved. Go to the{' '}
          <span className="saved-empty-text" onClick={() => navigate('search')}>
            search
          </span>{' '}
          page and save your favourite symbols.
        </span>
      </div>
    )
  ) : (
    <></>
  );
};

export default Saved;
