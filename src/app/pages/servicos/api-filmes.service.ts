import { HttpClient } from '@angular/common/http'; // Importei o HttpClient e configurei a classe para ser injetável em toda a aplicação
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiFilmesService {

httpService = inject(HttpClient) // Injetei o HttpClient para poder fazer requisições HTTP

  getPopularMovies(){ // Criei o método getPopularMovies() para buscar os filmes populares usando uma requisição GET
    return this.httpService.get("https://api.themoviedb.org/3/movie/popular",);
}
}
