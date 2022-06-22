import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreedComponent } from './pages/breeds/breed/breed.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'gatos',
        loadChildren: () =>
          import('./pages/breeds/breeds.module').then(
            (module) => module.BreedsModule
          ),
      },
      {
        path: 'favoritos',
        loadChildren: () =>
          import('./pages/favourites/favourites.module').then(
            (module) => module.FavouritesModule
          ),
      },
      {
        path: '',
        redirectTo: 'gatos',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
