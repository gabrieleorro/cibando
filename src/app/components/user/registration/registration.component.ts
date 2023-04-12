import { Component } from '@angular/core';
import { faUserTie, faAt, faKey, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidator } from '../customValidator';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  faUserTie = faUserTie;
  chiocciola = faAt;
  chiave = faKey;
  matita = faPencil
  utenteInserito: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal,
  ) {}

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/)]),
    ripetiPassword: new FormControl('', Validators.required),
    note: new FormControl(''),
    terms: new FormControl('', Validators.requiredTrue),
  },
  [CustomValidator.MatchValidator('password', 'ripetiPassword')]
  );

  Editor = ClassicEditorBuild;

  editorConfig = {
    toolbar: {
      items: [
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'indent',
        'outdent',
        '|',
        'codeBlock',
        'blockQuote',
        'insertTable',
        'undo',
        'redo',
      ]
    },
    image: {
      toolbar: [
        'imageStyle:full',
        'imageStyle:side',
        '|',
        'imageTextAlternative'
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells'
      ]
    },
    height: 300,
  };

  onSubmit() {
    // console.log(this.form.value);
    const user = this.form.value;

    this.userService.insertUser(user).subscribe({
      next: (res) => {
        console.log('Utente inserito', res);
        this.utenteInserito = res;
        this.userService.datiUtente.next(user);
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  open(content: any, titolo?: string) {
    let title = titolo;
    this.modalService.open(content, { ariaLabelledBy: 'modale servizi', size: 'md', centered: true}).result.then((res) => {
      console.log('Azione da eseguire' + title)
    }).catch((res) => {
      console.log('Nessuna azione da eseguire')
    });
  }

}
