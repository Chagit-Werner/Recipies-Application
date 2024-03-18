import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../user.model';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

const emailRegEx =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const emailPatternValidator = (): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return control.value && !control.value.match(emailRegEx)
      ? { email: 'Invalid email format' }
      : null;
  };
};

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private _userService: UserService, private router: Router) {
  }
  userData = sessionStorage.getItem('userInfo');
  public name!: string;
  public registerForm!: FormGroup;
  public nextUserCode !: number
  ngOnInit(): void {
    this._userService.getUsers().subscribe(users => {
      this.nextUserCode = users.length; 
    });
    if (this.userData) {
      this.name = JSON.parse(this.userData).username;
    }
    this.registerForm = new FormGroup({
      "name": new FormControl("", [Validators.required, Validators.minLength(2)]),
      "address": new FormControl(""),
      "email": new FormControl("", [Validators.required, emailPatternValidator()]),
      "password": new FormControl("", [Validators.required, Validators.minLength(4)]),
    })

  }
  get emailErrorMessage() {
    const emailControl = this.registerForm.get('email');
    if (emailControl?.hasError('email')) {
      return emailControl.getError('email');
    }
    return null;
  }
  register(): void {

    let newUser: User = this.registerForm.value as User; // יש להמיר את הערכים לסוג User
    console.log("משתמש חדש:", this.registerForm.value );

    
    this._userService.register(newUser).subscribe({});
    if (this.userData) {
      const userInfo = JSON.parse(this.userData);
      userInfo.password = this.registerForm.get('password')?.value;
      userInfo.username = this.registerForm.get('name')?.value;
      userInfo.codeUser = this.nextUserCode;
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
    else {
      const userInfo = { username: this.registerForm.get('password')?.value, password: this.registerForm.get('name')?.value, userId: this.nextUserCode };
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
    this.router.navigate(['recipies/all-recipies'])

  }
}

