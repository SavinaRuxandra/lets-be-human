import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CharityOrganization } from '../models/charity-organization.model';
import { Donor } from '../models/donor.model';
import { UserRole } from '../models/user-role.model';

@Injectable({
  providedIn: 'root'
})
export class SharedUserDataService {

  private userRoleSource$!: Subject<UserRole>;
  private addressSource$!: Subject<string>;
  private donorSource$!: Subject<Donor>;
  private charityOrganizationSource$!: Subject<CharityOrganization>;

  constructor() { 
    this.updateOnReload();
  }

  updateOnReload() {
    this.userRoleSource$ = new BehaviorSubject(this.getCurrentUserRoleFromStorage());
    this.addressSource$ = new BehaviorSubject(this.getCurrentAddressFromStorage());
    this.donorSource$ = new BehaviorSubject(this.getCurrentDonorFromStorage());
    this.charityOrganizationSource$ = new BehaviorSubject(this.getCurrentCharityOrganizationFromStorage());
  }

  setCurrentUserRole(userRole: UserRole) {    
    sessionStorage.setItem('userRole', userRole);
    this.userRoleSource$.next(userRole);
  }

  private getCurrentUserRoleFromStorage(): UserRole {
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
    return this.userRoleSource$.asObservable();
  }

  setCurrentAddress(address: string): void {
    sessionStorage.setItem('currentAddress', address);
    this.addressSource$.next(address);
  }

  private getCurrentAddressFromStorage(): string {
    return sessionStorage.getItem('currentAddress')!;
  }

  getCurrentAddress(): Observable<string> {
    return this.addressSource$.asObservable();
  }

  setCurrentDonor(donor: Donor): void {    
    sessionStorage.setItem('currentDonor', JSON.stringify(donor));
    this.donorSource$.next(donor);
  }

  private getCurrentDonorFromStorage(): Donor {
    const donor = JSON.parse(sessionStorage.getItem('currentDonor')!)
    return <Donor>(donor);
  }

  getCurrentDonor(): Observable<Donor> {
    return this.donorSource$.asObservable();
  }

  setCurrentCharityOrganization(charityOrganization: CharityOrganization): void {
    sessionStorage.setItem('charityOrganization', JSON.stringify(charityOrganization));
    this.charityOrganizationSource$.next(charityOrganization);
  }

  private getCurrentCharityOrganizationFromStorage(): CharityOrganization {
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
