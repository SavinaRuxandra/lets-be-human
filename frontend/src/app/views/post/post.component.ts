import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { TransferService } from 'src/app/services/transfer.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomDonationDialogComponent } from './custom-donation-dialog/custom-donation-dialog.component';
import { Post } from 'src/app/models/post.model';
import { CharityOrganizationService } from 'src/app/services/charity-organization.service';
import { CharityOrganization } from 'src/app/models/charity-organization.model';
import { map, Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post!: Post
  photos: any
  charityOrganization$!: Observable<CharityOrganization>

  constructor(private transferService: TransferService,
              private charityOrganizationService: CharityOrganizationService,
              private dialog: MatDialog,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.charityOrganization$ = this.charityOrganizationService.getCharityOrganizationById(this.post.charityOrganizationId);
    this.photos = this.post.photos.map((photo: string) => this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + photo));
  }

  makeTransfer(amount: number): void {
    this.charityOrganization$.subscribe((charityOrganization) => 
          this.transferService.tranferEthereum(charityOrganization.accountAddress, amount)
      );
  }
 
  openDialog() {
    const dialogRef = this.dialog.open(CustomDonationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
