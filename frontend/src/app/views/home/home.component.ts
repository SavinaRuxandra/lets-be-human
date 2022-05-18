import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription, take } from 'rxjs';
import { UserRole } from 'src/app/models/user-role.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { CharityOrganizationService } from 'src/app/services/charity-organization.service';
import { DonorService } from 'src/app/services/donor.service';
import { SharedUserDataService } from 'src/app/services/shared-user-data.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { RegisterCharityOrganizationDialogComponent } from '../register/register-charity-organization-dialog/register-charity-organization-dialog.component';
import { RegisterDonorDialogComponent } from '../register/register-donor-dialog/register-donor-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentAddress$: Observable<string> = this.sharedUserDataService.getCurrentAddress();
  subscriptions$: Subscription[] = []

  constructor(private authentificationService: AuthentificationService,
              private sharedUserDataService: SharedUserDataService,
              private snackbar: SnackbarService,
              private donorService: DonorService,
              private charityOrganizationService: CharityOrganizationService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
  }

  loginAsDoner(): void {
    this.authentificationService.getCurrentAddress().then(address => {

      this.donorService.getDonorByAddress(address).then(donor => {

        this.charityOrganizationService.getCharityOrganizationByAddressAsObject(address).then(charityOrganization => {
          if(charityOrganization.name != "") 
            this.snackbar.error('There is already a charity organization registered with this address');

          else if(donor.username == "")
            this.openDonorRegisterDialog(address);

          else {
            this.authentificationService.setCurrentDonor(donor);
            this.router.navigate(["main-page"]);
          }
        })
      })
    })
  }

  loginAsCharityOrganization(): void {
    this.authentificationService.getCurrentAddress().then(address => {

      this.charityOrganizationService.getCharityOrganizationByAddressAsObject(address).then(charityOrganization => {

        this.donorService.getDonorByAddress(address).then(donor => {
          if(donor.username != "") 
            this.snackbar.error('There is already a donor registered with this address');

          else if(charityOrganization.name == "")
            this.openCharityOrganizationRegisterDialog(address);

          else {
            this.authentificationService.setCurrentCharityOrganization(charityOrganization);
            this.router.navigate(["main-page"]);
          }
        })
      })
    })
  }

  loginAsGuest(): void {
    this.sharedUserDataService.setCurrentUserRole(UserRole.GUEST);
    this.router.navigate(["main-page"]);
  }

  openDonorRegisterDialog(address: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = address;
    this.dialog.open(RegisterDonorDialogComponent, dialogConfig);
  }

  openCharityOrganizationRegisterDialog(address: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = address;
    this.dialog.open(RegisterCharityOrganizationDialogComponent, dialogConfig);
  }

  ngOnDestroy() {
    this.subscriptions$.forEach((subscription) => subscription.unsubscribe())
  }
}
