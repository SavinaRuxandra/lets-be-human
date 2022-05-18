import { Component, Input, OnInit } from '@angular/core';
import { TransferService } from 'src/app/services/transfer.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomDonationDialogComponent } from './custom-donation-dialog/custom-donation-dialog.component';
import { Post } from 'src/app/models/post.model';
import { CharityOrganizationService } from 'src/app/services/charity-organization.service';
import { CharityOrganization } from 'src/app/models/charity-organization.model';
import { Observable, take } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { HeaderButtonEnum } from 'src/app/models/header-button.enum';
import { SharedHeadlineButtonDataService } from 'src/app/services/shared-headline-button-data.service';
import { PostService } from 'src/app/services/post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserRole } from 'src/app/models/user-role.model';
import { SharedUserDataService } from 'src/app/services/shared-user-data.service';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post!: Post;
  photos!: any[];
  charityOrganization!: CharityOrganization;
  currentUserRole!: UserRole;
  activeButton$: Observable<HeaderButtonEnum> = this.sharedHeadlineButtonDataService.getActiveButton();
  editMode: boolean = false;
  moneyRaised$!: Observable<string>;
  editForm!: FormGroup;

  readonly ALL_POSTS_BUTTON = HeaderButtonEnum.ALL_POSTS
  readonly WISHLIST_POSTS = HeaderButtonEnum.WISHLIST_POSTS
  readonly CURRENT_USER_POSTS_BUTTON = HeaderButtonEnum.CURRENT_USER_POSTS

  constructor(private postService: PostService,
              private transferService: TransferService,
              private charityOrganizationService: CharityOrganizationService,
              private sharedHeadlineButtonDataService: SharedHeadlineButtonDataService,
              private sharedUserDataService: SharedUserDataService,
              private dialog: MatDialog,
              private snackbar: SnackbarService,
              private formBuilder: FormBuilder,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {    
    this.charityOrganizationService.getCharityOrganizationByAddressAsObject(this.post.charityOrganizationAddress).then(charityOrganization => {
        this.charityOrganization = charityOrganization
      })
    this.sharedUserDataService.getCurrentUserRole().pipe(take(1)).subscribe(userRole => this.currentUserRole = userRole);
    this.photos = this.post.photos.map((photo: string) => this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + photo));
    this.moneyRaised$ = this.transferService.getMoneyRaisedForPost(this.post.id);
  }

  openCustomDonationDialog(): void {
    if(this.currentUserRole === UserRole.GUEST) 
      this.snackbar.error("Log in with metamask in order to donate");
    else {
      const dialogRef = this.dialog.open(CustomDonationDialogComponent);

      dialogRef.afterClosed()
        .pipe(take(1))
        .subscribe(result => {
          if(result.response === true) 
            this.makeTransfer(result.amount, result.message)
        });
    }
  }

  makeTransfer(amount: number, message: string): void {
    this.transferService.tranferEthereum(this.charityOrganization.accountAddress, amount, this.post.id, message)
  }

  openEditMode(): void {
    this.createEditForm();
    this.editMode = true;
  }

  createEditForm(): void {
    this.editForm = this.formBuilder.group({
      headline: [this.post.headline, Validators.required],
      description: [this.post.description, Validators.required],
      readMoreUrl: this.post.readMoreUrl
    })
  }

  updatePost(): void {        
    const postToUpdate: Post = <Post> {
      id: this.post.id,
      headline: this.editForm.controls['headline'].value,
      description: this.editForm.controls['description'].value,
      readMoreUrl: this.editForm.controls['readMoreUrl'].value,
    };
    this.postService.updatePost(postToUpdate)
    .pipe(take(1))
    .subscribe(() => {
      this.postService.getPostById(this.post.id).subscribe(post => this.post = post);
      this.snackbar.success("Post successfully updated");
    },
    err => {
      this.snackbar.error("The post could not be updated");
    })
    this.editMode = false;
  }

  cancelEdit(): void {
    this.editMode = false;
  }

  openConfirmDeteleDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(response => {
        if(response === true) 
          this.deletePost();
      });
  }

  deletePost(): void {
    this.postService.deletePostById(this.post.id)
        .pipe(take(1))
        .subscribe(() => {
          window.location.reload();
          this.snackbar.success("Post successfully deleted");
        },
        err => {
          this.snackbar.error("Post could not be deleted")
        });

    this.sharedHeadlineButtonDataService.setActiveButton(HeaderButtonEnum.CURRENT_USER_POSTS);
  }

  getTooltipInfo(): string {    
    let message = `${this.charityOrganization.description}\n\nEmail: ${this.charityOrganization.email}`
    if(this.charityOrganization.phoneNumber) {
      message += `\nPhone number: ${this.charityOrganization.phoneNumber}`
    }
    return message;
  }

  ngOnDestroy() {
    this.editMode = false;
  }
}
