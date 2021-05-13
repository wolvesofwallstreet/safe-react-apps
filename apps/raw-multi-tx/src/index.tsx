import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '@gnosis.pm/safe-react-components';
import { SafeProvider } from '@gnosis.pm/safe-apps-react-sdk';

import Main from './components/Main';
import GlobalStyles from './global';

ReactDOM.render(
  <>
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <SafeProvider>
        <Main />
      </SafeProvider>
    </ThemeProvider>
  </>,
  document.getElementById('root'),
);
