import { HttpClient } from '@angular/common/http';
import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CharityOrganization } from '../models/charity-organization.model';
import { Donor } from '../models/donor.model';
import { UserRole } from '../models/user-role.model';
import { User } from '../models/user.model';
import { CharityOrganizationService } from './charity-organization.service';
import { DonorService } from './donor.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = `${environment.baseUrl}/users`;
  private userSubject: BehaviorSubject<CharityOrganization | Donor | null>;
  public user: Observable<CharityOrganization | Donor | null>;

  @HostListener('window:unload', [ '$event' ])
  unloadHandler() {
    // this.logOut;
  }

  constructor(private httpClient: HttpClient,
              private charityOrganizationService: CharityOrganizationService, 
              private donorService: DonorService
              ) { 

    this.userSubject = new BehaviorSubject<CharityOrganization | Donor | null> (
      JSON.parse(sessionStorage.getItem('currentUser')!)
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): CharityOrganization | Donor | null {
    return this.userSubject.value;
  }


  checkUserEmailUnique(email: string): Observable<Boolean> {
    return this.httpClient.get<Boolean>(`${this.userUrl}/check-unique-email/${email}`);
  }
}
