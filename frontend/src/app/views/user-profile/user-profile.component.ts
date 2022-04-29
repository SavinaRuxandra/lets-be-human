import { Component, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { CharityOrganization } from 'src/app/models/charity-organization.model';
import { Donor } from 'src/app/models/donor.model';
import { UserRole } from 'src/app/models/user-role.model';
import { SharedUserDataService } from 'src/app/services/shared-user-data.service';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  currentUserRole$: Observable<UserRole> = this.sharedUserDataService.getCurrentUserRole();
  currentAddress$: Observable<string> = this.sharedUserDataService.getCurrentAddress();
  currentDonor$: Observable<Donor>  = this.sharedUserDataService.getCurrentDonor();
  currentCharityOrganization$: Observable<CharityOrganization> = this.sharedUserDataService.getCurrentCharityOrganization();
  moneyShared$!: Observable<string>;
  moneyReceived$!: Observable<string>;

  subscription1$!: Subscription;
  subscription2$!: Subscription;

  readonly DONOR = UserRole.DONOR
  readonly CHARITY_ORGANIZATION = UserRole.CHARITY_ORGANIZATION

  constructor(private sharedUserDataService: SharedUserDataService,
              private transferService: TransferService) {
   }

  ngOnInit(): void {
    this.subscription1$ = this.currentAddress$.subscribe(address => {
      this.moneyShared$ = this.transferService.getMoneyShared(address);
    })

    this.subscription2$ = this.currentAddress$.subscribe(address => {
      this.moneyReceived$ = this.transferService.getMoneyReceived(address);
    })
  }
  

  ngOnDestroy() {
    this.subscription1$.unsubscribe()
    this.subscription2$.unsubscribe()
}

}
