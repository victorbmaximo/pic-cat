import { Component, OnInit } from '@angular/core';
import { Favourite } from '../../models/favourite.model';
import { BreedsService } from '../../services/breeds/breeds.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  favourites: Favourite[];
  loading: boolean;

  constructor(
    private breedService: BreedsService,
    private _snackBar: MatSnackBar
  ) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.getFavourites();
  }

  getFavourites(): void {
    this.loading = true;

    this.breedService
      .getFavourite()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((favourites: Favourite[]) => {
        this.favourites = favourites;
      });
  }

  removeFavourite(id: number): void {
    this.breedService.deleteFavourite(id).subscribe(
      () => {
        const favouriteIndex = this.favourites.findIndex(
          (fav) => fav.id === id
        );
        this.favourites.splice(favouriteIndex, 1);
        this._snackBar.open('Favorito removido com sucesso!', '', {
          duration: 3000,
        });
      },
      (error) => {
        // Desenvolver tratamento de erros da API nesta função
        this._snackBar.open('Não foi possível remover o favorito!', '', {
          duration: 3000,
        });
      }
    );
  }
}
