import { Injectable, NgZone } from '@angular/core';
import Web3 from 'web3';
import Web3Modal from "web3modal";
import { CharityOrganization } from '../models/charity-organization.model';
import { Donor } from '../models/donor.model';
import { UserRole } from '../models/user-role.model';
import { SharedUserDataService } from './shared-user-data.service';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { SharedHeadlineButtonDataService } from './shared-headline-button-data.service';
import { HeaderButtonEnum } from '../models/header-button.enum';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private web3js: any;
  private accounts: any;

  constructor(private sharedUserDataService: SharedUserDataService,
              private sharedHeadlineButtonDataService: SharedHeadlineButtonDataService,
              private router: Router,
              private snack: SnackbarService,
              private ngZone: NgZone) { 
    this.onChangeAddress();
  }

  async getCurrentAddress(): Promise<string> {
    if(window.ethereum) {
      this.web3js = new Web3(window.ethereum);
      this.accounts = await this.web3js.eth.getAccounts();       
      
      return this.accounts[0];
    }

    else {
      this.snack.error("You need MetaMask in order to connect. Try to login as guest")
      return "";
    }

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
    this.sharedHeadlineButtonDataService.setActiveButton(HeaderButtonEnum.ALL_POSTS)
    this.sharedUserDataService.cleanSessionStorage();
  }

  onChangeAddress(): void {
    if(window.ethereum) {
      window.ethereum.on('accountsChanged', () => this.ngZone.run(() => {
        if(this.router.url != '/home') {        
          this.logOut();
          this.snack.info("Uups! Looks like you changed your current address");
        }
      }));
    }
    }
}


