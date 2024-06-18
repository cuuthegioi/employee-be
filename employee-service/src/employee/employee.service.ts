import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';

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

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(employee: createEmployeeReq): Promise<Employee> {
    return this.employeeRepository.save(employee);
  }

  async findOne(id: number): Promise<Employee> {
    return this.employeeRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async update(employee: updateEmployeeReq): Promise<Employee> {
    await this.employeeRepository.update(employee.id, {
      ...employee,
      updatedAt: new Date(),
    });
    return this.employeeRepository.findOne({
      where: {
        id: employee.id,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.employeeRepository.update(id, {
      deletedAt: new Date(),
    });
  }
}
