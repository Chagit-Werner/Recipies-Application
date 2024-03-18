import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { UserService } from '../../../services/user.service';
import { User } from '../../user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(private _userService: UserService, private router: Router) {}
  public userName !: string;
  public password!: string;
  public loginForm!: FormGroup;
  public users: User[] = []
  errorMessage: string | null = null;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "name": new FormControl("", [Validators.required, Validators.minLength(2)]),
      "password": new FormControl("", [Validators.required, Validators.minLength(4)]),
    })
    this._userService.getUsers().subscribe({
      next: (res) => {     
        this.users = res;

      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  saveDataInSessionStorage(): void {
    let codeUser;
    if(this.users.some(u => u.name === this.userName && u.password === this.password))
    {
       codeUser= this.users.find(u => u.name ===this.userName && u.password === this.password)?.id ;
    }    
    const userInfo = { username: this.userName, password: this.password, userId : codeUser };
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
  }
  login(): void {
    this.userName = this.loginForm.get('name')?.value;
    this.password = this.loginForm.get('password')?.value;
    let userLogin = this.loginForm.value
    this._userService.login(userLogin).subscribe({
      next: (res) => {
        if (res === 2) {
          //הודעה על סיסמא שגויה
          this.errorMessage = "Incorrect password";
          this.loginForm.controls['password'].reset();
        }
        else if (res == 1) {
          this.saveDataInSessionStorage();
          //מעבר לדף המתכונים
          this.router.navigate(['/recipies/all-recipies'])
        }
        else {
          {
            Swal.fire({
              title: "It seems u don't have an accoount",
              icon: "success",
              showCancelButton: false,
              timer: 2500
            });
            this.saveDataInSessionStorage();
            this.router.navigate(['register'])
          }
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}


