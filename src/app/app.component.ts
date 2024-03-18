import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoginComponent } from './user/componnents/login/login.component';
import { HomeComponent } from './home/home.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FooterComponent } from './footer/footer.component';
import { AddRecipeComponent } from './recipe/components/add-recipe/add-recipe.component';
import { RecipeModule } from './recipe/recipe.module';
import { LogoutComponent } from './user/componnents/logout/logout.component';
import { DurationFormatPipe } from './time.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, HomeComponent, TopBarComponent,
     FooterComponent,FooterComponent, AddRecipeComponent, LogoutComponent
  , RecipeModule, DurationFormatPipe,  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client-project';
}
