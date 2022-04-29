import { Injectable } from '@angular/core';
import Web3 from 'web3';
import Web3Modal from "web3modal";
import { BehaviorSubject, map, Observable } from 'rxjs';

import { TRANSFER_CONTRACT_ADDRESS, TRANSFER_TOKEN_ABI } from "../../abis";
import { Donation } from '../models/donation';
import { WEB3_MODAL_OPTIONS } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private web3js: any;
  private provider: any;
  private accounts: any;
  web3Modal: any
  contract: any

  donationsSource$ = new BehaviorSubject<Donation[]>([]);
  
  constructor() {
    this.web3Modal = new Web3Modal(WEB3_MODAL_OPTIONS);
    this.getDonations().then((result) => {
      this.donationsSource$.next(result);
    })
  }

  async tranferEthereum(transferAddress: string, amount: number, postId: number, message: string) {
    console.log(transferAddress);
    
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts(); 
    this.contract = new this.web3js.eth.Contract(TRANSFER_TOKEN_ABI, TRANSFER_CONTRACT_ADDRESS);

    const donate = await this.contract.methods.pay(transferAddress, message, postId).send({ from: this.accounts[0], value: amount * 1e18 })

    this.getDonations().then((result) => {
      this.donationsSource$.next(result);
    })

    return donate;
  }

  async getDonations() {
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts(); 
    this.contract = new this.web3js.eth.Contract(TRANSFER_TOKEN_ABI, TRANSFER_CONTRACT_ADDRESS);
    return await this.contract.methods.getDonations().call({
      from: this.accounts[0]
    });
  }

  getLiveDonations(): Observable<Donation[]> {
    return this.donationsSource$.asObservable();
  }

  getMoneyShared(account: string): Observable<string> {
    return this.getLiveDonations().pipe((map(donations => {
      const sum = donations.filter(donations => donations.accountSender === account)
                           .reduce((sum, donation) => sum + +donation.amount, 0)                           
      return Web3.utils.fromWei(sum.toString(), 'ether')
    })))
  }

  getMoneyReceived(account: string): Observable<string> {
    return this.getLiveDonations().pipe((map(donations => {
      const sum = donations.filter(donations => donations.accountReceiver === account)
                           .reduce((sum, donation) => sum + +donation.amount, 0)                           
      return Web3.utils.fromWei(sum.toString(), 'ether')
    })))
  }
}