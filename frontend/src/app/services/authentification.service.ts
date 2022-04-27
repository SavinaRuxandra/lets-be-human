import { HostListener, Injectable } from '@angular/core';
import Web3 from 'web3';
import Web3Modal from "web3modal";
import { CharityOrganization } from '../models/charity-organization.model';
import { Donor } from '../models/donor.model';
import { UserRole } from '../models/user-role.model';
import { SharedUserDataService } from './shared-user-data.service';
import { CharityOrganizationService } from './charity-organization.service';
import { DonorService } from './donor.service';
import { map } from 'rxjs';
import { WEB3_MODAL_OPTIONS } from '../shared/constants/constants';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  @HostListener('window:unload', [ '$event' ])
  unloadHandler() {
    this.logOut;
  }

  private web3js: any;
  private provider: any;
  private accounts: any;
  web3Modal: any

  constructor(private donorService: DonorService,
              private charityOrganizationService: CharityOrganizationService,
              private sharedUserDataService: SharedUserDataService,
              private router: Router) { 
    this.web3Modal = new Web3Modal(WEB3_MODAL_OPTIONS);
  }

  loginAsGuest(): void {
      this.sharedUserDataService.setCurrentUserRole(UserRole.GUEST);
  }

  logOut(): void {
      this.sharedUserDataService.cleanSessionStorage();
      this.router.navigate(['home'])
    }

  async connectDonorToMetamask() {
    
      this.web3Modal.clearCachedProvider();

      this.web3Modal = new Web3Modal(WEB3_MODAL_OPTIONS);
      this.provider = await this.web3Modal.connect();
      this.web3js = new Web3(this.provider);
      this.accounts = await this.web3js.eth.getAccounts();       
      
      this.setCurrentDonor(this.accounts[0]);
      
      window.ethereum.on('accountsChanged',  () => {         
        this.logOut();
      })
  }

  async connectCharityOrganizationToMetamask() {
      this.web3Modal.clearCachedProvider();

      this.web3Modal = new Web3Modal(WEB3_MODAL_OPTIONS);
      this.provider = await this.web3Modal.connect();
      this.web3js = new Web3(this.provider);
      this.accounts = await this.web3js.eth.getAccounts(); 
      
      this.setCurrentCharityOrganization(this.accounts[0]);

      window.ethereum.on('accountsChanged',  () => {         
      this.logOut();
      })
  }

  setCurrentDonor(address: string): void {    
      this.donorService.getDonorUsername(address).then((username) => {          
        
      const donor = <Donor> {
          accountAddress: address,
          username: username
      }
      
      this.sharedUserDataService.setCurrentDonor(donor);
      this.sharedUserDataService.setCurrentUserRole(UserRole.DONOR);
      this.sharedUserDataService.setCurrentAddress(address);      
      })
  }

  setCurrentCharityOrganization(address: string): void {    
        this.charityOrganizationService.getCharityOrganizationByAddress(address).then((result) => {

          const charityOrganization = <CharityOrganization> {
              email: result[0],
              name: result[1],
              description: result[2],
              phoneNumber: result[3],
              accountAddress: this.accounts[0]
          }          

          this.sharedUserDataService.setCurrentCharityOrganization(charityOrganization);
          this.sharedUserDataService.setCurrentUserRole(UserRole.CHARITY_ORGANIZATION);
          this.sharedUserDataService.setCurrentAddress(address);    
          })
      }
}
