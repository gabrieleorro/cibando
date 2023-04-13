import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RECIPES } from '../mocks/recipes.mock';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  testoCercato = new ReplaySubject;
  datiRicetta = new ReplaySubject;
  apiBaseUrl = 'api/recipes';

  constructor(private http: HttpClient) { }

  // getRecipes(): Observable<Recipe[]> {
  //   // return of (RECIPES);
  //   return this.http.get<Recipe[]>(`${this.apiBaseUrl}/`)
  // }

  getRecipes() {
    return this.http.get<Recipe[]>(`${this.apiBaseUrl}/`)
  }

  getRecipe(id: string): Observable<Recipe> {
    // const recipe = RECIPES.find(ricetta => ricetta._id === id);
    // return of (recipe);
    return this.http.get<Recipe>(`${this.apiBaseUrl}/${id}`)
  }

  insertRecipe(recipe): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/`, recipe);
  }

  findRecipes(testo: string): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/cerca/${testo}`);
  }

}
