import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CharityOrganization } from '../models/charity-organization.model';
import { Donor } from '../models/donor.model';
import { UserRole } from '../models/user-role.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SharedUserDataService {

  private userRoleSource$: Subject<UserRole> = new BehaviorSubject(this.getCurrentUserRoleFromStorage());
  private addressSource$: Subject<string> = new BehaviorSubject(this.getCurrentAddressFromStorage());
  private donorSource$: Subject<Donor> = new BehaviorSubject(this.getCurrentDonorFromStorage());
  private charityOrganizationSource$: Subject<CharityOrganization> = new BehaviorSubject(this.getCurrentCharityOrganizationFromStorage());

  constructor() { }

  setCurrentUserRole(userRole: UserRole) {
    sessionStorage.setItem('userRole', userRole);
    this.userRoleSource$.next(userRole);
  }

  getCurrentUserRoleFromStorage(): UserRole {
    const role = sessionStorage.getItem('userRole')!;
    if(role == UserRole.CHARITY_ORGANIZATION) 
      return UserRole.CHARITY_ORGANIZATION
    else if(role == UserRole.DONOR) 
      return UserRole.DONOR
    else if(role == UserRole.GUEST) 
      return UserRole.GUEST
    else 
      return UserRole.LOGGED_OUT
  }

  getCurrentUserRole(): Observable<UserRole> {
    this.userRoleSource$.asObservable().subscribe(c => console.log(c)
    )
    return this.userRoleSource$.asObservable();
  }

  setCurrentAddress(address: string) {
    sessionStorage.setItem('currentAddress', address);
    this.addressSource$.next(address);
  }

  getCurrentAddressFromStorage(): string {
    return sessionStorage.getItem('currentAddress')!;
  }

  getCurrentAddress(): Observable<string> {
    return this.addressSource$.asObservable();
  }

  setCurrentDonor(donor: Donor) {    
    sessionStorage.setItem('currentDonor', JSON.stringify(donor));
    this.donorSource$.next(donor);
  }

  getCurrentDonorFromStorage(): Donor {
    const donor = JSON.parse(sessionStorage.getItem('currentDonor')!)
    return <Donor>(donor);
  }

  getCurrentDonor(): Observable<Donor> {
    return this.donorSource$.asObservable();
  }

  setCurrentCharityOrganization(charityOrganization: CharityOrganization) {
    sessionStorage.setItem('charityOrganization', JSON.stringify(charityOrganization));
    this.charityOrganizationSource$.next(charityOrganization);
  }

  getCurrentCharityOrganizationFromStorage(): CharityOrganization {
    const charityOrganization = JSON.parse(sessionStorage.getItem('charityOrganization')!)
    return <CharityOrganization>(charityOrganization);
  }

  getCurrentCharityOrganization(): Observable<CharityOrganization> {
    return this.charityOrganizationSource$.asObservable();
  }

  cleanSessionStorage(): void {
    this.setCurrentUserRole(UserRole.LOGGED_OUT)
    sessionStorage.removeItem('currentAddress');
    sessionStorage.removeItem('currentDonor')
    sessionStorage.removeItem('charityOrganization')
  }
}
