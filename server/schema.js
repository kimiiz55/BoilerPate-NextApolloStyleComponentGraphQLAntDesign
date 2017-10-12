export default  `

type Cat {
  _id: String!
  name: String!
  age : Int
}

type Query {
  allCats: [Cat!]!
}

type Mutation {
  createCat(name: String!,age: Int): Cat!
}

`;
