import { ApolloServer } from "@apollo/server";
import fastifyApollo, { fastifyApolloHandler,fastifyApolloDrainPlugin } from "@as-integrations/fastify";
import Fastify from "fastify";
import mongoose from "mongoose";

import { MyContext, myContextFunction } from "./context";
import resolvers from "./resolvers";
import typeDefs from "./typedefs";

async function start(){

const fastify = await Fastify();

mongoose.connect('mongodb://127.0.0.1:27017/accountdb');

const apollo = new ApolloServer<MyContext>({
	typeDefs,
	resolvers,
});

await apollo.start();

await fastify.register(fastifyApollo(apollo), {
	context: myContextFunction,
});

fastify.post("/",
    fastifyApolloHandler(apollo, {
        context: myContextFunction,
    }),
);

fastify.listen({port: 3000,}, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});

}

start();