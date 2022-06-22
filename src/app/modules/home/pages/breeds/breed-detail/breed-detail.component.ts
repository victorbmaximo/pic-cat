import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, switchMap } from 'rxjs/operators';
import { Breed } from '../../../models/breeds.model';
import { BreedsService } from '../../../services/breeds/breeds.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-breed-detail',
  templateUrl: './breed-detail.component.html',
  styleUrls: ['./breed-detail.component.scss'],
})
export class BreedDetailComponent implements OnInit {
  breedId: string;
  breed: Breed;
  breedImage: string;
  loadingDetails: boolean;

  constructor(
    private route: ActivatedRoute,
    private breedService: BreedsService,
    private _snackBar: MatSnackBar
  ) {
    this.breedId = route.snapshot.paramMap.get('breed');
    this.breedImage = '';
    this.loadingDetails = false;
  }

  ngOnInit(): void {
    this.getBreedById();
  }

  getBreedById() {
    this.loadingDetails = true;

    this.breedService
      .getBreedById(this.breedId)
      .pipe(
        switchMap((breed: Breed[]) => {
          this.breed = breed[0];

          return this.breedService.getBreedImage(breed[0].reference_image_id);
        }),
        finalize(() => (this.loadingDetails = false))
      )
      .subscribe((breedImage) => {
        this.breedImage = breedImage;
      });
  }

  saveFavourite(): void {
    this.breedService.saveFavourite(this.breedImage).subscribe(() => {
      this._snackBar.open('Gato favoritado com sucesso!', '', {
        duration: 3000,
      });
    });
  }
}
