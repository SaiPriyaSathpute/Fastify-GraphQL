import { MyContext} from "./context";
import {regional,national} from "./model"
import {verify} from "jsonwebtoken"

const resolvers = {
  Query: {
    getAccountById: async (parent, args, context:MyContext, info) => {
      const { id } = args;
      const channel=extractChannel(context.authorizationHeader);
      if (channel === "national") {
        return getNationalData(id);
      } else if (channel === "regional") {
        return getRegionalData(id);
      }
      return null; // Handle unknown channel
    },
  },
};

function extractChannel(authHeader:string){
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7); // Remove 'Bearer ' from the header
        const decodedToken = verify(token, 'secret-key'); 
        const channel=decodedToken.channel;
        return channel;
    }
}

async function getNationalData(id:Number){
    try {
        const data = await national.findOne({ acctId:id });
        const res={accountId:data.acctId,firstName:data.firstName,lastName:data.lastName,accountType:data.acctType};
        return res;
      } catch (error) {
        console.error(error);
      }
}

async function getRegionalData(id:Number){
    try {
        const data = await regional.findOne({ accountId:id });
        return data;
      } catch (error) {
        console.error(error);
      }
}

export default resolvers;