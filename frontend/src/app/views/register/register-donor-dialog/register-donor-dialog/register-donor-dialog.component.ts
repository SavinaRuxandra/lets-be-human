import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Donor } from 'src/app/models/donor.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { DonorService } from 'src/app/services/donor.service';
import { SharedUserDataService } from 'src/app/services/shared-user-data.service';

@Component({
  selector: 'app-register-donor-dialog',
  templateUrl: './register-donor-dialog.component.html',
  styleUrls: ['./register-donor-dialog.component.scss']
})
export class RegisterDonorDialogComponent {

  username: string = "";
  address: string

  constructor(private authentificationService: AuthentificationService,
              private donorService: DonorService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) address: string) {
    this.address = address;
  }

  continue(): void {    
    if(this.username.trim() == "")
      this.username = "New Donor"
    this.donorService.setDonorUsername(this.address, this.username).then(() => {
      const donor = <Donor> {
        username: this.username,
        accountAddress: this.address
      }
      this.authentificationService.setCurrentDonor(donor);
      this.router.navigate(["main-page"]);
    })
  }
}
