import { Component, OnInit } from '@angular/core';

import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../../recipe.model';
import { Category } from '../../../category.model';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.scss'
})
export class AllRecipesComponent implements OnInit {
  constructor(private _recipeService: RecipeService) { }

  public listRecipies: Recipe[] = [];
  listCategories: Category[] = []
  filteredRecipes: Recipe[] = [];
  value: number = 0; // Difficulty level filter value
  value1: number = 0; // Preparation time filter value
  selectedCategories: number[] = []; // Selected categories for filtering
  sidebarVisible2: boolean = false;
  disabled = false;
  max = 5;
  min = 0;
  showTicks = true;
  step = 0;
  thumbLabel = true;
  recipeNameFilter: string = '';
  ngOnInit(): void {
    this._recipeService.getRecipes().subscribe({
      next: (res) => {
        this.listRecipies = res;
        this.filteredRecipes = [...this.listRecipies];
      },
      error: (error) => {
        console.error(error);
      }
    });
    this.loadCategories();
  }

  filterByName(): void {
    this.filterRecipes();
  }

  loadCategories() {
    this._recipeService.getCategories().subscribe({
      next: (res) => {
        this.listCategories = res;    
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  filterRecipes(): void {
    this.filteredRecipes = this.listRecipies.filter(recipe => {
      const timeFilter = this.value1 === 0 || recipe.duration <= this.value1;
      const difficultyFilter = this.value === 0 || recipe.degree === this.value;
      const categoryFilter = this.selectedCategories.length === 0 || this.selectedCategories.includes(recipe.codeCategory);
      const nameFilter = this.recipeNameFilter === '' || recipe.nameRecipe.toLowerCase().includes(this.recipeNameFilter.toLowerCase());
      return timeFilter && difficultyFilter && categoryFilter && nameFilter;
    });
  }

  filterByTime(v: number): void {
    this.value1 = v;
    this.filterRecipes();
  }


  filterByDifficulty(v: number): void {
    this.value = v;
    this.filterRecipes();
  }

  filterByCategory(category: number): void {
    const index = this.selectedCategories.indexOf(category);
    if (index !== -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(category);
    }
    this.filterRecipes();
  }

}
