import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { TRANSFER_CONTRACT_ADDRESS, TRANSFER_TOKEN_ABI } from "../../abis";
import { Donation } from '../models/donation';


@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private web3js!: Web3;
  private accounts: any;
  private contract: any;

  donationsSource$ = new BehaviorSubject<Donation[]>([]);
  balanceSource$ = new BehaviorSubject<string>('0');
  
  constructor() {
    if(window.ethereum) {
      this.web3js = new Web3(window.ethereum);
      this.accounts = this.web3js.eth.getAccounts(); 
      this.contract = new this.web3js.eth.Contract(TRANSFER_TOKEN_ABI, TRANSFER_CONTRACT_ADDRESS);
      this.setDonations();
      this.setBalance();

      const $this = this;
      this.contract.events.DonationEvent({}, function(err: any, result: any): void {
        $this.setDonations();
        $this.setBalance();
      })
    }
    else {
      this.web3js = new Web3();
      this.web3js.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"))
      this.contract = new this.web3js.eth.Contract(TRANSFER_TOKEN_ABI, TRANSFER_CONTRACT_ADDRESS);
      this.setDonations();

      const $this = this;
      this.contract.events.DonationEvent({}, function(err: any, result: any): void {
        $this.setDonations();
      })
    }
  }

  async tranferEthereum(transferAddress: string, amount: number, postId: number, message: string): Promise<void> {
    this.accounts = await this.web3js.eth.getAccounts(); 
    await this.contract.methods.pay(transferAddress, message, postId).send({
       from: this.accounts[0], value: Web3.utils.toWei(amount.toString(), 'ether') }
    )
  }

  private async getDonations() {
    this.accounts = await this.web3js.eth.getAccounts(); 
    return await this.contract.methods.getDonations().call();
  }

  private setDonations(): void {
    let donationObjects: Donation[] = [];
    this.getDonations().then((donations) => {
      donations.forEach((donation: any[]) => {
        donationObjects.push(this.buildDonationObjFromList(donation));
      })
      this.donationsSource$.next(donationObjects);
    })
  }

  getLiveDonations(): Observable<Donation[]> {
    return this.donationsSource$.asObservable();
  }

  private buildDonationObjFromList(donation: any[]): Donation {
    return <Donation> {
      accountSender: donation[0],
      accountReceiver: donation[1],
      amount: parseFloat(parseFloat(Web3.utils.fromWei(donation[2], 'ether')).toFixed(5)),
      postId: donation[3],
      message: donation[4]
    }
  }

  private async getBalance(): Promise<string> {  
    this.accounts = await this.web3js.eth.getAccounts(); 
    return this.web3js.eth.getBalance(this.accounts[0]).then((balance: string) => {
      return parseFloat(Web3.utils.fromWei(balance, 'ether')).toFixed(5);
    })
  }

  private setBalance(): void {
    this.getBalance().then((balance) => {
      this.balanceSource$.next(balance);
    })
  }

  getCurrentBalance(): Observable<string> {
    return this.balanceSource$.asObservable();
  }

  getMoneyShared(address: string): Observable<string> {
    return this.getLiveDonations().pipe((map(donations => {
      const sum = donations.filter(donations => donations.accountSender === address)
                           .reduce((sum, donation) => sum + +donation.amount, 0)                           
      return sum.toFixed(5).toString();
    })))
  }

  getMoneyReceived(address: string): Observable<string> {
    return this.getLiveDonations().pipe((map(donations => {
      const sum = donations.filter(donation => donation.accountReceiver === address)
                           .reduce((sum, donation) => sum + +donation.amount, 0)                           
      return sum.toFixed(5).toString();
    })))
  }

  getMoneyRaisedForPost(postId: number): Observable<string> {
    return this.getLiveDonations().pipe((map(donations => {      
      const sum = donations.filter(donation => donation.postId == postId)
                           .reduce((sum, donation) => sum + +donation.amount, 0)                           
      return sum.toFixed(5).toString();
    })))
  }

  getNoHelpedCauses(address: string): Observable<number> {
    return this.getLiveDonations().pipe((map(donations => {      
      return donations.filter(donation => donation.accountSender == address)
                      .length                           
    })))
  }
}
