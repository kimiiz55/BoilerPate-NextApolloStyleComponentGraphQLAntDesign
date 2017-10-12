import { ApolloClient, createNetworkInterface } from 'react-apollo'
import fetch from 'isomorphic-fetch'

let apolloClient = null

if (!process.browser) {
  global.fetch = fetch
}

function create (initialState) {
  return new ApolloClient({
    initialState,  //ssrForceFetchDelay: 100, ไว้ตั้งค่า delay อยากใส่ก็ใส่
    ssrMode: !process.browser, // ssrMode : true คือมันจะไม่ดึงซ้ำซ้อน (if เช็คจากด้านบน if(!process.browser)) 
    networkInterface: createNetworkInterface({
      uri: 'http://localhost:3000/graphql', // <--- ไว้แก้ Graphql ตอนนี้ปรับมาละยังไม่ต้องแก้ 
      opts: { // same-origin เพราะว่าต้องใช้ Domain เดียวกัน 
        credentials: 'same-origin',
      }
    })
  })
}

export default function initApollo (initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
