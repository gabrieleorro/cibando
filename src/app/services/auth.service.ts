import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiBaseUrl = 'api/users';

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) { }

  // Ci fa loggare
  login(email: string, password: string): Observable<any> {
    const user = { email: email, password: password };
    return this.http.post<any>(`${this.apiBaseUrl}/login`, user);
  }

  // Salva i dati
  saveStorage(res: any) {
    const user = {
      name: res.name,
      email: res.email,
      password: res.password,
    }
    this.userService.userRole.next(res.role); // stiamo inviando a userRole il ruolo dell'utente che ci arriverà
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Controlla i dati
  isLogged(): boolean {
    return JSON.parse(localStorage.getItem('user')) !== null;
  }

  // Ci fa uscire
  logout(): void {
    localStorage.removeItem('user');
    this.userService.userRole.next('');
  }
}
