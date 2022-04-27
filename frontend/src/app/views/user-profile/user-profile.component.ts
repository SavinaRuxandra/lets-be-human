import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  currentDonor: Observable<Donor>  = this.sharedUserDataService.getCurrentDonor();
  userRole$: Observable<UserRole> = this.sharedUserDataService.getCurrentUserRole();

  constructor(private transferService: TransferService,
              private sharedUserDataService: SharedUserDataService) { }

  ngOnInit(): void {
  }

}
