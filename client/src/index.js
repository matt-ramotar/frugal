import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { Provider } from 'react-redux';
import 'fontsource-roboto';

import App from './App';
import configureStore from './store/configureStore';

const link = createHttpLink({ uri: 'http://localhost:5000/graphql' });
const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link,
});

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
