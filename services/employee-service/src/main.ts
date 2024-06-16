import "reflect-metadata";
import dataSource from "./db";
import { Server, ServerCredentials } from "@grpc/grpc-js";
import { getEmployeeServer } from "./server";
import { EmployeeServiceService } from "@nodejs-microservices/protos/dist/employee/employee";

const server = new Server();

const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT) || 50051;

const address = `${HOST}:${PORT}`;

dataSource
  .initialize()
  .then((db) => {
    server.addService(EmployeeServiceService, getEmployeeServer(db));
    server.bindAsync(
      address,
      ServerCredentials.createInsecure(),
      (error, port) => {
        if (error) {
          throw error;
        }
        console.log("server is running on", port);
        server.start();
      }
    );
  })
  .catch((error) => console.log(error));
  