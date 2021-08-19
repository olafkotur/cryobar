import React from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './custom.css';
import Footer from './components/Footer/Footer';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

export type TPage = 'dashboard' | 'search';

const App: React.FC<{}> = ({}) => {
  const [page, setPage] = React.useState<TPage>('dashboard');

  // mui theme
  const theme = createMuiTheme({
    typography: {
      fontFamily: '"Verdana"',
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
    palette: {
      primary: { main: '#E8BA41' },
      secondary: { main: '#fff' },
      error: { main: '#b33939' },
    },
    overrides: {
      MuiButton: {
        label: {
          fontSize: 12,
          textTransform: 'lowercase',
        },
      },
      MuiChip: {
        label: {
          fontSize: 12,
          textTransform: 'lowercase',
        },
      },
    },
  });

  /**
   * Navigates to provided page.
   * @param page - target page
   */
  const navigate = (page: TPage): void => {
    setPage(page);
  };

  return (
    <MuiThemeProvider theme={theme}>
      {page === 'dashboard' && <Dashboard />}
      <Footer page={page} navigate={navigate} />
    </MuiThemeProvider>
  );
};

render(<App />, mainElement);
