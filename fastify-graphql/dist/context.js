"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myContextFunction = void 0;
const myContextFunction = async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("Authorization header not found");
    }
    return {
        authorizationHeader: authHeader,
    };
};
exports.myContextFunction = myContextFunction;
