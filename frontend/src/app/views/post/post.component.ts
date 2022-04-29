import { Component, Input, OnInit } from '@angular/core';
import { TransferService } from 'src/app/services/transfer.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CustomDonationDialogComponent } from './custom-donation-dialog/custom-donation-dialog.component';
import { Post } from 'src/app/models/post.model';
import { CharityOrganizationService } from 'src/app/services/charity-organization.service';
import { CharityOrganization } from 'src/app/models/charity-organization.model';
import { Observable, take } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { HeaderButtonEnum } from 'src/app/models/header-button.enum';
import { SharedHeadlineButtonDataService } from 'src/app/services/shared-headline-button-data.service';
import { PostService } from 'src/app/services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post!: Post
  photos: any
  charityOrganization!: CharityOrganization
  activeButton$!: Observable<HeaderButtonEnum>;

  readonly CURRENT_USER_POSTS_BUTTON = HeaderButtonEnum.CURRENT_USER_POSTS

  constructor(private postService: PostService,
              private transferService: TransferService,
              private charityOrganizationService: CharityOrganizationService,
              private sharedHeadlineButtonDataService: SharedHeadlineButtonDataService,
              private dialog: MatDialog,
              private snack: MatSnackBar,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {    
    this.charityOrganizationService.getCharityOrganizationByAddress(this.post.charityOrganizationAddress)
      .then(result => {
          const charityOrganization = <CharityOrganization> {
            email: result[0],
            name: result[1],
            description: result[2],
            phoneNumber: result[3],
            accountAddress: this.post.charityOrganizationAddress
          } 
        this.charityOrganization = charityOrganization
      })
    this.photos = this.post.photos.map((photo: string) => this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + photo));
    this.activeButton$ = this.sharedHeadlineButtonDataService.activeButton;
  }

  deletePost(): void {
    this.postService.deletePostById(this.post.id)
        .pipe(take(1))
        .subscribe(() => {
          this.snack.open("Post successfully deleted", "x", {duration: 4000});
        },
        err => {
          this.snack.open("Post could not be deleted", "x", {duration: 4000})
        });

    window.location.reload();
    this.sharedHeadlineButtonDataService.changeActiveButton(HeaderButtonEnum.CURRENT_USER_POSTS);
  }

  updatePost(): void {

  }

  openConfirmationDialog(amount: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = amount;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(result => {
        if(result.response === true) 
          this.makeTransfer(amount, result.message)
      });
  }

  openCustomDonationDialog(): void {
    const dialogRef = this.dialog.open(CustomDonationDialogComponent);

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(result => {
        if(result.response === true) 
          this.makeTransfer(result.amount, result.message)
      });
  }

  makeTransfer(amount: number, message: string): void {
    this.transferService.tranferEthereum(this.charityOrganization.accountAddress, amount, this.post.id, message)
  }
}
