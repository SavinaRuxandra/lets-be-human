import { FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service'; 

export function uniqueEmailValidator(controlName: string, userService: UserService) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];

    console.log(userService.checkUserEmailUnique(control.value));
    userService.checkUserEmailUnique(control.value).subscribe((response) => {
        if (response) 
            control.setErrors(null);
        else 
        control.setErrors({ uniqueEmail: true });
        });
    }
}
