"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
const jsonwebtoken_1 = require("jsonwebtoken");
const resolvers = {
    Query: {
        getAccountById: async (parent, args, context, info) => {
            const { id } = args;
            const channel = extractChannel(context.authorizationHeader);
            if (channel === "national") {
                return getNationalData(id);
            }
            else if (channel === "regional") {
                return getRegionalData(id);
            }
            return null; // Handle unknown channel
        },
    },
};
function extractChannel(authHeader) {
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7); // Remove 'Bearer ' from the header
        const decodedToken = (0, jsonwebtoken_1.verify)(token, 'secret-key');
        const channel = decodedToken.channel;
        return channel;
    }
}
async function getNationalData(id) {
    try {
        const data = await model_1.national.findOne({ acctId: id });
        const res = { accountId: data.acctId, firstName: data.firstName, lastName: data.lastName, accountType: data.acctType };
        return res;
    }
    catch (error) {
        console.error(error);
    }
}
async function getRegionalData(id) {
    try {
        const data = await model_1.regional.findOne({ accountId: id });
        return data;
    }
    catch (error) {
        console.error(error);
    }
}
exports.default = resolvers;
