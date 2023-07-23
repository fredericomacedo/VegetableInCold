import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { VegetablesInCold } from '../model/vegetable-in-cold';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class VegetableService {
  private _vegetables = new BehaviorSubject<VegetablesInCold[]>([]);
  public readonly vegetables$ = this._vegetables.asObservable();

  constructor(private http: HttpClient) {
    this.getVegetables();
  }
  getVegetable(id: string): Observable<VegetablesInCold> {
    const apiUrl = `http://localhost:3000/vegetables/${id}`;
    return this.http.get<VegetablesInCold>(apiUrl);
  }
  getVegetables() {
    const apiUrl = 'http://localhost:3000/vegetables';
    this.http.get<VegetablesInCold[]>(apiUrl).subscribe(vegetables => {
      this._vegetables.next(vegetables);
    });
  }

  createVegetable(newVegetable: VegetablesInCold): Observable<VegetablesInCold> {
    const apiUrl = 'http://localhost:3000/vegetables';
    return this.http.post<VegetablesInCold>(apiUrl, newVegetable).pipe(
      tap(() => {
        this._vegetables.next([...this._vegetables.getValue(), newVegetable]);
      })
    );
  }
  

  updateVegetable(updatedVegetable: VegetablesInCold): Observable<any> {
    console.log("id in service", updatedVegetable.id);
    const apiUrl = `http://localhost:3000/vegetables/${updatedVegetable.id}`;
    return this.http.put(apiUrl, updatedVegetable).pipe(tap(() => {
      const currentVegetables = this._vegetables.getValue();
      const updatedVegetables = currentVegetables.map(vegetable =>
        vegetable.Id === updatedVegetable.Id ? updatedVegetable : vegetable);
      this._vegetables.next(updatedVegetables);
    }));
  }
  

  deleteVegetable(id: number) {
    const apiUrl = `http://localhost:3000/vegetables/${id}`;
    this.http.delete(apiUrl).subscribe(() => {
      const currentVegetables = this._vegetables.getValue();
      const updatedVegetables = currentVegetables.filter(vegetable => Number(vegetable.Id) !== id);
      this._vegetables.next(updatedVegetables);
    });
  }
  
}
