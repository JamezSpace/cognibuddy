import { CanActivateFn } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  // check if token exists or is valid

  const token = localStorage.getItem('access_token');
  if (!token) return false;

  const decoded = jwtDecode(token)
    console.log(decoded);
    
return false;
//   return route.data['roles'].includes(role);
};
