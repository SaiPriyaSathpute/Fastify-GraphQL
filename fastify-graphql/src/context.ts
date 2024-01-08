import { ApolloFastifyContextFunction } from "@as-integrations/fastify";

export interface MyContext {
    authorizationHeader?: string;
  }

export const myContextFunction: ApolloFastifyContextFunction<MyContext> = async (request, reply) => {
    const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Authorization header not found");
  }

  return {
    authorizationHeader: authHeader,
  };
};


