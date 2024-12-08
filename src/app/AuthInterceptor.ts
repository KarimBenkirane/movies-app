// import {
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';

// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {}
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const isAuthenticated = this.authService.isLoggedIn;
//     if (isAuthenticated) {
//       const authReq = req.clone({
//         headers: req.headers.set(
//           'Authorization',
//           'Bearer' + this.authService.token
//         ),
//       });
//       return next.handle(authReq);
//     }
//     return next.handle(req);
//   }
// }
