import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {

  loggingError: string;
  user: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  onSubmit(credentials: any) {
    if(credentials.email != '' && credentials.password != '') {
      this.authService.login(credentials.email, credentials.password).subscribe({
        next: (res) => {
          this.user = res;
          if (res) {
            this.authService.saveStorage(res);
            this.messageService.add({severity: 'success', summary:'Successo!', detail: 'Login effettuato correttamente.', life: 3000})
            setTimeout(() => this.router.navigate(['home']), 3000);
          } else {
            this.loggingError = 'Email o password errati';
            this.messageService.add({severity: 'error', summary:'Errore', detail: 'Email o password errati', life: 3000})
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({severity: 'error', summary:'Errore', detail: 'Email o password errati', life: 3000})
        }
      })
    }
  }
}
