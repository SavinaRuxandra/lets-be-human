import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Donor } from 'src/app/models/donor.model';
import { DonorService } from 'src/app/services/donor.service';
import { SharedUserDataService } from 'src/app/services/shared-user-data.service';

@Component({
  selector: 'app-register-donor-dialog',
  templateUrl: './register-donor-dialog.component.html',
  styleUrls: ['./register-donor-dialog.component.scss']
})
export class RegisterDonorDialogComponent {

  username: string = ""
  currentAddress!: string

  constructor(private sharedUserDataService: SharedUserDataService,
              private donorService: DonorService,
              private router: Router) {
    this.sharedUserDataService.getCurrentAddress().pipe(take(1)).subscribe(address => this.currentAddress = address);
  }

  continue(): void {    
    if(this.username.trim() === "")
      this.username = "New Donor"
    this.donorService.setDonorUsername(this.currentAddress, this.username).then(() => {
      const donor = <Donor> {
        accountAddress: this.currentAddress,
        username: this.username
      }
      this.sharedUserDataService.setCurrentDonor(donor);
      this.router.navigate(["main-page"]);
    })
  }
}
