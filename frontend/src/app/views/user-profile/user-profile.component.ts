import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CharityOrganization } from 'src/app/models/charity-organization.model';
import { Donor } from 'src/app/models/donor.model';
import { UserRole } from 'src/app/models/user-role.model';
import { CharityOrganizationService } from 'src/app/services/charity-organization.service';
import { DonorService } from 'src/app/services/donor.service';
import { PostService } from 'src/app/services/post.service';
import { SharedUserDataService } from 'src/app/services/shared-user-data.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  currentUserRole!: UserRole;
  currentAddress!: string
  currentDonor!: Donor;
  currentCharityOrganization!: CharityOrganization;

  moneyShared$!: Observable<string> 
  moneyReceived$!: Observable<string> 
  currentBalance$!: Observable<string> 
  numberOfPosts$!: Observable<number> 
  numberHelpedCauses$!: Observable<number> 

  username!: FormControl;
  editCharityOrganizationForm!: FormGroup;
  editMode: boolean = false;
  subscriptions$: Subscription[] = [];

  readonly DONOR = UserRole.DONOR
  readonly CHARITY_ORGANIZATION = UserRole.CHARITY_ORGANIZATION

  constructor(private sharedUserDataService: SharedUserDataService,
              private transferService: TransferService,
              private donorService: DonorService,
              private charityOrganizationService: CharityOrganizationService,
              private postService: PostService,
              private snackbar: SnackbarService,
              private formBuilder: FormBuilder) {

    this.subscriptions$.push(
      this.sharedUserDataService.getCurrentUserRole().subscribe(role => this.currentUserRole = role),
      this.sharedUserDataService.getCurrentAddress().subscribe(address => this.currentAddress = address),
      this.sharedUserDataService.getCurrentDonor().subscribe(donor => this.currentDonor = donor),
      this.sharedUserDataService.getCurrentCharityOrganization().subscribe(charityOrganization => this.currentCharityOrganization = charityOrganization)
    )
  }

  ngOnInit(): void {
    this.moneyShared$ = this.transferService.getMoneyShared(this.currentAddress);
    this.moneyReceived$ = this.transferService.getMoneyReceived(this.currentAddress); 
    this.currentBalance$ = this.transferService.getCurrentBalance();
    this.numberOfPosts$  = this.postService.getNoPostsOfCharityOrganization(this.currentAddress);
    this.numberHelpedCauses$ = this.transferService.getNoHelpedCauses(this.currentAddress);
  }

  createUsernameFormControl(): void {
    this.username = new FormControl(this.currentDonor.username, [Validators.required]);
  }

  updateDonor(): void {
    this.donorService.setDonorUsername(this.currentAddress, this.username.value).then(() => {
      this.snackbar.success("Username updated successfully");
      this.donorService.getDonorByAddress(this.currentAddress).then(donor => {
        this.currentDonor = donor;       
        this.sharedUserDataService.setCurrentDonor(donor);
        this.editMode = false;  

      })
    }).catch(() => {
      this.snackbar.error("Username could not be updated")
      this.editMode = false; 
    }
    );
  }

  createCharityOrganizationFormBuilder() {
    this.editCharityOrganizationForm = this.formBuilder.group({
      name: [this.currentCharityOrganization.name, Validators.required],
      email: [this.currentCharityOrganization.email, [Validators.email]],
      description: [this.currentCharityOrganization.description, Validators.required],
      phoneNumber: [this.currentCharityOrganization.phoneNumber]
    })
  }

  updateCharityOrganization(): void {
    const charityOrganization: CharityOrganization = <CharityOrganization> {
      accountAddress: this.currentAddress,
      name: this.editCharityOrganizationForm.controls['name'].value,
      email: this.editCharityOrganizationForm.controls['email'].value,
      description: this.editCharityOrganizationForm.controls['description'].value,
      phoneNumber: this.editCharityOrganizationForm.controls['phoneNumber'].value
    }

    this.charityOrganizationService.updateCharityOrganization(charityOrganization.accountAddress,
                                                              charityOrganization.email,
                                                              charityOrganization.name,
                                                              charityOrganization.description,
                                                              charityOrganization.phoneNumber)
        .then(() => {
          this.currentCharityOrganization = charityOrganization;       
          this.sharedUserDataService.setCurrentCharityOrganization(charityOrganization);
          this.editMode = false;  
        }).catch(() => {
          this.snackbar.error("Profile could not be updated")
          this.editMode = false; 
        })              
  }

  ngOnDestroy() {
    this.subscriptions$.forEach((subscription) => subscription.unsubscribe())
  }

}
