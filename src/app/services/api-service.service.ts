import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IInput } from '../interfaces/iinput';
import { Observable } from 'rxjs';
import { IAddress } from '../interfaces/iaddress';
import { IInputDetails } from '../interfaces/iinput-details';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}

  getCurrentInput(): Observable<IInput> {
    return this.http.get<IInput>(environment.apiUrl + 'Current');
  }

  getAddressDetails(id: number): Observable<IAddress> {
    return this.http.get<IAddress>(environment.apiUrl + 'AddressDetails/' + id);
  }

  getAllAddresses(): Observable<IAddress[]> {
    return this.http.get<IAddress[]>(environment.apiUrl + 'GetAllAdresses');
  }

  saveInputDetails(details: IInputDetails): Observable<IInputDetails> {
    return this.http.post<IInputDetails>(
      environment.apiUrl + 'SaveInputDetails',
      JSON.stringify(details),
      httpOptions
    );
  }
}
