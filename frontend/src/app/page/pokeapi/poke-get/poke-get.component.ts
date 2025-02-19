import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokeApiService } from '../../../api/pokeapi.service';

@Component({
  selector: 'app-poke-get',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './poke-get.component.html',
  styleUrl: './poke-get.component.css'
})
export class PokeGetComponent {
  heroeName: string = '';
  errorMessage: string = '';
  heroes: any[] = [];
  newHeroe: any = {
    name: '',
    description: '',
    modified: '',
    thumbnail: {
      path: '',
      extension: ''
    },
    comics: {
      available: 0,
      collectionURI: '',
      items: []
    }
  };

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.getAllHeroes();
  }

  getAllHeroes(): void {
    this.pokeApiService.getAllCharacters().subscribe({
      next: (data) => {
        this.heroes = data.data.results;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  searchHeroe(): void {
    if (!this.heroeName.trim()) {
      this.errorMessage = 'Por favor, ingrese un nombre del héroe';
      this.heroes = [];
      return;
    }

    this.pokeApiService.getCharacterData(this.heroeName.toLowerCase()).subscribe({
      next: (data) => {
        if (data.data.results && data.data.results.length > 0) {
          this.heroes = [data.data.results[0]];
          this.errorMessage = '';
        } else {
          this.heroes = [];
          this.errorMessage = 'Héroe no encontrado';
        }
      },
      error: () => {
        this.heroes = [];
        this.errorMessage = 'Héroe no encontrado';
      }
    });
  }

  addHeroe(): void {
    this.pokeApiService.addHero(this.newHeroe).subscribe({
      next: (data) => {
        console.log('Heroe agregado', data);
        this.heroes.push(data);
        this.newHeroe = {
          name: '',
          description: '',
          modified: '',
          thumbnail: {
            path: '',
            extension: ''
          },
          comics: ''
        };
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
