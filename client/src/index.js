import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import App from './App';
import 'fontsource-roboto';

const link = createHttpLink({ uri: 'http://localhost:5000/graphql' });
const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
