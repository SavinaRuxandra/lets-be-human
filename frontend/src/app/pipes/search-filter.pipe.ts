import { Pipe, PipeTransform } from '@angular/core';
import { take } from 'rxjs';
import { CharityOrganization } from '../models/charity-organization.model';
import { Post } from '../models/post.model';
import { CharityOrganizationService } from '../services/charity-organization.service';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  charityOrganizations!: CharityOrganization[]

  constructor(private charityOrganizationService: CharityOrganizationService) {
    this.charityOrganizationService.getCharityOrganizations()
      .then((charityOrganizations) => this.charityOrganizations = charityOrganizations)
  }

  transform(posts: Post[] | null, searchInput: string): Post[] | null {

    if (!posts) {
      return [];
    }

    if(!searchInput || searchInput.trim() == "") {
      return posts;
    }
      
    return posts!.filter( post => {
        const charityOrganization: CharityOrganization = this.charityOrganizations.filter(charityOrganization => charityOrganization.accountAddress === post.charityOrganizationAddress)[0];        
        return charityOrganization.name.trim().toLowerCase().indexOf(searchInput.trim().toLowerCase()) == 0;
      });
  }
}
