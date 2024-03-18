import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logout',
  standalone: true, 
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.logout();
  }

  logout() {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      showCancelButton: true,
      confirmButtonText: 'Yes , logout!!',
      cancelButtonText: 'Cancel',
      cancelButtonColor: 'rgb(255, 17, 164)',
      confirmButtonColor: 'rgb(255, 17, 164)',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        this.router.navigate(['/home']); 
      } else {
        this.router.navigate(['/home']); 
      }
    });
  }
}
