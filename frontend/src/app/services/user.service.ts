import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  public user: Observable<CharityOrganization | Donor | null> ;

  constructor(private httpClient: HttpClient,
              private charityOrganizationService: CharityOrganizationService, 
              private donorService: DonorService) { 
    this.userSubject = new BehaviorSubject<CharityOrganization | Donor | null>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): CharityOrganization | Donor | null {
    return this.userSubject.value;
  }

  login(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.userUrl}/login`, user)
      .pipe(
        map((response) => {          
          if(response.role === UserRole.CHARITY_ORGANIZATION) 
            this.charityOrganizationService.getCharityOrganizationById(response.id)
              .subscribe((charityOrganization) => {
                localStorage.setItem('currentUser', JSON.stringify(charityOrganization));
                this.userSubject.next(charityOrganization);
              })
          if(response.role === UserRole.DONOR) 
            this.donorService.getDonorById(response.id)
              .subscribe((donor) => {
                localStorage.setItem('currentUser', JSON.stringify(donor));
                this.userSubject.next(donor);
              })
          return response;
        }) 
      )
  }

  logOut(): void {
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
  }

  checkUserEmailUnique(email: string): Observable<Boolean> {
    return this.httpClient.get<Boolean>(`${this.userUrl}/check-unique-email/${email}`);
  }
}
