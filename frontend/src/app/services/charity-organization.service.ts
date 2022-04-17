import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CharityOrganization } from '../models/charity-organization.model';

@Injectable({
  providedIn: 'root'
})
export class CharityOrganizationService {
  
  private charityOrganizationUrl = `${environment.baseUrl}/charity-organizations`

  constructor(private httpClient: HttpClient) { }

  addCharityOrganization(charityOrganization: CharityOrganization): Observable<CharityOrganization> {
    return this.httpClient.post<CharityOrganization>(`${this.charityOrganizationUrl}`, charityOrganization);
  }

  getCharityOrganizationById(id: number): Observable<CharityOrganization> {
    return this.httpClient.get<CharityOrganization>(`${this.charityOrganizationUrl}/${id}`)
  }
}
