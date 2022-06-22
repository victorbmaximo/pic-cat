import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Breed } from '../../../models/breeds.model';
import { BreedsService } from '../../../services/breeds/breeds.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.scss'],
})
export class BreedComponent implements OnInit {
  breeds$: Observable<Breed[]>;

  constructor(
    private breedsService: BreedsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getBreeds();
  }

  getBreeds(): void {
    this.breeds$ = this.breedsService.getBreeds();
  }

  saveFavourite(breedImage: string): void {
    this.breedsService.saveFavourite(breedImage).subscribe(
      () => {
        this._snackBar.open('Gato favoritado com sucesso!', '', {
          duration: 3000,
        });
      },
      (error) => {
        // Desenvolver tratamento de erros da API nesta função
        this._snackBar.open('Não foi possível favoritar', '', {
          duration: 3000,
        });
      }
    );
  }
}
