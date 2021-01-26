import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import apolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


const client = new apolloClient({});


ReactDOM.render(
  <ApolloProvider client={client} >
    <App />
  </ApolloProvider>
  ,
  document.getElementById('root')
);
