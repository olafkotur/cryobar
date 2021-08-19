import * as React from 'react';
import { UtilService } from '../../services/util';
import { ISymbolData } from '../../typings/d';
import './symbol.css';

interface IProps {
  data: ISymbolData;
}

const Symbol: React.FC<IProps> = ({ data }) => {
  return (
    <div className="d-flex flex-row align-items-center justify-content-center mb-2">
      <div className="symbol-column-name">
        <div className="d-flex flex-row align-items-center">
          <span className="symbol-label mr-1">{data.lSymbol}</span>
          <span className="text-muted">/{data.rSymbol}</span>
          <br />
        </div>
        <span className="text-muted">
          Vol {UtilService.formatNumber(data.volume)}
        </span>
      </div>

      <div className="symbol-column-price">
        <span className="symbol-label">{data.price}</span>
        <br />
        <span className="text-muted">
          {UtilService.formatCurrency(data.currency)}
        </span>
      </div>

      <div className="symbol-column-growth">
        <div className="d-flex justify-content-end">
          <div
            className={`d-flex justify-content-center align-items-center symbol-growth-container symbol-growth-${
              data.growth < 0 ? 'red' : 'green'
            }`}
          >
            {data.growth.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default Symbol;
