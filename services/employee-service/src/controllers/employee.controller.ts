import { DataSource } from "typeorm";
import { Employee } from "../models/employee";

interface createEmployeeReq {
  firstName: string;
  lastName: string;
  department: string;
  address: string;
  phoneNumber: string;
}

export const createEmployee = async (
  db: DataSource,
  req: createEmployeeReq
): Promise<Employee> => {
  const employeeRepository = db.getRepository(Employee);
  const employee = new Employee();
  employee.firstName = req.firstName;
  employee.lastName = req.lastName;
  employee.department = req.department;
  employee.address = req.address;
  employee.phoneNumber = req.phoneNumber;
  return employeeRepository.save(employee);
};

export const listEmployees = async (db: DataSource): Promise<Employee[]> => {
  const employeeRepository = db.getRepository(Employee);
  return employeeRepository.find();
};

export const getEmployee = async (
  db: DataSource,
  id: number
): Promise<Employee | null> => {
  const employeeRepository = db.getRepository(Employee);
  return employeeRepository.findOneBy({ id: id });
};