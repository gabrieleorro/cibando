import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecipeService } from 'src/app/services/recipe.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss'],
  providers: [MessageService]
})
export class NewRecipeComponent {

  title: string;
  description: string;
  image: string;
  published: boolean;
  difficulty: number;

  ricettaInserita: any;

  constructor(
    private recipeService: RecipeService,
    private modal: NgbModal,
    private router: Router,
    private messageService: MessageService,
  ) {  }

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    published: new FormControl(false),
    difficulty: new FormControl('1', [Validators.required, Validators.min(1), Validators.max(5)]),
  });

  // ngOnInit(): void {
  //   this.prendiDatiRicetta();
  // }

  aggiungiRicette(): void {
    const recipe = this.form.value;
    this.recipeService.insertRecipe(recipe).subscribe({
      next: (res) => {
        console.log('Recipe added ', res);
        this.ricettaInserita = res;
        this.messageService.add({severity: 'success', summary: 'Completato!', detail: 'Ricetta inserita correttamente!'});
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  // prendiDatiRicetta() {
  //   this.recipeService.datiRicetta.subscribe((res: any) => {
  //     this.title = res.title;
  //     this.description = res.description;
  //     this.image = res.image;
  //     this.published = res.published;
  //     this.difficulty = res.difficulty;
  //   })
  // }

  closeModal() {
    this.ricettaInserita = '';
    this.router.navigate(['ricette']);
  }

  onNewRecipe() {
    this.ricettaInserita = '';
    this.form.patchValue({
      title: '',
      description: '',
      image: '',
      published: false,
      difficulty: '',
    })
  }

  open(content: any, titolo?: string) {
    let title = titolo;
    this.modal.open(content, { ariaLabelledBy: 'modale servizi', size: 'lg', centered: true}).result.then((res) => {
      this.onNewRecipe();
    }).catch((res) => {
      this.closeModal();
    });
  }

}
