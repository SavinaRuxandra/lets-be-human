import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Donor } from '../models/donor.model';

@Injectable({
  providedIn: 'root'
})
export class DonorService {

  private donorUrl = `${environment.baseUrl}/donors`

  constructor(private httpClient: HttpClient) { }

  addDonor(donor: Donor): Observable<Donor> {
    return this.httpClient.post<Donor>(`${this.donorUrl}`, donor)
  }

  getDonorById(id: number): Observable<Donor> {
    return this.httpClient.get<Donor>(`${this.donorUrl}/{id}`)
  }
}
