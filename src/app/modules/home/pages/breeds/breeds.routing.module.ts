import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreedDetailComponent } from './breed-detail/breed-detail.component';
import { BreedComponent } from './breed/breed.component';
import { BreedsComponent } from './breeds.component';

const routes: Routes = [
    { 
      path: '', 
      component: BreedsComponent,
      children: [
        { path: '', component: BreedComponent },
        { path: ':breed', component: BreedDetailComponent }
      ] 
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BreedsRoutingModule {}
