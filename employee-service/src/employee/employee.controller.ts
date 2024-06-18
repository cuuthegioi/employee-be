import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { EmployeeService } from './employee.service';
import { Employee, EmployeeById } from './employee.interface';

interface createEmployeeReq {
  firstName: string;
  lastName: string;
  department: string;
  address: string;
  phoneNumber: string;
}

interface updateEmployeeReq extends createEmployeeReq {
  id: number;
}

@Controller()
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @GrpcMethod('EmployeeService', 'CreateEmployee')
  createEmployee(data: createEmployeeReq): Promise<Employee> {
    return this.employeeService.create(data);
  }

  @GrpcMethod('EmployeeService', 'GetEmployee')
  getEmployee(id: number): Promise<Employee> {
    return this.employeeService.findOne(id);
  }

  @GrpcMethod('EmployeeService', 'GetAllEmployees')
  getAllEmployees(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @GrpcMethod('EmployeeService', 'UpdateEmployee')
  updateEmployee(data: updateEmployeeReq): Promise<Employee> {
    return this.employeeService.update(data);
  }

  @GrpcMethod('EmployeeService', 'DeleteEmployee')
  deleteEmployee(data: EmployeeById): void {
    this.employeeService.delete(data.id);
  }
}
