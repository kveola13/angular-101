import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees = [
      {
        id: 1234,
        name: 'John Wick',
        email: 'wick@itera.no',
      },
      {
        id: 1235,
        name: 'Gandalf the Grey',
        email: 'greyg@itera.no',
      },
      {
        id: 1236,
        name: 'Rubeus Hagrid',
        email: 'ruhag@itera.no',
      },
      {
        id: 1237,
        name: 'Kujo Jolyne',
        email: 'jojo@itera.no',
      },
      {
        id: 1238,
        name: 'Agent 47',
        email: 'hitman@itera.no',
      },
      {
        id: 1239,
        name: 'Spyro the Dragon',
        email: 'dragon@itera.no',
      },
      {
        id: 1240,
        name: 'Crash Bandicoot',
        email: 'crash@itera.no',
      },
      {
        id: 1241,
        name: 'Jane Doe',
        email: 'doe@itera.no',
      },
    ];
    return { employees };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(employees: Employee[]): number {
    return employees.length > 0
      ? Math.max(...employees.map((employees) => employees.id)) + 1
      : 11;
  }
}
