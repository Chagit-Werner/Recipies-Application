import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule  } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

import { AllRecipesComponent } from './components/all-recipes/all-recipes.component';
import { RecipeRoutingModule } from './recipe.routing.module';
import { DurationFormatPipe } from '../time.pipe';
import { OneRecipeComponent } from './components/one-recipe/one-recipe.component';

@NgModule({
  declarations: [AllRecipesComponent, OneRecipeComponent],
  imports: [
    CommonModule , RecipeRoutingModule,FormsModule,MatSliderModule,
    MatCheckboxModule,MatIconModule,SidebarModule,ButtonModule,DurationFormatPipe
    ,MatButtonModule,MatOption , MatFormField, MatFormFieldModule,
    MatInputModule,MatSelectModule,MatSidenavModule
  ], exports: [
  ],

})
export class RecipeModule { }
