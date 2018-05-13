import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'mobx-react';
import main from './stores/main';
import App from './components/App';

const app = document.getElementById('app');
ReactDOM.render(
  <Provider main={main}>
    <App />
  </Provider>,
  app
);
