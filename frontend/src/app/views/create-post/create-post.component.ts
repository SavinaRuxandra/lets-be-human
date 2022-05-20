import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { create } from 'ipfs-http-client';
import { take } from 'rxjs';
import { HeaderButtonEnum } from 'src/app/models/header-button.enum';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { SharedHeadlineButtonDataService } from 'src/app/services/shared-headline-button-data.service';
import { SharedUserDataService } from 'src/app/services/shared-user-data.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  createPostForm!: FormGroup;
  photos: any[] = [];
  photosArrayBuffer: any [] = [];
  currentAddress!: string;

  constructor(private postService: PostService,
              private sharedUserDataService: SharedUserDataService,
              private sharedHeadlineButtonDataService: SharedHeadlineButtonDataService,
              private formBuilder: FormBuilder,
              private router: Router,
              private snackbar: SnackbarService
              ) { }

  ngOnInit(): void {
    this.sharedUserDataService.getCurrentAddress().pipe(take(1)).subscribe((address) => this.currentAddress = address)
    this.createFormGroup();
  }

  createFormGroup(): void {
    this.createPostForm = this.formBuilder.group({
      headline: ['', Validators.required],
      description: ['',  Validators.required],
      readMoreUrl: ''
    })
  }

  onFileChanges(event: any): void {
    const reader1 = new FileReader();
    const reader2 = new FileReader();

    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader1.readAsDataURL(file);
      reader1.onload = () => {
        this.photos.push(Buffer.from(reader1.result!));
      };

      reader2.readAsArrayBuffer(file);
      reader2.onload = () => {
        this.photosArrayBuffer.push(reader2.result);
      }
    }
  }

  async addPost(): Promise<void> {
    const postToAdd: Post = <Post> {
      charityOrganizationAddress: this.currentAddress,
      headline: this.createPostForm.controls['headline'].value,
      description: this.createPostForm.controls['description'].value,
      readMoreUrl: this.createPostForm.controls['readMoreUrl'].value,
    };

    const ipfs = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
    });

    postToAdd.photos = []    
    for (let i = 0; i < this.photosArrayBuffer.length; i++) {
      await ipfs.add(this.photosArrayBuffer[i])
        .then((file:any) => {          
          postToAdd.photos.push(file.path);
        })  
    }     
    
    this.postService.addPost(postToAdd)
      .then(() => {
        this.snackbar.success("Post successfully added");
        this.goBack();
      },
      err => {
        this.snackbar.error("The post could not be added");
      })
  }

  removeImageAtIndex(index: number): void {
    this.photos.splice(index, 1);
    this.photosArrayBuffer.splice(index, 1);
  }

  cancel(): void {
    this.goBack();
  }

  goBack(): void {
    this.sharedHeadlineButtonDataService.setActiveButton(HeaderButtonEnum.ALL_POSTS);
    this.router.navigate(['/main-page']);
  }
}