import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreedsComponent } from './breeds.component';
import { BreedsRoutingModule } from './breeds.routing.module';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BreedComponent } from './breed/breed.component';
import { BreedDetailComponent } from './breed-detail/breed-detail.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [BreedsComponent, BreedComponent, BreedDetailComponent],
  imports: [
    CommonModule,
    BreedsRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
})
export class BreedsModule {}
