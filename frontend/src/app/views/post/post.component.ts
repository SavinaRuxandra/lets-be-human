import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { TransferService } from 'src/app/services/transfer.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomDonationDialogComponent } from './custom-donation-dialog/custom-donation-dialog.component';
import { Post } from 'src/app/models/post.model';
import { CharityOrganizationService } from 'src/app/services/charity-organization.service';
import { CharityOrganization } from 'src/app/models/charity-organization.model';
import { Observable, take } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { HeaderButtonEnum } from 'src/app/shared/constants/header-button.enum';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { PostService } from 'src/app/services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post!: Post
  photos: any
  charityOrganization$!: Observable<CharityOrganization>
  activeButton$!: Observable<HeaderButtonEnum>;

  readonly CURRENT_USER_POSTS_BUTTON = HeaderButtonEnum.CURRENT_USER_POSTS

  constructor(private postService: PostService,
              private transferService: TransferService,
              private charityOrganizationService: CharityOrganizationService,
              private sharedDataService: SharedDataService,
              private dialog: MatDialog,
              private snack: MatSnackBar,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.charityOrganization$ = this.charityOrganizationService.getCharityOrganizationById(this.post.charityOrganizationId);
    this.photos = this.post.photos.map((photo: string) => this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + photo));
    this.activeButton$ = this.sharedDataService.activeButton;
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
    this.sharedDataService.changeActiveButton(HeaderButtonEnum.CURRENT_USER_POSTS);
  }

  updatePost(): void {

  }

  makeTransfer(amount: number): void {
    this.charityOrganization$
      .pipe(take(1))
      .subscribe((charityOrganization) => 
            this.transferService.tranferEthereum(charityOrganization.accountAddress, amount)
      );
  }
 
  openDialog() {
    const dialogRef = this.dialog.open(CustomDonationDialogComponent);

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }
}
