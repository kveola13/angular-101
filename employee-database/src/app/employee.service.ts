import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Employee } from './employee';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private employeesUrl = 'api/employees';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl).pipe(
      tap((_) => this.log('fetched employees')),
      catchError(this.handleError<Employee[]>('getEmployees', []))
    );
  }

  getEmployeeNo404(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/?id=${id}`;
    return this.http.get<Employee[]>(url).pipe(
      map((employeees) => employeees[0]),
      tap((h) => {
        const outcome = h ? 'fetched' : 'did not find';
        this.log(`${outcome} employee id=${id}`);
      }),
      catchError(this.handleError<Employee>(`getEmployee id=${id}`))
    );
  }

  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<Employee>(url).pipe(
      tap((_) => this.log(`fetched employee id=${id}`)),
      catchError(this.handleError<Employee>(`getEmployee id=${id}`))
    );
  }

  searchEmployees(term: string): Observable<Employee[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Employee[]>(`${this.employeesUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found employees matching "${term}"`)
          : this.log(`no employees matching "${term}"`)
      ),
      catchError(this.handleError<Employee[]>('searchEmployees', []))
    );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http
      .post<Employee>(this.employeesUrl, employee, this.httpOptions)
      .pipe(
        tap((newEmployee: Employee) =>
          this.log(`added employee w/ id=${newEmployee.id}`)
        ),
        catchError(this.handleError<Employee>('addEmployee'))
      );
  }

  deleteEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;

    return this.http.delete<Employee>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted employee id=${id}`)),
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(this.employeesUrl, employee, this.httpOptions).pipe(
      tap((_) => this.log(`updated employee id=${employee.id}`)),
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`EmployeeService: ${message}`);
  }
}
