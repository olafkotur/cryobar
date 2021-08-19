import * as React from 'react';
import { IconButton } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { TPage } from '../../App';

interface IProps {
  self: TPage;
  page: TPage;
  navigate: (page: TPage) => void;
  // tslint:disable-next-line: no-any
  Icon: OverridableComponent<any>;
}

const Navigation: React.FC<IProps> = ({ page, self, navigate, Icon }) => {
  return (
    <IconButton size="small" className="mr-2" onClick={() => navigate(self)}>
      <Icon
        fontSize="small"
        color={`${page === self ? 'primary' : 'secondary'}`}
      />
    </IconButton>
  );
};

export default Navigation;
