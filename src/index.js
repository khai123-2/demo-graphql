import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "http";
import * as db from "./database/dbConnection.js";
import sequelize from "./config/instance.js";
import typeDefs from "./graphql/combinedTypes.js";
import resolvers from "./graphql/combinedResolvers.js";
const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
await server.start();
//connect to database
db.dbConnection();
sequelize
  .sync()
  .then(() => {
    console.log("sync");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json(), expressMiddleware(server));
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);
