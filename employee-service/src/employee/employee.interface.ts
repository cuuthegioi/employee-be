export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  address: string;
  phoneNumber: string;
}

export interface EmployeeById {
  id: number;
}

export interface Employees {
  employees: Employee[];
}
