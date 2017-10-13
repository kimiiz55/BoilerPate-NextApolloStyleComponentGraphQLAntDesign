// อีก Version แบบรับ headers พร้อม initailState 


import {
  ApolloClient,
  createNetworkInterface
} from 'react-apollo';
import fetch from 'isomorphic-fetch';

let apolloClient = null;

if (!process.browser) {
  global.fetch = fetch;
}

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/graphql', // TODO: Change this to server's grapql
  opts: {
    credentials: 'same-origin'
    // headers: {  //ถ้าจะฝาก cookie 
    //   cookie: req.header('Cookie'),
    // },
  }
});
สนแlollldsss
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    const token = window.localStorage.getItem('token');
    req.options.headers.authorization = token || null;
    next();
  }
}]);

function create(headers, initialState) {
  return new ApolloClient({
    initialState,
    ssrMode: !process.browser,
    networkInterface
  });
}


export default function initApollo(headers, initialState = {}) {
  if (!process.browser) {
    return create(headers, initialState);
  }

  if (!apolloClient) {
    apolloClient = create(headers, initialState);
  }

  return apolloClient;
}