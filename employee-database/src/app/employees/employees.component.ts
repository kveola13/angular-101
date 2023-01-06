import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent {
  employees: Employee[] = [];
  selectedEmployee?: Employee;
  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService
  ) {}
  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;
    this.messageService.add(
      `EmployeeService: Selected employee id=${employee.id}`
    );
  }
  getEmployees(): void {
    this.employeeService
      .getEmployees()
      .subscribe((employees) => (this.employees = this.employees));
  }
  ngOnInit(): void {
    this.getEmployees();
  }
}

/*
export class EmployeesComponent implements OnInit {
  newEmployee = 'Ingunn Tangen Era';

  employee: Employee = {
    id: 1,
    name: 'Arne Mjøs',
    email: 'test@test.no',
  };
  constructor() {}

  ngOnInit(): void {}
}
*/
