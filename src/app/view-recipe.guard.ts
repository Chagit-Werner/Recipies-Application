import { CanActivateFn } from '@angular/router';
import Swal from 'sweetalert2';
export const viewRecipeGuard: CanActivateFn = (route, state) => {
  if(sessionStorage.getItem('userInfo'))
  {   return true
  }
  Swal.fire({
   title: " You cannot view the recipe since u haven't login! ",
   icon: 'warning',
   confirmButtonText: 'Confirm'
 })
return false;
};
