import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { EMPLOYEES } from './mock-employees';
import { catchError, Observable, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, Ht, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  private employeesUrl = 'api/employees';

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl).pipe(
      tap((_) => this.log('fetched employees')),
      catchError(this.handleError<Employee[]>('getEmployees', []))
    );
  }
  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http
      .get<Employee>(url)
      .pipe(tap((_) => this.log(`Fetched employee ${id}`)));
  }
  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(this.employeesUrl, employee, this.httpOptions).pipe(
      tap((_) => this.log(`updated employee ${employee.name}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http
      .post<Employee>(this.employeesUrl, employee, this.httpOptions)
      .pipe(
        tap((newEmployee: Employee) =>
          this.log(`added employee with id ${newEmployee.id}`)
        ),
        catchError(this.handleError<Employee>('addEmployee'))
      );
  }
  deleteEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.delete<Employee>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted Employee ${id}`)),
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }
  searchEmployees(term: string) {
    if (!term.trim()) {
      return of();
    }
    return this.http.get<Employee[]>(`${this.employeesUrl}/?name=${term}`).pipe(
      tap((t) =>
        t.length
          ? this.log(`found employees matching ${term}`)
          : this.log(`no employees matching ${term}`)
      ),
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }
}
