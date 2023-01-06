import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EMPLOYEES } from '../mock-employees';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent {
  employees = EMPLOYEES;
  selectedEmployee?: Employee;
  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;
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
