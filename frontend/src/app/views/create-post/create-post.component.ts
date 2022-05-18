import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  photosFile: File[] = [];
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
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.photos.push(reader.result?.toString());
        this.photosFile.push(file);
      };
    }
  }

  addPost(): void {
    const postToAdd: Post = <Post> {
      charityOrganizationAddress: this.currentAddress,
      headline: this.createPostForm.controls['headline'].value,
      description: this.createPostForm.controls['description'].value,
      readMoreUrl: this.createPostForm.controls['readMoreUrl'].value,
    };

    const formData = new FormData();
    formData.append('post', new Blob([JSON.stringify(postToAdd)], { type: 'application/json' }))

    for (let i = 0; i < this.photosFile.length; i++) {
      formData.append('photos', this.photosFile[i]);
    }

    this.postService.addPost(formData)
        .pipe(take(1))
        .subscribe(() => {
          this.snackbar.success("Post successfully added");
          this.goBack();
        },
        err => {
          this.snackbar.error("The post could not be added");
        })
  }

  removeImageAtIndex(index: number): void {
    this.photos.splice(index, 1);
    this.photosFile.splice(index, 1);
  }

  cancel(): void {
    this.goBack();
  }

  goBack(): void {
    this.sharedHeadlineButtonDataService.setActiveButton(HeaderButtonEnum.ALL_POSTS);
    this.router.navigate(['/main-page']);
  }
}