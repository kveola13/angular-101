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
}
