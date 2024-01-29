const typeDefs = `
type account{
    accountId:Int
    firstName: String
    lastName: String
    accountType:String
  }

type Query {
  getAccountById(id:Int!): account
}

`;

export default typeDefs;