import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http:HttpClient) { }
  baseUrl='https://localhost:7155/api/'
  getRecipes(): Observable<any> {
    return this.http.get(`${this.baseUrl}Recipe`)
  }
  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}Category`)
  }
  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}Recipe/${id}`)
  }
  addRecipe(r:Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.baseUrl}Recipe/`, r)
  }

  editRecipe(recipe: Recipe): Observable<any> {
   
    return this.http.put<Recipe>(`${this.baseUrl}Recipe/${recipe.codeRecipe}`, recipe);
  }
  deleteRecipe(codeRecipe: number): Observable<any> {
    return this.http.delete<Recipe>(`${this.baseUrl}Recipe/${codeRecipe}`);
  }
}

