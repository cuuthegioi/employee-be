import { sendUnaryData, ServerUnaryCall, status } from "@grpc/grpc-js";
import {
  CreateEmployeeRequest,
  CreateEmployeeResponse,
  GetEmployeeRequest,
  GetEmployeeResponse,
  ListEmployeesRequest,
  ListEmployeesResponse,
  EmployeeServiceServer,
} from "@nodejs-microservices/protos/dist/employee/employee";
import { DataSource } from "typeorm";

export function getEmployeeServer(db: DataSource): EmployeeServiceServer {
  async function createEmployee(
    call: ServerUnaryCall<CreateEmployeeRequest, CreateEmployeeResponse>,
    callback: sendUnaryData<CreateEmployeeResponse>
  ) {
    callback({ code: status.UNIMPLEMENTED }, null);
  }
  async function getEmployee(
    call: ServerUnaryCall<GetEmployeeRequest, GetEmployeeResponse>,
    callback: sendUnaryData<GetEmployeeResponse>
  ) {
    callback({ code: status.UNIMPLEMENTED }, null);
  }
  async function listEmployees(
    call: ServerUnaryCall<ListEmployeesRequest, ListEmployeesResponse>,
    callback: sendUnaryData<ListEmployeesResponse>
  ) {
    callback({ code: status.UNIMPLEMENTED }, null);
  }

  return {
    createEmployee,
    getEmployee,
    listEmployees,
  };
}