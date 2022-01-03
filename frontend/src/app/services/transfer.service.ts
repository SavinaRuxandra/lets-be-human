import { Injectable } from '@angular/core';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Subject } from 'rxjs';
import Web3 from 'web3';
import Web3Modal from "web3modal";
import tockenAbi from "../../../../truffle/build/contracts/Transfer.json";

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  // Web3 = require('web3');
  // require: any;
  // window: any;
  // tokenAbi = require('../../../../truffle/build/contracts/Transfer.json');

  // constructor() {
  //   if (window.ethereum === undefined) {
  //     alert('Non-Ethereum browser detected. Install MetaMask');
  //   } 
  //   else {
  //     if (typeof window.web3 !== 'undefined') {
  //       this.web3 = window.web3.currentProvider;
  //     } 
  //     else {
  //       this.web3 = new Web3.providers.HttpProvider('http://localhost:8545');
  //     }
  //     console.log('transfer.service :: constructor :: window.ethereum');
  //     window.web3 = new Web3(window.ethereum);
  //     console.log('transfer.service :: constructor :: this.web3');
  //     console.log(this.web3);
  //     this.enable = this.enableMetaMaskAccount();
  //   }
  //  }

  //  private async enableMetaMaskAccount(): Promise<any> {
  //   let enable = false;
  //   await new Promise((resolve, reject) => {
  //     enable = window.ethereum.enable();
  //   });
  //   return Promise.resolve(enable);
  // }  

  web3js: any;
  provider: any;
  accounts: any;
  uDonate: any;
  tokenAbi: any;
  web3Modal

  private accountStatusSource = new Subject<any>();
  accountStatus$ = this.accountStatusSource.asObservable();
  private newOrganization = new Subject<any>();
  newOrganization$ = this.newOrganization.asObservable();

  constructor() {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "INFURA_ID" // required
        }
      }
    };

    this.web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: "rgb(39, 49, 56)",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(16, 26, 32)"
      }
    });
  }

  async connectAccount() {
    this.web3Modal.clearCachedProvider();

    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts(); 
    this.accountStatusSource.next(this.accounts)
  }

  // async createOrganization(orgID, payableWallet, orgName, tokenAddress) {
  // this.provider = await this.web3Modal.connect(); // set provider
  //   this.web3js = new Web3(this.provider); // create web3 instance
  //   this.accounts = await this.web3js.eth.getAccounts(); 

  //   this.uDonate = new this.web3js.eth.Contract(uDonate_abi, uDonate_address);

  //   const create = await this.uDonate
  //     .methods.createOrganization(orgID, payableWallet, orgName, tokenAddress)
  //     .send({ from: this.accounts[0] });
  //   return create;
  // }

  private async getAccount(): Promise<any> {
    console.log('transfer.service :: getAccount :: start');
    if (this.accounts == null) {
      this.accounts = await new Promise((resolve, reject) => {
        window.web3.eth.getAccounts((err: null, retAccount: string | any[]) => {
          if (retAccount.length > 0) {
            this.accounts = retAccount[0];
            resolve(this.accounts);
          } else {
            alert('transfer.service :: getAccount :: no accounts found.');
            reject('No accounts found.');
          }
          if (err != null) {
            alert('transfer.service :: getAccount :: error retrieving account');
            reject('Error retrieving account');
          }
        });
      }) as Promise<any>;
    }
    return Promise.resolve(this.accounts);
  }

  public async getUserBalance(): Promise<any> {
    const account = await this.getAccount();
    console.log('transfer.service :: getUserBalance :: account');
    console.log(account);
    return new Promise((resolve, reject) => {
      window.web3.eth.getBalance(account, function(err: any, balance: any) {
        console.log('transfer.service :: getUserBalance :: getBalance');
        console.log(balance);
        if (!err) {
          const retVal = {
            account: account,
            balance: balance
          };
          console.log('transfer.service :: getUserBalance :: getBalance :: retVal');
          console.log(retVal);
          resolve(retVal);
        } else {
          reject({account: 'error', balance: 0});
        }
      });
    }) as Promise<any>;
  }

  transferEther(value: { transferAddress: string; amount: string; }) {
    const that = this;

    return new Promise((resolve, reject) => {
      console.log('transfer.service :: transferEther :: tokenAbi');
      console.log(this.tokenAbi);
      const contract = require('@truffle/contract');
      const transferContract = contract(this.tokenAbi);
      transferContract.setProvider(that.web3js);
      console.log('transfer.service :: transferEther :: transferContract');
      console.log(transferContract);
      transferContract.deployed().then(function(instance: { pay: (arg0: any, arg1: { from: any; value: any; }) => any; }) {
        return instance.pay(
          value.transferAddress,
          {
            from: that.accounts,
            value: value.amount
          });
      }).then(function(status: any) {
        if (status) {
          return resolve({status: true});
        }
      }).catch(function(error: any) {
        console.log(error);
        return reject('transfer.service error');
      });
    });
  }
}
