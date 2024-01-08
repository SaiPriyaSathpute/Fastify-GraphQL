"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = typeDefs;
