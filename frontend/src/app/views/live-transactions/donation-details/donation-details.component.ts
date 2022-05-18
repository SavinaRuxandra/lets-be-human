import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Donation } from 'src/app/models/donation';
import { Post } from 'src/app/models/post.model';
import { CharityOrganizationService } from 'src/app/services/charity-organization.service';
import { DonorService } from 'src/app/services/donor.service';
import { PostService } from 'src/app/services/post.service';
import { SharedHeadlineButtonDataService } from 'src/app/services/shared-headline-button-data.service';

@Component({
  selector: 'app-donation-details',
  templateUrl: './donation-details.component.html',
  styleUrls: ['./donation-details.component.scss']
})
export class DonationDetailsComponent implements OnInit {

  @Input() donation!: Donation;
  nameSender!: string;
  nameReceiver!: string; 

  constructor(private donorService: DonorService,
              private charityOrganizationService: CharityOrganizationService) { }

  ngOnInit(): void {
    this.charityOrganizationService.getCharityOrganizationByAddressAsObject(this.donation.accountReceiver)
      .then(charityOrganizaytion => this.nameReceiver = charityOrganizaytion.name);

    this.donorService.getDonorByAddress(this.donation.accountSender)
      .then(donor => this.nameSender = donor.username)
      .finally(() => {        
        if(this.nameSender == "")
          this.charityOrganizationService.getCharityOrganizationByAddressAsObject(this.donation.accountSender)
            .then(charityOrganizaytion => this.nameSender = charityOrganizaytion.name
            );
      })                     
  }
}
