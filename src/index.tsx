import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import client from './apolloClient';
import { ApolloProvider } from '@apollo/client';
import { Provider as JotaiProvider } from 'jotai';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ApolloProvider client={client}>
    <JotaiProvider>
      <App />
    </JotaiProvider>
  </ApolloProvider>
);
