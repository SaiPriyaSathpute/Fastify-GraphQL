"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const fastify_1 = __importStar(require("@as-integrations/fastify"));
const fastify_2 = __importDefault(require("fastify"));
const mongoose_1 = __importDefault(require("mongoose"));
const context_1 = require("./context");
const resolvers_1 = __importDefault(require("./resolvers"));
const typedefs_1 = __importDefault(require("./typedefs"));
async function start() {
    const fastify = await (0, fastify_2.default)();
    mongoose_1.default.connect('mongodb://127.0.0.1:27017/accountdb');
    const apollo = new server_1.ApolloServer({
        typeDefs: typedefs_1.default,
        resolvers: resolvers_1.default,
        plugins: [(0, fastify_1.fastifyApolloDrainPlugin)(fastify)],
    });
    await apollo.start();
    await fastify.register((0, fastify_1.default)(apollo), {
        context: context_1.myContextFunction,
    });
    fastify.post("/", (0, fastify_1.fastifyApolloHandler)(apollo, {
        context: context_1.myContextFunction,
    }));
    fastify.listen({ port: 3000, }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    });
}
start();
