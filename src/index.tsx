import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Root } from './Root';
import { PageSizeProvider } from './storage/PageSizeContext';
import { FavProvider } from './storage/FavContext';
import { store } from './app/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <PageSizeProvider>
          <FavProvider>
            <Root />
          </FavProvider>
        </PageSizeProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
