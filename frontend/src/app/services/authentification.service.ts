import { Injectable, NgZone } from '@angular/core';
import Web3 from 'web3';
import Web3Modal from "web3modal";
import { CharityOrganization } from '../models/charity-organization.model';
import { Donor } from '../models/donor.model';
import { UserRole } from '../models/user-role.model';
import { SharedUserDataService } from './shared-user-data.service';
import { Router } from '@angular/router';
import { WEB3_MODAL_OPTIONS } from 'src/environments/environment';
import { SnackbarService } from './snackbar.service';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private web3js: any;
  private provider: any;
  private accounts: any;
  web3Modal: any

  constructor(private sharedUserDataService: SharedUserDataService,
              private router: Router,
              private snack: SnackbarService,
              private ngZone: NgZone) { 
    this.web3Modal = new Web3Modal(WEB3_MODAL_OPTIONS);
    this.onChangeAddress();
  }

  async getCurrentAddress(): Promise<string> {
    this.web3Modal.clearCachedProvider();

    this.web3Modal = new Web3Modal(WEB3_MODAL_OPTIONS);
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts();       
    
    return this.accounts[0];
  }

  setCurrentDonor(donor: Donor): void {                    
    this.sharedUserDataService.setCurrentDonor(donor);
    this.sharedUserDataService.setCurrentUserRole(UserRole.DONOR);
    this.sharedUserDataService.setCurrentAddress(donor.accountAddress);      
  }

  setCurrentCharityOrganization(charityOrganization: CharityOrganization): void {    
    this.sharedUserDataService.setCurrentCharityOrganization(charityOrganization);
    this.sharedUserDataService.setCurrentUserRole(UserRole.CHARITY_ORGANIZATION);
    this.sharedUserDataService.setCurrentAddress(charityOrganization.accountAddress);    

  }

  logOut(): void {
    this.router.navigate(['/home']);
    this.sharedUserDataService.cleanSessionStorage();
  }

  onChangeAddress(): void {
    window.ethereum.on('accountsChanged', () => this.ngZone.run(() => {
      if(this.router.url != '/home') {        
        this.logOut();
        this.snack.info("Uups! Looks like you changed your current address. Login again with the new address");
      }
    }));
  }

  // onChangeAddress(): void {
  //   window.ethereum.on('accountsChanged', () => this.ngZone.run(() => {
  //     let currentRole;
  //     this.sharedUserDataService.getCurrentUserRole().pipe(take(1)).subscribe(role => currentRole = role)
  //     if(currentRole != UserRole.LOGGED_OUT) {        
  //       this.logOut();
  //       this.snack.info("Uups! Looks like you changed your current address. Login again with the new address");
  //     }
  //   }));
  // }
}


