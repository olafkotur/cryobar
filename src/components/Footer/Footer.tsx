import * as React from 'react';
import Navigation from '../Navigation/Navigation';
import { FavoriteBorder, Search } from '@material-ui/icons';
import { TPage } from '../../App';
import './footer.css';

interface IProps {
  page: TPage;
  navigate: (page: TPage) => void;
}

const Footer: React.FC<IProps> = ({ page, navigate }) => {
  return (
    <div className="d-flex justify-content-end align-items-center footer-container">
      <Navigation
        self="dashboard"
        page={page}
        navigate={navigate}
        Icon={FavoriteBorder}
      />
      <Navigation self="search" page={page} navigate={navigate} Icon={Search} />
    </div>
  );
};

export default Footer;
