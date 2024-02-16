import React, { PropsWithChildren } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.EXPO_PUBLIC_GQL_ENDPOINT,
  cache: new InMemoryCache(),
});

export const ApolloClientProvider = ({ children }: PropsWithChildren<{}>) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
