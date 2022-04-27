import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { DonorService } from 'src/app/services/donor.service';
import { SharedUserDataService } from 'src/app/services/shared-user-data.service';
import { RegisterCharityOrganizationDialogComponent } from '../register/register-charity-organization-dialog/register-charity-organization-dialog.component';
import { RegisterDonorDialogComponent } from '../register/register-donor-dialog/register-donor-dialog/register-donor-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentAddress$: Observable<string> = this.sharedUserDataService.getCurrentAddress();

  constructor(private authentificationService: AuthentificationService,
              private sharedUserDataService: SharedUserDataService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
  }

  loginAsDoner(): void {
    this.authentificationService.connectDonorToMetamask().then(() => {
      this.sharedUserDataService.getCurrentDonor().pipe(take(1)).subscribe(donor => {   
        if(donor.username == "")
          this.openDonorRegisterDialog();
        else
          this.router.navigate(["main-page"]);
      })
    })
  }

  loginAsCharityOrganization(): void {
    this.authentificationService.connectCharityOrganizationToMetamask().then(() => {
      this.sharedUserDataService.getCurrentCharityOrganization().pipe(take(1)).subscribe(charityOrganization => {   
        
        if(charityOrganization.email == "")
          this.openCharityOrganizationRegisterDialog();
        else
          this.router.navigate(["main-page"]);
      })
    })
  }

  loginAsGuest(): void {
    this.authentificationService.loginAsGuest();
    this.router.navigate(["main-page"]);
  }

  openDonorRegisterDialog(): void {
    this.dialog.open(RegisterDonorDialogComponent);
  }

  openCharityOrganizationRegisterDialog(): void {
    this.dialog.open(RegisterCharityOrganizationDialogComponent);
  }
}
