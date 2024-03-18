import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from '../../../recipe.model';
@Component({
  selector: 'app-one-recipe',
  templateUrl: './one-recipe.component.html',
  styleUrl: './one-recipe.component.scss'
})
export class OneRecipeComponent {
  @Input() recipe!: Recipe
  stars: number[] = []; 
  constructor(private router: Router) {

  }
  ngOnInit(): void {
    this.stars = Array(this.recipe.degree).fill(0);
  }
  navigateBtn() {
    this.router.navigate(['recipies/recipe-details', this.recipe.codeRecipe])
  }

}
