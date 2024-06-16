import { sendUnaryData, ServerUnaryCall, status } from "@grpc/grpc-js";
import {
  CreateEmployeeRequest,
  CreateEmployeeResponse,
  GetEmployeeRequest,
  GetEmployeeResponse,
  ListEmployeesRequest,
  ListEmployeesResponse,
  EmployeeServiceServer,
  Employee,
} from "@nodejs-microservices/protos/dist/employee/employee";
import { DataSource } from "typeorm";
import * as EmployeeController from "./controllers/employee.controller";

export function getEmployeeServer(db: DataSource): EmployeeServiceServer {
  async function createEmployee(
    call: ServerUnaryCall<CreateEmployeeRequest, CreateEmployeeResponse>,
    callback: sendUnaryData<CreateEmployeeResponse>
  ) {
    try {
      const employee = await EmployeeController.createEmployee(db, call.request);
      const employeePB = Employee.fromJSON(employee);
      const response: CreateEmployeeResponse = {
        employee: employeePB,
      };
      callback(null, response);
    } catch (err) {
      callback({ code: status.INTERNAL }, null);
      console.error(err);
    }
  }
  async function getEmployee(
    call: ServerUnaryCall<GetEmployeeRequest, GetEmployeeResponse>,
    callback: sendUnaryData<GetEmployeeResponse>
  ) {
    try {
      const employee = await EmployeeController.getEmployee(db, call.request.id);
      if (employee) {
        const employeePB = Employee.fromJSON(employee);
        const response: GetEmployeeResponse = {
          employee: employeePB,
        };
        callback(null, response);
      } else {
        callback(
          {
            code: status.NOT_FOUND,
            message: `employee ${call.request.id} not found`,
          },
          null
        );
      }
    } catch (err) {
      callback({ code: status.INTERNAL }, null);
      console.error(err);
    }
  }
  async function listEmployees(
    call: ServerUnaryCall<ListEmployeesRequest, ListEmployeesResponse>,
    callback: sendUnaryData<ListEmployeesResponse>
  ) {
    try {
      const employees = await EmployeeController.listEmployees(db);
      const employeesPB = employees.map(Employee.fromJSON);
      const response: ListEmployeesResponse = {
        employees: employeesPB,
      };
      callback(null, response);
    } catch (err) {
      callback({ code: status.INTERNAL }, null);
      console.error(err);
    }
  }

  return {
    createEmployee,
    getEmployee,
    listEmployees,
  };
}