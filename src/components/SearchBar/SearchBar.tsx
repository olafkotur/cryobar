import { InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import * as React from 'react';

interface IProps {
  search: (query: string) => void;
}

const SearchBar: React.FC<IProps> = ({ search }) => {
  return (
    <div>
      <TextField
        fullWidth
        className="mb-2"
        style={{ color: '#fff', fontSize: 6 }}
        placeholder="Search..."
        type="search"
        onChange={(e) => search(e.target.value)}
        InputProps={{
          style: {
            color: '#fff',
            fontSize: 14,
          },
          startAdornment: (
            <InputAdornment position="start">
              <Search fontSize="small" color="primary" />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchBar;
